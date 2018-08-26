'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var base_client_js_1 = require("@bitclave/base-client-js");
//required for babel to polyfill regeneratorRuntime
require("babel-polyfill");
// process.on('unhandledRejection', (reason, p) => {
//     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
// });
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var getBase, getPublicKey, reviewerKey, bobBase, temp, url_list, size, link_index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getBase = (function (passphrase) {
                        return __awaiter(this, void 0, void 0, function () {
                            var base, keyPair, account, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        base = new base_client_js_1["default"]("https://base2-bitclva-com.herokuapp.com", 'localhost', '', '');
                                        base.changeStrategy('POSTGRES');
                                        return [4 /*yield*/, base.createKeyPairHelper('').createKeyPair(passphrase)];
                                    case 1:
                                        keyPair = _a.sent();
                                        console.log("\nCreated a keypair for the passphrase: " + passphrase);
                                        console.log("PublicKey:" + keyPair.publicKey);
                                        console.log("PrivateKey:" + keyPair.privateKey);
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 6]);
                                        console.log("\nChecking if account already exists.");
                                        return [4 /*yield*/, base.accountManager.checkAccount(passphrase, "somemessage")];
                                    case 3:
                                        account = _a.sent();
                                        console.log("Account already exists: " + JSON.stringify(account));
                                        return [3 /*break*/, 6];
                                    case 4:
                                        e_1 = _a.sent();
                                        console.log("\nAccount doesn't exist, Creating a new one.");
                                        return [4 /*yield*/, base.accountManager.registration(passphrase, "somemessage")];
                                    case 5:
                                        account = _a.sent();
                                        console.log("Account created:" + JSON.stringify(account));
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/, base];
                                }
                            });
                        });
                    });
                    getPublicKey = (function (passphrase) {
                        return __awaiter(this, void 0, void 0, function () {
                            var keyPair;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getBase(passphrase)];
                                    case 1: return [4 /*yield*/, (_a.sent()).createKeyPairHelper('').createKeyPair(passphrase)];
                                    case 2:
                                        keyPair = _a.sent();
                                        return [2 /*return*/, keyPair.publicKey];
                                }
                            });
                        });
                    });
                    return [4 /*yield*/, getPublicKey("reviewer")];
                case 1:
                    reviewerKey = _a.sent();
                    return [4 /*yield*/, getBase("reviewer")];
                case 2:
                    bobBase = _a.sent();
                    return [4 /*yield*/, bobBase.dataRequestManager.getRequests(reviewerKey, "")];
                case 3:
                    temp = _a.sent();
                    url_list = [];
                    size = 0;
                    link_index = 1;
                    temp.forEach(function (approval) {
                        return __awaiter(this, void 0, void 0, function () {
                            var received_data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, bobBase.profileManager.getAuthorizedData(approval.toPk, approval.responseData)];
                                    case 1:
                                        received_data = _a.sent();
                                        console.log(received_data);
                                        received_data.forEach(function (obj) {
                                            var body = document.getElementById('div_id');
                                            // function temp1(){
                                            //     window.open('template.html')
                                            // }
                                            body.innerHTML += "<p>" + obj.toString() + "</p>" + "<input type='button' onclick = 'window.open(\"template.html?\" + encodeURIComponent(\"" + obj.toString() + "\"));' value = 'Review Commit' id='link_'" + link_index.toString() + "'></br>";
                                            // var button = <HTMLButtonElement>document.getElementById('link_' + link_index.toString());
                                            // button.addEventListener('click', function(){
                                            //     window.open('template.html?' + encodeURIComponent(obj.toString()));
                                            // });    
                                            link_index = link_index + 1;
                                            console.log("Current object : " + obj.toString());
                                            url_list.push(obj.toString());
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    console.log(url_list);
                    return [2 /*return*/];
            }
        });
    });
})();
