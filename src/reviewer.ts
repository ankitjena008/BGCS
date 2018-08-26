'use strict';
declare var require: any

import Base from "@bitclave/base-client-js";

//required for babel to polyfill regeneratorRuntime
require("babel-polyfill");

// process.on('unhandledRejection', (reason, p) => {
//     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
// });


(async function foo() {

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
    let bobBase = await getBase("bob_new")

    let reviewerKey = await getPublicKey("bob_new")

    
    let data = new Map();

    var cleanliness = (<HTMLInputElement>document.getElementById('cleanliness')).value;
    var buggyness = (<HTMLInputElement>document.getElementById('buggyness')).value;
    var secureness = (<HTMLInputElement>document.getElementById('secureness')).value;
    var efficiency = (<HTMLInputElement>document.getElementById('efficiency')).value;

    var commit_id = "rating_key";
    var rating_data = JSON.stringify({"cleanliness":cleanliness, "buggyness":buggyness, "secureness":secureness, "efficiency":efficiency});
    // rating_data = JSON.stringify(rating_data);
    data.set(commit_id, rating_data);
    

    // data.set('cleanliness', cleanliness);
    // data.set('bugginess', bugginess);
    // data.set('secureness', secureness);
    // data.set('efficiency', efficiency);


    // Save encrypted data to Base
    let encryptedData = await bobBase.profileManager.updateData(data);
    console.log("\nUser data is encrypted and saved to Base.");
    for (var [key, value] of encryptedData.entries()) {
        console.log("Key:" + key + ", Encrypted Value:" + value);
    }

    //give access
    const grantFields = new Map();
    grantFields.set(commit_id, 0);
    // grantFields.set(bugginess, 0);
    // grantFields.set(secureness, 0);
    // grantFields.set(efficiency, 0);

    await bobBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields);

    alert('Review successfully submitted!');
    // alert('Bye');

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