var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { KintoneRequestConfigBuilder } from "../KintoneRequestConfigBuilder";
import FormData from "form-data";
import { injectPlatformDeps } from "../platform";
import * as browserDeps from "../platform/browser";
import os from "os";
import { Base64 } from "js-base64";
import https from "https";
var packageJson = require("../../package.json");
var nodeVersion = process.version;
var osName = os.type();
var packageName = packageJson.name;
var packageVersion = packageJson.version;
var expectedDefaultUa = "Node.js/".concat(nodeVersion, "(").concat(osName, ") ").concat(packageName, "@").concat(packageVersion);
describe("KintoneRequestConfigBuilder in Node.js environment", function () {
    var baseUrl = "https://example.kintone.com";
    var apiToken = "apiToken";
    var kintoneRequestConfigBuilder;
    describe("specify a User-Agent", function () {
        it("should use a specified User-Agent", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                            baseUrl: baseUrl,
                            auth: {
                                type: "apiToken",
                                apiToken: apiToken,
                            },
                            userAgent: "foo",
                        });
                        return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: "value" })];
                    case 1:
                        requestConfig = _a.sent();
                        expect(requestConfig).toStrictEqual({
                            method: "get",
                            proxy: undefined,
                            url: "".concat(baseUrl, "/k/v1/record.json?key=value"),
                            headers: {
                                "User-Agent": "".concat(expectedDefaultUa, " foo"),
                                "X-Cybozu-API-Token": apiToken,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("not specified a User-Agent", function () {
        beforeEach(function () {
            kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                baseUrl: baseUrl,
                auth: {
                    type: "apiToken",
                    apiToken: apiToken,
                },
            });
        });
        it("should build get method requestConfig", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: "value" })];
                    case 1:
                        requestConfig = _a.sent();
                        expect(requestConfig).toStrictEqual({
                            method: "get",
                            proxy: undefined,
                            url: "".concat(baseUrl, "/k/v1/record.json?key=value"),
                            headers: {
                                "User-Agent": expectedDefaultUa,
                                "X-Cybozu-API-Token": apiToken,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should build post method requestConfig if the request URL is over the threshold", function () { return __awaiter(void 0, void 0, void 0, function () {
            var value, requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = "a".repeat(4096);
                        return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: value })];
                    case 1:
                        requestConfig = _a.sent();
                        expect(requestConfig).toStrictEqual({
                            method: "post",
                            proxy: undefined,
                            url: "".concat(baseUrl, "/k/v1/record.json"),
                            headers: {
                                "User-Agent": expectedDefaultUa,
                                "X-Cybozu-API-Token": apiToken,
                                "X-HTTP-Method-Override": "GET",
                            },
                            data: { key: value },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should build get method requestConfig for data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: "value" }, { responseType: "arraybuffer" })];
                    case 1:
                        requestConfig = _a.sent();
                        expect(requestConfig).toStrictEqual({
                            method: "get",
                            proxy: undefined,
                            url: "".concat(baseUrl, "/k/v1/record.json?key=value"),
                            headers: {
                                "User-Agent": expectedDefaultUa,
                                "X-Cybozu-API-Token": apiToken,
                            },
                            responseType: "arraybuffer",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should build post method requestConfig", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("post", "/k/v1/record.json", { key: "value" })];
                    case 1:
                        requestConfig = _a.sent();
                        expect(requestConfig).toStrictEqual({
                            method: "post",
                            proxy: undefined,
                            url: "".concat(baseUrl, "/k/v1/record.json"),
                            headers: {
                                "User-Agent": expectedDefaultUa,
                                "X-Cybozu-API-Token": apiToken,
                            },
                            data: {
                                key: "value",
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should build post method requestConfig for data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var formData, requestConfig, data, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        formData.append("key", "value");
                        return [4 /*yield*/, kintoneRequestConfigBuilder.build("post", "/k/v1/record.json", formData)];
                    case 1:
                        requestConfig = _a.sent();
                        data = requestConfig.data, config = __rest(requestConfig, ["data"]);
                        expect(config).toStrictEqual({
                            method: "post",
                            proxy: undefined,
                            url: "".concat(baseUrl, "/k/v1/record.json"),
                            headers: __assign({ "User-Agent": expectedDefaultUa, "X-Cybozu-API-Token": apiToken }, formData.getHeaders()),
                        });
                        expect(data).toBeInstanceOf(FormData);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should build put method requestConfig", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("put", "/k/v1/record.json", { key: "value" })];
                    case 1:
                        requestConfig = _a.sent();
                        expect(requestConfig).toStrictEqual({
                            method: "put",
                            proxy: undefined,
                            url: "".concat(baseUrl, "/k/v1/record.json"),
                            headers: {
                                "User-Agent": expectedDefaultUa,
                                "X-Cybozu-API-Token": apiToken,
                            },
                            data: {
                                key: "value",
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should build delete method requestConfig", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("delete", "/k/v1/record.json", { key: "value" })];
                    case 1:
                        requestConfig = _a.sent();
                        expect(requestConfig).toStrictEqual({
                            method: "delete",
                            proxy: undefined,
                            url: "".concat(baseUrl, "/k/v1/record.json?key=value"),
                            headers: {
                                "User-Agent": expectedDefaultUa,
                                "X-Cybozu-API-Token": apiToken,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe("KintoneRequestConfigBuilder in Browser environment", function () {
    var baseUrl = "https://example.kintone.com";
    var requestToken = "requestToken";
    var kintoneRequestConfigBuilder;
    beforeEach(function () {
        injectPlatformDeps(__assign(__assign({}, browserDeps), { getRequestToken: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, requestToken];
            }); }); } }));
        kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
            baseUrl: baseUrl,
            auth: {
                type: "session",
            },
        });
    });
    it("should build get method requestConfig", function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: "value" })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toStrictEqual({
                        method: "get",
                        proxy: undefined,
                        url: "".concat(baseUrl, "/k/v1/record.json?key=value"),
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should build post method requestConfig if the request URL is over the threshold", function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = "a".repeat(4096);
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: value })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toStrictEqual({
                        method: "post",
                        proxy: undefined,
                        url: "".concat(baseUrl, "/k/v1/record.json"),
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            "X-HTTP-Method-Override": "GET",
                        },
                        data: { key: value, __REQUEST_TOKEN__: requestToken },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should build get method requestConfig for data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: "value" }, { responseType: "arraybuffer" })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toStrictEqual({
                        method: "get",
                        proxy: undefined,
                        url: "".concat(baseUrl, "/k/v1/record.json?key=value"),
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        responseType: "arraybuffer",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should build post method requestConfig", function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("post", "/k/v1/record.json", { key: "value" })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toStrictEqual({
                        method: "post",
                        proxy: undefined,
                        url: "".concat(baseUrl, "/k/v1/record.json"),
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        data: {
                            key: "value",
                            __REQUEST_TOKEN__: requestToken,
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should build post method requestConfig for data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var formData, requestConfig, data, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append("key", "value");
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("post", "/k/v1/record.json", formData)];
                case 1:
                    requestConfig = _a.sent();
                    data = requestConfig.data, config = __rest(requestConfig, ["data"]);
                    expect(config).toStrictEqual({
                        method: "post",
                        proxy: undefined,
                        url: "".concat(baseUrl, "/k/v1/record.json"),
                        headers: __assign({ "X-Requested-With": "XMLHttpRequest" }, formData.getHeaders()),
                    });
                    expect(data).toBeInstanceOf(FormData);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should build put method requestConfig", function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("put", "/k/v1/record.json", { key: "value" })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toStrictEqual({
                        method: "put",
                        proxy: undefined,
                        url: "".concat(baseUrl, "/k/v1/record.json"),
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        data: {
                            key: "value",
                            __REQUEST_TOKEN__: requestToken,
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should build delete method requestConfig", function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, kintoneRequestConfigBuilder.build("delete", "/k/v1/record.json", { key: "value" })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toStrictEqual({
                        method: "delete",
                        proxy: undefined,
                        url: "".concat(baseUrl, "/k/v1/record.json?__REQUEST_TOKEN__=").concat(requestToken, "&key=value"),
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("options", function () {
    it("should build `requestConfig` having `proxy` property", function () { return __awaiter(void 0, void 0, void 0, function () {
        var baseUrl, apiToken, headers, proxy, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = "https://example.kintone.com";
                    apiToken = "apiToken";
                    headers = {
                        "X-Cybozu-API-Token": apiToken,
                        "User-Agent": expectedDefaultUa,
                    };
                    proxy = {
                        host: "localhost",
                        port: 8000,
                        auth: {
                            username: "admin",
                            password: "password",
                        },
                    };
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        auth: {
                            type: "apiToken",
                            apiToken: apiToken,
                        },
                        proxy: proxy,
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: "value" })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toStrictEqual({
                        method: "get",
                        url: "".concat(baseUrl, "/k/v1/record.json?key=value"),
                        headers: headers,
                        proxy: proxy,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should build `requestConfig` having `httpsAgent` property", function () { return __awaiter(void 0, void 0, void 0, function () {
        var baseUrl, apiToken, httpsAgent, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = "https://example.kintone.com";
                    apiToken = "apiToken";
                    httpsAgent = new https.Agent();
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        httpsAgent: httpsAgent,
                        auth: {
                            type: "apiToken",
                            apiToken: apiToken,
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: "value" })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toHaveProperty("httpsAgent");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should build `requestConfig` having `httpsAgent` property from clientCertAuth", function () { return __awaiter(void 0, void 0, void 0, function () {
        var baseUrl, apiToken, clientCertAuth, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = "https://example.kintone.com";
                    apiToken = "apiToken";
                    clientCertAuth = {
                        pfx: Buffer.alloc(0),
                        password: "password",
                    };
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        clientCertAuth: clientCertAuth,
                        auth: {
                            type: "apiToken",
                            apiToken: apiToken,
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", { key: "value" })];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig).toHaveProperty("httpsAgent");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Headers", function () {
    var baseUrl = "https://example.com";
    it("Password auth", function () { return __awaiter(void 0, void 0, void 0, function () {
        var USERNAME, PASSWORD, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    USERNAME = "user";
                    PASSWORD = "password";
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        auth: {
                            type: "password",
                            username: USERNAME,
                            password: PASSWORD,
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", {})];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig.headers).toStrictEqual({
                        "User-Agent": expectedDefaultUa,
                        "X-Cybozu-Authorization": Base64.encode("".concat(USERNAME, ":").concat(PASSWORD)),
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("ApiToken auth", function () { return __awaiter(void 0, void 0, void 0, function () {
        var API_TOKEN, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    API_TOKEN = "ApiToken";
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        auth: {
                            type: "apiToken",
                            apiToken: API_TOKEN,
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", {})];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig.headers).toStrictEqual({
                        "User-Agent": expectedDefaultUa,
                        "X-Cybozu-API-Token": API_TOKEN,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("ApiToken auth using multiple tokens as comma-separated string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var API_TOKEN1, API_TOKEN2, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    API_TOKEN1 = "ApiToken1";
                    API_TOKEN2 = "ApiToken2";
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        auth: {
                            type: "apiToken",
                            apiToken: "".concat(API_TOKEN1, ",").concat(API_TOKEN2),
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", {})];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig.headers).toStrictEqual({
                        "User-Agent": expectedDefaultUa,
                        "X-Cybozu-API-Token": "".concat(API_TOKEN1, ",").concat(API_TOKEN2),
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("ApiToken auth using multiple tokens as array", function () { return __awaiter(void 0, void 0, void 0, function () {
        var API_TOKEN1, API_TOKEN2, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    API_TOKEN1 = "ApiToken1";
                    API_TOKEN2 = "ApiToken2";
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        auth: {
                            type: "apiToken",
                            apiToken: [API_TOKEN1, API_TOKEN2],
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", {})];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig.headers).toStrictEqual({
                        "User-Agent": expectedDefaultUa,
                        "X-Cybozu-API-Token": "".concat(API_TOKEN1, ",").concat(API_TOKEN2),
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Session auth", function () { return __awaiter(void 0, void 0, void 0, function () {
        var kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        auth: {
                            type: "session",
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", {})];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig.headers).toStrictEqual({
                        "User-Agent": expectedDefaultUa,
                        "X-Requested-With": "XMLHttpRequest",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("OAuth token auth", function () { return __awaiter(void 0, void 0, void 0, function () {
        var oAuthToken, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oAuthToken = "oauth-token";
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        auth: {
                            type: "oAuthToken",
                            oAuthToken: oAuthToken,
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", {})];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig.headers).toStrictEqual({
                        Authorization: "Bearer ".concat(oAuthToken),
                        "User-Agent": expectedDefaultUa,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Basic auth", function () { return __awaiter(void 0, void 0, void 0, function () {
        var basicAuth, kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    basicAuth = { username: "user", password: "password" };
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        basicAuth: basicAuth,
                        auth: {
                            type: "session",
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", {})];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig.headers).toStrictEqual({
                        Authorization: "Basic ".concat(Base64.encode("user:password")),
                        "User-Agent": expectedDefaultUa,
                        "X-Requested-With": "XMLHttpRequest",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not include User-Agent for browser enviroment", function () { return __awaiter(void 0, void 0, void 0, function () {
        var kintoneRequestConfigBuilder, requestConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    injectPlatformDeps(browserDeps);
                    kintoneRequestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: baseUrl,
                        auth: {
                            type: "session",
                        },
                    });
                    return [4 /*yield*/, kintoneRequestConfigBuilder.build("get", "/k/v1/record.json", {})];
                case 1:
                    requestConfig = _a.sent();
                    expect(requestConfig.headers["User-Agent"]).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=KintoneRequestConfigBuilder.test.js.map