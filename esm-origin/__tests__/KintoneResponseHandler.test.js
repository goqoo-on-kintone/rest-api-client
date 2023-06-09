var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { KintoneRestAPIError } from "../error/KintoneRestAPIError";
import { KintoneAbortSearchError } from "../error/KintoneAbortSearchError";
import { KintoneResponseHandler } from "../KintoneResponseHandler";
describe("KintoneResponseHandler", function () {
    describe("handle", function () {
        var HttpClientErrorImpl = /** @class */ (function (_super) {
            __extends(HttpClientErrorImpl, _super);
            function HttpClientErrorImpl(message, response) {
                var _this = _super.call(this, message) || this;
                _this.response = response;
                return _this;
            }
            return HttpClientErrorImpl;
        }(Error));
        it("should throw an error if KintoneAbortSearchError is enabled and x-cybozu-warning is'Filter aborted because of too many search results'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var responseHandler, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responseHandler = new KintoneResponseHandler({
                            enableAbortSearchError: true,
                        });
                        response = {
                            data: { status: "success" },
                            headers: {
                                "x-cybozu-warning": "Filter aborted because of too many search results",
                            },
                        };
                        return [4 /*yield*/, expect(responseHandler.handle(Promise.resolve(response))).rejects.toThrow(KintoneAbortSearchError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should not throw an error if enableAbortSearchError is disabled and x-cybozu-warning is'Filter aborted because of too many search results'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var responseHandler, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responseHandler = new KintoneResponseHandler({
                            enableAbortSearchError: false,
                        });
                        response = {
                            data: { status: "success" },
                            headers: {
                                "x-cybozu-warning": "Filter aborted because of too many search results",
                            },
                        };
                        return [4 /*yield*/, expect(responseHandler.handle(Promise.resolve(response))).resolves.toStrictEqual({ status: "success" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should raise a KintoneRestAPIError", function () { return __awaiter(void 0, void 0, void 0, function () {
            var responseHandler, errorResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responseHandler = new KintoneResponseHandler({
                            enableAbortSearchError: false,
                        });
                        errorResponse = {
                            data: {},
                            status: 500,
                            statusText: "Internal Server Error",
                            headers: {},
                        };
                        return [4 /*yield*/, expect(responseHandler.handle(Promise.reject(new HttpClientErrorImpl("", errorResponse)))).rejects.toThrow(KintoneRestAPIError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should raise an Error if error.response.data is a string", function () { return __awaiter(void 0, void 0, void 0, function () {
            var responseHandler, errorResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responseHandler = new KintoneResponseHandler({
                            enableAbortSearchError: false,
                        });
                        errorResponse = {
                            data: "unexpected error",
                            status: 500,
                            statusText: "Internal Server Error",
                            headers: {},
                        };
                        return [4 /*yield*/, expect(responseHandler.handle(Promise.reject(new HttpClientErrorImpl("", errorResponse)))).rejects.toThrow("".concat(errorResponse.status, ": ").concat(errorResponse.statusText))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should raise an error if error.response is undefined", function () { return __awaiter(void 0, void 0, void 0, function () {
            var responseHandler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responseHandler = new KintoneResponseHandler({
                            enableAbortSearchError: false,
                        });
                        return [4 /*yield*/, expect(responseHandler.handle(Promise.reject(new HttpClientErrorImpl("unknown error")))).rejects.toThrow("unknown error")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should raise an error with appropriate message if the error is 'mac verify failure'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var responseHandler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        responseHandler = new KintoneResponseHandler({
                            enableAbortSearchError: false,
                        });
                        return [4 /*yield*/, expect(responseHandler.handle(Promise.reject(new HttpClientErrorImpl("mac verify failure")))).rejects.toThrow("invalid clientCertAuth setting")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=KintoneResponseHandler.test.js.map