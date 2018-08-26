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
    let bobBase = await getBase("bob")

    let reviewerKey = await getPublicKey("bob")

    
    let data = new Map();
    // let data = new Base.
    var commit_id = "commit_1";
    data.set(commit_id, "foo");
    // data.set("lastname", "Doe");
    // data.set("email", "john.doe@gmail.com");
    // data.set("city", "NewYork");


    // Save encrypted data to Base
    let encryptedData = await aliceBase.profileManager.updateData(data);
    console.log("\nUser data is encrypted and saved to Base.");
    for (var [key, value] of encryptedData.entries()) {
        console.log("Key:" + key + ", Encrypted Value:" + value);
    }

    //give access
    const grantFields = new Map();
    grantFields.set(commit_id, 0);
    await aliceBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields);

    // console.log("IM A BANANA")

    //check approval
    var temp = await bobBase.dataRequestManager.getRequests(reviewerKey, "");
    temp.forEach(async function(approval) {
        //respond to approval
        console.log(await bobBase.profileManager.getAuthorizedData(approval.toPk,approval.responseData))
    })




    //read




    // // Read saved data and decrypt
    // let decryptedData = await base.profileManager.getData();
    // console.log("\nUser data is retrieved from Base and decrypted.");
    // for (var [key, value] of decryptedData.entries()) {
    //     console.log("Key:" + key + ", Decrypted Value:" + value);
    // }
})();