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
(function foo() {
    return __awaiter(this, void 0, void 0, function () {
        var getBase, getPublicKey, bobBase, reviewerKey, data, cleanliness, buggyness, secureness, efficiency, commit_id, rating_data, encryptedData, _i, _a, _b, key, value, grantFields, temp;
        return __generator(this, function (_c) {
            switch (_c.label) {
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
                    console.log('Hello');
                    return [4 /*yield*/, getBase("bob_new")];
                case 1:
                    bobBase = _c.sent();
                    return [4 /*yield*/, getPublicKey("bob_new")];
                case 2:
                    reviewerKey = _c.sent();
                    data = new Map();
                    cleanliness = document.getElementById('cleanliness').value;
                    buggyness = document.getElementById('buggyness').value;
                    secureness = document.getElementById('secureness').value;
                    efficiency = document.getElementById('efficiency').value;
                    commit_id = "rating_key";
                    rating_data = JSON.stringify({ "cleanliness": cleanliness, "buggyness": buggyness, "secureness": secureness, "efficiency": efficiency });
                    // rating_data = JSON.stringify(rating_data);
                    data.set(commit_id, rating_data);
                    return [4 /*yield*/, bobBase.profileManager.updateData(data)];
                case 3:
                    encryptedData = _c.sent();
                    console.log("\nUser data is encrypted and saved to Base.");
                    for (_i = 0, _a = encryptedData.entries(); _i < _a.length; _i++) {
                        _b = _a[_i], key = _b[0], value = _b[1];
                        console.log("Key:" + key + ", Encrypted Value:" + value);
                    }
                    grantFields = new Map();
                    grantFields.set(commit_id, 0);
                    // grantFields.set(bugginess, 0);
                    // grantFields.set(secureness, 0);
                    // grantFields.set(efficiency, 0);
                    return [4 /*yield*/, bobBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields)];
                case 4:
                    // grantFields.set(bugginess, 0);
                    // grantFields.set(secureness, 0);
                    // grantFields.set(efficiency, 0);
                    _c.sent();
                    alert('Review successfully submitted!');
                    return [4 /*yield*/, bobBase.dataRequestManager.getRequests(reviewerKey, "")];
                case 5:
                    temp = _c.sent();
                    temp.forEach(function (approval) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        //respond to approval
                                        _b = (_a = console).log;
                                        return [4 /*yield*/, bobBase.profileManager.getAuthorizedData(approval.toPk, approval.responseData)];
                                    case 1:
                                        //respond to approval
                                        _b.apply(_a, [_c.sent()]);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
})();
