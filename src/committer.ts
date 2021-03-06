'use strict';
declare var require: any

import Base from "@bitclave/base-client-js";

//required for babel to polyfill regeneratorRuntime
require("babel-polyfill");

// process.on('unhandledRejection', (reason, p) => {
//     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
// });

(async function() {
    var getBase = (async function(passphrase) {
        //Initialize Base
        var base = new Base("https://base2-bitclva-com.herokuapp.com", 'localhost', '', '');
        base.changeStrategy('POSTGRES');
        
        //Create a KeyPair
        let keyPair = await base.createKeyPairHelper('').createKeyPair(passphrase);

        console.log("\nCreated a keypair for the passphrase: " + passphrase);
        console.log("PublicKey:" + keyPair.publicKey);
        console.log("PrivateKey:" + keyPair.privateKey);

        //Check for existence or create a new account
        let account;
        try {
            console.log("\nChecking if account already exists.");
            account = await base.accountManager.checkAccount(passphrase, "somemessage");
            console.log("Account already exists: " + JSON.stringify(account));
        } catch(e) {
            console.log("\nAccount doesn't exist, Creating a new one.");
            account = await base.accountManager.registration(passphrase, "somemessage");
            console.log("Account created:" + JSON.stringify(account));
        }

        return base
    })

    var getPublicKey = (async function(passphrase) {
        //Create a KeyPair
        let keyPair = await (await getBase(passphrase)).createKeyPairHelper('').createKeyPair(passphrase);

        return keyPair.publicKey;
    })

    console.log('Hello')
    let aliceBase = await getBase("alice")
    let eveBase = await getBase("eve")
    let malloryBase = await getBase("mallory")
    let reviewerBase = await getBase("reviewer")

    let aliceKey = await getPublicKey("alice")
    let eveKey = await getPublicKey("eve")
    let malloryKey = await getPublicKey("mallory")
    let reviewerKey = await getPublicKey("reviewer")

    
    let data = new Map();
    let data1 = new Map();
    let data2 = new Map();
    // let data = new Base.
    var commit_id1 = "commit_1";
    var commit_id2 = "commit_2";
    var commit_id3 = "commit_3";
    data.set(commit_id1, "https://github.com/bitclave/base-tutorial/commit/3993254b7c13d7617b7f2add9cb00c24fd10508a");
    data1.set(commit_id2, "https://github.com/bitclave/base-tutorial/commit/64fd301d6d540d04468e43b6e5d2ea5bb870acd6");
    data2.set(commit_id3, "https://github.com/bitclave/base-tutorial/commit/8909a0a371d916914e64bb0b894f61552d55989c");
    // data.set("lastname", "Doe");
    // data.set("email", "john.doe@gmail.com");
    // data.set("city", "NewYork");


    // Save encrypted data to Base
    let encryptedData1 = await aliceBase.profileManager.updateData(data);
    let encryptedData2 = await eveBase.profileManager.updateData(data1);
    let encryptedData3 = await malloryBase.profileManager.updateData(data2);
    console.log("\nUser data is encrypted and saved to Base.");
    for (var [key, value] of encryptedData1.entries()) {
        console.log("Key:" + key + ", Encrypted Value:" + value);
    }

    //give access
    const grantFields = new Map();
    grantFields.set(commit_id1, 0);
    await aliceBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields);
    const grantFields1 = new Map();
    grantFields1.set(commit_id2, 0);
    await eveBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields1);
    const grantFields2 = new Map();
    grantFields2.set(commit_id3, 0);
    await malloryBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields2);

    // console.log("IM A BANANA")

    // check approval
    var temp = await reviewerBase.dataRequestManager.getRequests(reviewerKey, "");
    temp.forEach(async function(approval) {
        //respond to approval
        console.log(await reviewerBase.profileManager.getAuthorizedData(approval.toPk,approval.responseData))
    })
})();