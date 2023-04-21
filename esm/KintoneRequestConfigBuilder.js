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
import FormData from 'form-data';
import qs from 'qs';
import { Base64 } from 'js-base64';
import { platformDeps } from '../esm-origin/platform/';
var HTTP_PROXY_PROTOCOL = 'http:';
var THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE = 4096;
var KintoneRequestConfigBuilder = /** @class */ (function () {
    function KintoneRequestConfigBuilder(options) {
        this.baseUrl = options.baseUrl;
        this.auth = options.auth;
        this.headers = this.buildHeaders({
            basicAuth: options.basicAuth,
            userAgent: options.userAgent,
        });
        if ('httpsAgent' in options) {
            if ('clientCertAuth' in options) {
                throw new Error('Cannot specify clientCertAuth along with httpsAgent.');
            }
            this.httpsAgent = options.httpsAgent;
        }
        else if ('clientCertAuth' in options) {
            this.clientCertAuth = options.clientCertAuth;
        }
        this.proxy = options.proxy;
        this.requestToken = null;
    }
    // @ts-expect-error
    KintoneRequestConfigBuilder.prototype.build = function (method, path, params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var requestConfig, _a, requestUrl, _b, _c, formData, _d, _e, requestUrl, _f, _g;
            var _h, _j, _k, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        requestConfig = __assign(__assign(__assign({ method: method, headers: this.headers, url: "".concat(this.baseUrl).concat(path) }, (options ? options : {})), platformDeps.buildPlatformDependentConfig({
                            httpsAgent: this.httpsAgent,
                            clientCertAuth: this.clientCertAuth,
                        })), { proxy: this.buildProxy(this.proxy) });
                        _a = method;
                        switch (_a) {
                            case 'get': return [3 /*break*/, 1];
                            case 'post': return [3 /*break*/, 5];
                            case 'put': return [3 /*break*/, 9];
                            case 'delete': return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 13];
                    case 1:
                        requestUrl = this.buildRequestUrl(path, params);
                        if (!(requestUrl.length > THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE)) return [3 /*break*/, 3];
                        _b = [__assign({}, requestConfig)];
                        _h = { method: 'post', headers: __assign(__assign({}, this.headers), { 'X-HTTP-Method-Override': 'GET' }) };
                        return [4 /*yield*/, this.buildData(params)];
                    case 2: return [2 /*return*/, __assign.apply(void 0, _b.concat([(_h.data = _m.sent(), _h)]))];
                    case 3:
                        _c = [__assign({}, requestConfig)];
                        _j = { url: '/k/api/app/plugin/proxy/call.json', method: 'POST' };
                        return [4 /*yield*/, this.buildData(__assign(__assign({ headers: {}, body: {} }, params), { url: requestUrl, method: 'GET', 
                                // @ts-expect-error
                                appId: params === null || params === void 0 ? void 0 : params.app, 
                                // @ts-expect-error
                                pluginId: params === null || params === void 0 ? void 0 : params.pluginId }))];
                    case 4: return [2 /*return*/, __assign.apply(void 0, _c.concat([(_j.data = _m.sent(), _j)]))];
                    case 5:
                        if (!(params instanceof FormData)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.buildData(params)];
                    case 6:
                        formData = _m.sent();
                        return [2 /*return*/, __assign(__assign({}, requestConfig), { headers: 
                                // NOTE: formData.getHeaders does not exist in a browser environment.
                                typeof formData.getHeaders === 'function' ? __assign(__assign({}, this.headers), formData.getHeaders()) : this.headers, data: formData })];
                    case 7:
                        _d = [__assign({}, requestConfig)];
                        _k = {};
                        return [4 /*yield*/, this.buildData(params)];
                    case 8: return [2 /*return*/, __assign.apply(void 0, _d.concat([(_k.data = _m.sent(), _k)]))];
                    case 9:
                        _e = [__assign({}, requestConfig)];
                        _l = {};
                        return [4 /*yield*/, this.buildData(params)];
                    case 10: return [2 /*return*/, __assign.apply(void 0, _e.concat([(_l.data = _m.sent(), _l)]))];
                    case 11:
                        _f = this.buildRequestUrl;
                        _g = [path];
                        return [4 /*yield*/, this.buildData(params)];
                    case 12:
                        requestUrl = _f.apply(this, _g.concat([_m.sent()]));
                        return [2 /*return*/, __assign(__assign({}, requestConfig), { url: requestUrl })];
                    case 13:
                        {
                            throw new Error("".concat(method, " method is not supported"));
                        }
                        _m.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    KintoneRequestConfigBuilder.prototype.buildProxy = function (targetProxy) {
        var _a;
        if (!targetProxy) {
            return targetProxy;
        }
        var proxy = __assign({}, targetProxy);
        if (proxy.auth && (proxy.auth.username.length === 0 || proxy.auth.password.length === 0)) {
            proxy.auth = undefined;
        }
        proxy.protocol = (_a = proxy.protocol) !== null && _a !== void 0 ? _a : HTTP_PROXY_PROTOCOL;
        return proxy;
    };
    KintoneRequestConfigBuilder.prototype.buildRequestUrl = function (path, params) {
        return "".concat(this.baseUrl).concat(path, "?").concat(qs.stringify(params));
    };
    KintoneRequestConfigBuilder.prototype.buildData = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var requestToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.auth.type === 'session')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRequestToken()];
                    case 1:
                        requestToken = _a.sent();
                        if (params instanceof FormData) {
                            params.append('__REQUEST_TOKEN__', requestToken);
                            return [2 /*return*/, params];
                        }
                        return [2 /*return*/, __assign({ __REQUEST_TOKEN__: requestToken }, params)];
                    case 2: return [2 /*return*/, params];
                }
            });
        });
    };
    // @ts-expect-error
    KintoneRequestConfigBuilder.prototype.buildHeaders = function (params) {
        var basicAuth = params.basicAuth, userAgent = params.userAgent;
        var basicAuthHeaders = basicAuth
            ? {
                Authorization: "Basic ".concat(Base64.encode("".concat(basicAuth.username, ":").concat(basicAuth.password))),
            }
            : {};
        var platformDepsHeaders = platformDeps.buildHeaders({ userAgent: userAgent });
        var commonHeaders = __assign(__assign({}, platformDepsHeaders), basicAuthHeaders);
        // switch (this.auth.type) {
        //   case 'password': {
        //     return {
        //       ...commonHeaders,
        //       'X-Cybozu-Authorization': Base64.encode(`${this.auth.username}:${this.auth.password}`),
        //     }
        //   }
        //   case 'apiToken': {
        //     const apiToken = this.auth.apiToken
        //     if (Array.isArray(apiToken)) {
        //       return { ...commonHeaders, 'X-Cybozu-API-Token': apiToken.join(',') }
        //     }
        //     return { ...commonHeaders, 'X-Cybozu-API-Token': apiToken }
        //   }
        //   case 'oAuthToken': {
        //     return {
        //       ...commonHeaders,
        //       Authorization: `Bearer ${this.auth.oAuthToken}`,
        //     }
        //   }
        //   default: {
        //     return { ...commonHeaders, 'X-Requested-With': 'XMLHttpRequest' }
        //   }
        // }
    };
    KintoneRequestConfigBuilder.prototype.getRequestToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.requestToken === null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, platformDeps.getRequestToken()];
                    case 1:
                        _a.requestToken = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.requestToken];
                }
            });
        });
    };
    return KintoneRequestConfigBuilder;
}());
export { KintoneRequestConfigBuilder };
//# sourceMappingURL=KintoneRequestConfigBuilder.js.map