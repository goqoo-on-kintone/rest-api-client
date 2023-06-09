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
import { buildMockClient } from "../../http/MockClient";
import { BulkRequestClient } from "../BulkRequestClient";
import { KintoneRequestConfigBuilder } from "../../KintoneRequestConfigBuilder";
describe("BulkRequestClient", function () {
    var _a;
    var mockClient;
    var bulkRequestClient;
    var APP_ID = 1;
    var RECORD_ID = 2;
    var fieldCode = "Customer";
    var record = (_a = {},
        _a[fieldCode] = {
            value: "ABC Corporation",
        },
        _a);
    beforeEach(function () {
        var requestConfigBuilder = new KintoneRequestConfigBuilder({
            baseUrl: "https://example.cybozu.com",
            auth: { type: "apiToken", apiToken: "foo" },
        });
        mockClient = buildMockClient(requestConfigBuilder);
        bulkRequestClient = new BulkRequestClient(mockClient);
    });
    describe("send", function () {
        var params = {
            requests: [
                {
                    method: "POST",
                    api: "/k/v1/record.json",
                    payload: {
                        app: APP_ID,
                        record: record,
                    },
                },
                {
                    method: "DELETE",
                    api: "/k/v1/records.json",
                    payload: {
                        app: APP_ID,
                        ids: [RECORD_ID],
                    },
                },
            ],
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bulkRequestClient.send(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/bulkRequest.json");
        });
        it("should send a post request", function () {
            expect(mockClient.getLogs()[0].method).toBe("post");
        });
        it("should pass requests to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("send with endpointName", function () {
        var params = {
            requests: [
                {
                    method: "POST",
                    endpointName: "record",
                    payload: {
                        app: APP_ID,
                        record: record,
                    },
                },
                {
                    method: "DELETE",
                    endpointName: "records",
                    payload: {
                        app: APP_ID,
                        ids: [RECORD_ID],
                    },
                },
            ],
        };
        var expected = {
            requests: [
                {
                    method: "POST",
                    api: "/k/v1/record.json",
                    payload: {
                        app: APP_ID,
                        record: record,
                    },
                },
                {
                    method: "DELETE",
                    api: "/k/v1/records.json",
                    payload: {
                        app: APP_ID,
                        ids: [RECORD_ID],
                    },
                },
            ],
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bulkRequestClient.send(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/bulkRequest.json");
        });
        it("should send a post request", function () {
            expect(mockClient.getLogs()[0].method).toBe("post");
        });
        it("should pass requests with the path corresponding to the endpointName to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(expected);
        });
    });
});
describe("BulkRequestClient with guestSpaceId", function () {
    var mockClient;
    var bulkRequestClient;
    var APP_ID = 1;
    var GUEST_SPACE_ID = 2;
    beforeEach(function () {
        var requestConfigBuilder = new KintoneRequestConfigBuilder({
            baseUrl: "https://example.cybozu.com",
            auth: { type: "apiToken", apiToken: "foo" },
        });
        mockClient = buildMockClient(requestConfigBuilder);
        bulkRequestClient = new BulkRequestClient(mockClient, GUEST_SPACE_ID);
    });
    it("should pass the path to the http client", function () { return __awaiter(void 0, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        requests: [
                            {
                                method: "POST",
                                api: "/k/v1/record.json",
                                payload: {
                                    app: APP_ID,
                                    record: {
                                        Customer: {
                                            value: "ABC Corporation",
                                        },
                                    },
                                },
                            },
                        ],
                    };
                    return [4 /*yield*/, bulkRequestClient.send(params)];
                case 1:
                    _a.sent();
                    expect(mockClient.getLogs()[0].path).toBe("/k/guest/".concat(GUEST_SPACE_ID, "/v1/bulkRequest.json"));
                    return [2 /*return*/];
            }
        });
    }); });
    it("should pass the path as a param with the guest space id to the http client", function () { return __awaiter(void 0, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        requests: [
                            {
                                method: "POST",
                                endpointName: "record",
                                payload: {
                                    app: APP_ID,
                                    record: {
                                        Customer: {
                                            value: "ABC Corporation",
                                        },
                                    },
                                },
                            },
                        ],
                    };
                    return [4 /*yield*/, bulkRequestClient.send(params)];
                case 1:
                    _a.sent();
                    expect(mockClient.getLogs()[0].params.requests[0].api).toEqual("/k/guest/".concat(GUEST_SPACE_ID, "/v1/record.json"));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=BulkRequestClient.test.js.map