'use strict';
declare var require: any
import Base from "@bitclave/base-client-js";
import { link } from "fs";

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

let reviewerKey = await getPublicKey("reviewer")
let bobBase = await getBase("reviewer")

var temp = await bobBase.dataRequestManager.getRequests(reviewerKey, "");
var url_list = []
var size = 0
var link_index = 1;

temp.forEach(async function(approval) {
    //respond to approval
    var received_data = await bobBase.profileManager.getAuthorizedData(approval.toPk,approval.responseData)
    console.log(received_data)
    received_data.forEach(function(obj){
        var body = <HTMLBodyElement>document.getElementById('div_id');
        // function temp1(){
        //     window.open('template.html')
        // }
        body.innerHTML += "<p>"+obj.toString()+"</p>"+"<input type='button' onclick = 'window.open(\"template.html?\" + encodeURIComponent(\"" + obj.toString() + "\"));' value = 'Review Commit' id='link_'" + link_index.toString() + "'></br>";
        // var button = <HTMLButtonElement>document.getElementById('link_' + link_index.toString());
        // button.addEventListener('click', function(){
        //     window.open('template.html?' + encodeURIComponent(obj.toString()));
        // });    
        link_index = link_index + 1;
        console.log("Current object : " + obj.toString())
        url_list.push(obj.toString());
    })
    // for (var [key, value] of received_data.entries()) {
    //     console.log("Key:" + key + ", Encrypted Value:" + value);
    //     size = url_list.push(value.toString());
    // }
});
console.log(url_list)



// for(var i = 0; i < size; i++){
//     document.getElementById('div_id').innerHTML += "<p>"+url_list[i]+"</p>"+"<input type='button' id='link_'" + link_index.toString() + "'></br>";
//     link_index = link_index + 1;
//     console.log(link_index)
})();