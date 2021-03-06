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
        var getBase, getPublicKey, aliceBase, eveBase, malloryBase, reviewerBase, aliceKey, eveKey, malloryKey, reviewerKey, data, data1, data2, commit_id1, commit_id2, commit_id3, encryptedData1, encryptedData2, encryptedData3, _i, _a, _b, key, value, grantFields, grantFields1, grantFields2, temp;
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
                    return [4 /*yield*/, getBase("alice")];
                case 1:
                    aliceBase = _c.sent();
                    return [4 /*yield*/, getBase("eve")];
                case 2:
                    eveBase = _c.sent();
                    return [4 /*yield*/, getBase("mallory")];
                case 3:
                    malloryBase = _c.sent();
                    return [4 /*yield*/, getBase("reviewer")];
                case 4:
                    reviewerBase = _c.sent();
                    return [4 /*yield*/, getPublicKey("alice")];
                case 5:
                    aliceKey = _c.sent();
                    return [4 /*yield*/, getPublicKey("eve")];
                case 6:
                    eveKey = _c.sent();
                    return [4 /*yield*/, getPublicKey("mallory")];
                case 7:
                    malloryKey = _c.sent();
                    return [4 /*yield*/, getPublicKey("reviewer")];
                case 8:
                    reviewerKey = _c.sent();
                    data = new Map();
                    data1 = new Map();
                    data2 = new Map();
                    commit_id1 = "commit_1";
                    commit_id2 = "commit_2";
                    commit_id3 = "commit_3";
                    data.set(commit_id1, "https://github.com/bitclave/base-tutorial/commit/3993254b7c13d7617b7f2add9cb00c24fd10508a");
                    data1.set(commit_id2, "https://github.com/bitclave/base-tutorial/commit/64fd301d6d540d04468e43b6e5d2ea5bb870acd6");
                    data2.set(commit_id3, "https://github.com/bitclave/base-tutorial/commit/8909a0a371d916914e64bb0b894f61552d55989c");
                    return [4 /*yield*/, aliceBase.profileManager.updateData(data)];
                case 9:
                    encryptedData1 = _c.sent();
                    return [4 /*yield*/, eveBase.profileManager.updateData(data1)];
                case 10:
                    encryptedData2 = _c.sent();
                    return [4 /*yield*/, malloryBase.profileManager.updateData(data2)];
                case 11:
                    encryptedData3 = _c.sent();
                    console.log("\nUser data is encrypted and saved to Base.");
                    for (_i = 0, _a = encryptedData1.entries(); _i < _a.length; _i++) {
                        _b = _a[_i], key = _b[0], value = _b[1];
                        console.log("Key:" + key + ", Encrypted Value:" + value);
                    }
                    grantFields = new Map();
                    grantFields.set(commit_id1, 0);
                    return [4 /*yield*/, aliceBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields)];
                case 12:
                    _c.sent();
                    grantFields1 = new Map();
                    grantFields1.set(commit_id2, 0);
                    return [4 /*yield*/, eveBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields1)];
                case 13:
                    _c.sent();
                    grantFields2 = new Map();
                    grantFields2.set(commit_id3, 0);
                    return [4 /*yield*/, malloryBase.dataRequestManager.grantAccessForClient(reviewerKey, grantFields2)];
                case 14:
                    _c.sent();
                    return [4 /*yield*/, reviewerBase.dataRequestManager.getRequests(reviewerKey, "")];
                case 15:
                    temp = _c.sent();
                    temp.forEach(function (approval) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        //respond to approval
                                        _b = (_a = console).log;
                                        return [4 /*yield*/, reviewerBase.profileManager.getAuthorizedData(approval.toPk, approval.responseData)];
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
