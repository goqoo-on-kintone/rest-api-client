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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { RecordClient } from "../RecordClient";
import { BulkRequestClient } from "../BulkRequestClient";
import { buildMockClient } from "../../http/MockClient";
import { KintoneAllRecordsError } from "../../error/KintoneAllRecordsError";
import { KintoneRestAPIError } from "../../error/KintoneRestAPIError";
import { KintoneRequestConfigBuilder } from "../../KintoneRequestConfigBuilder";
describe("RecordClient", function () {
    var _a;
    var mockClient;
    var recordClient;
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
        var bulkRequestClient = new BulkRequestClient(mockClient);
        recordClient = new RecordClient(mockClient, bulkRequestClient);
    });
    describe("getRecord", function () {
        var params = { app: APP_ID, id: RECORD_ID };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.getRecord(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/record.json");
        });
        it("should send a get request", function () {
            expect(mockClient.getLogs()[0].method).toBe("get");
        });
        it("should pass app and id to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("addRecord", function () {
        var params = { app: APP_ID, record: record };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.addRecord(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/record.json");
        });
        it("should send a post request", function () {
            expect(mockClient.getLogs()[0].method).toBe("post");
        });
        it("should pass app and record object to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("updateRecord", function () {
        var params = {
            app: APP_ID,
            id: RECORD_ID,
            record: record,
            revision: 5,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.updateRecord(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/record.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, id, record, and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("upsertRecord", function () {
        describe("update", function () {
            var params = {
                app: APP_ID,
                updateKey: {
                    field: "Code",
                    value: "foo",
                },
                record: record,
                revision: 5,
            };
            var getRecordsMockFn;
            var updateRecordMockFn;
            var addRecordMockFn;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var bulkRequestClient;
                return __generator(this, function (_a) {
                    getRecordsMockFn = jest.fn().mockResolvedValue({
                        records: [
                            {
                                $id: {
                                    type: "__ID__",
                                    value: "10",
                                },
                            },
                        ],
                    });
                    updateRecordMockFn = jest.fn().mockResolvedValue({
                        revision: "2",
                    });
                    addRecordMockFn = jest.fn();
                    bulkRequestClient = new BulkRequestClient(mockClient);
                    recordClient = new RecordClient(mockClient, bulkRequestClient);
                    recordClient.getRecords = getRecordsMockFn;
                    recordClient.updateRecord = updateRecordMockFn;
                    recordClient.addRecord = addRecordMockFn;
                    return [2 /*return*/];
                });
            }); });
            it("should call getRecords with a query built with udpateKey", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.upsertRecord(params)];
                        case 1:
                            _a.sent();
                            expect(getRecordsMockFn.mock.calls.length).toBe(1);
                            expect(getRecordsMockFn.mock.calls[0][0]).toEqual({
                                app: params.app,
                                query: "".concat(params.updateKey.field, " = \"").concat(params.updateKey.value, "\""),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call updateRecord with the params", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.upsertRecord(params)];
                        case 1:
                            _a.sent();
                            expect(updateRecordMockFn.mock.calls.length).toBe(1);
                            expect(updateRecordMockFn.mock.calls[0][0]).toEqual(params);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should not call addRecord", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.upsertRecord(params)];
                        case 1:
                            _a.sent();
                            expect(addRecordMockFn.mock.calls.length).toBe(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return id and revision properties", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.upsertRecord(params)];
                        case 1:
                            result = _a.sent();
                            expect(result).toEqual({
                                id: "10",
                                revision: "2",
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("insert", function () {
            var params = {
                app: APP_ID,
                updateKey: {
                    field: "Customer",
                    value: "foo",
                },
                record: record,
                revision: 5,
            };
            var getRecordsMockFn;
            var updateRecordMockFn;
            var addRecordMockFn;
            beforeEach(function () {
                getRecordsMockFn = jest.fn().mockResolvedValue({
                    records: [],
                });
                updateRecordMockFn = jest.fn();
                addRecordMockFn = jest.fn().mockResolvedValue({
                    id: "10",
                    revision: "1",
                });
                var bulkRequestClient = new BulkRequestClient(mockClient);
                recordClient = new RecordClient(mockClient, bulkRequestClient);
                recordClient.getRecords = getRecordsMockFn;
                recordClient.updateRecord = updateRecordMockFn;
                recordClient.addRecord = addRecordMockFn;
            });
            it("should call getRecords with a query built with udpateKey", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.upsertRecord(params)];
                        case 1:
                            _a.sent();
                            expect(getRecordsMockFn.mock.calls.length).toBe(1);
                            expect(getRecordsMockFn.mock.calls[0][0]).toEqual({
                                app: params.app,
                                query: "".concat(params.updateKey.field, " = \"").concat(params.updateKey.value, "\""),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call addRecord with the params", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, recordClient.upsertRecord(params)];
                        case 1:
                            _b.sent();
                            expect(addRecordMockFn.mock.calls.length).toBe(1);
                            expect(addRecordMockFn.mock.calls[0][0]).toEqual({
                                app: params.app,
                                record: __assign(__assign({}, params.record), (_a = {}, _a[params.updateKey.field] = { value: params.updateKey.value }, _a)),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should not call updateRecord", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.upsertRecord(params)];
                        case 1:
                            _a.sent();
                            expect(updateRecordMockFn.mock.calls.length).toBe(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return id and revision properties", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.upsertRecord(params)];
                        case 1:
                            result = _a.sent();
                            expect(result).toEqual({
                                id: "10",
                                revision: "1",
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("getRecords", function () {
        describe("without offset", function () {
            var params = {
                app: APP_ID,
                fields: [fieldCode],
                query: "".concat(fieldCode, " = \"foo\""),
                totalCount: true,
            };
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getRecords(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/records.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app, fields, query and totalCount to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("with offset", function () {
            var consoleWarnMock;
            beforeEach(function () {
                consoleWarnMock = jest.spyOn(console, "warn");
                consoleWarnMock.mockImplementation(function (x) { return x; });
            });
            describe("offset <= 10000", function () {
                var params = {
                    app: APP_ID,
                    fields: [fieldCode],
                    query: "".concat(fieldCode, " = \"foo\" offset 10000"),
                    totalCount: true,
                };
                it("doesn't output any message to the console", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, recordClient.getRecords(params)];
                            case 1:
                                _a.sent();
                                expect(consoleWarnMock.mock.calls.length).toBe(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe("offset > 10000", function () {
                var params = {
                    app: APP_ID,
                    fields: [fieldCode],
                    query: "".concat(fieldCode, " = \"foo\" offset 10001"),
                    totalCount: true,
                };
                it("outputs a message to the console only once when the request succeeds", function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, recordClient.getRecords(params)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, recordClient.getRecords(params)];
                            case 2:
                                _a.sent();
                                expect(consoleWarnMock.mock.calls.length).toBe(1);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it("doesn't output any message to the console when the request fails", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                expect.assertions(1);
                                mockClient.mockResponse(new Error("failed"));
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, recordClient.getRecords(params)];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                _a = _b.sent();
                                expect(consoleWarnMock.mock.calls.length).toBe(0);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            });
            afterEach(function () {
                consoleWarnMock.mockReset();
                consoleWarnMock.mockRestore();
            });
        });
    });
    describe("addRecords", function () {
        var params = { app: APP_ID, records: [record] };
        var mockResponse = {
            ids: ["10", "20", "30"],
            revisions: ["1", "2", "3"],
        };
        var response;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockClient.mockResponse(mockResponse);
                        return [4 /*yield*/, recordClient.addRecords(params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/records.json");
        });
        it("should send a post request", function () {
            expect(mockClient.getLogs()[0].method).toBe("post");
        });
        it("should pass app and records to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
        it("should return a response having ids, revisions, and records", function () {
            expect(response).toEqual(__assign(__assign({}, mockResponse), { records: [
                    { id: "10", revision: "1" },
                    { id: "20", revision: "2" },
                    { id: "30", revision: "3" },
                ] }));
        });
    });
    describe("updateRecords", function () {
        var params = {
            app: APP_ID,
            records: [{ id: RECORD_ID, record: record, revision: 5 }],
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.updateRecords(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/records.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, id, record, and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("deleteRecords", function () {
        var ids = [10, 20, 30];
        var revisions = [1, 2, 3];
        var params = {
            app: APP_ID,
            ids: ids,
            revisions: revisions,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.deleteRecords(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/records.json");
        });
        it("should send a delete request", function () {
            expect(mockClient.getLogs()[0].method).toBe("delete");
        });
        it("should pass app, ids, and revisions to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("createCursor", function () {
        var params = {
            app: APP_ID,
            fields: [fieldCode],
            query: "".concat(fieldCode, " = \"foo\""),
            size: 10,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.createCursor(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/records/cursor.json");
        });
        it("should send a post request", function () {
            expect(mockClient.getLogs()[0].method).toBe("post");
        });
        it("should pass app, fields, query, and size to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getRecordsByCursor", function () {
        var params = {
            id: "cursor id",
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.getRecordsByCursor(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/records/cursor.json");
        });
        it("should send a get request", function () {
            expect(mockClient.getLogs()[0].method).toBe("get");
        });
        it("should pass id to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("deleteCursor", function () {
        var params = {
            id: "cursor id",
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.deleteCursor(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/records/cursor.json");
        });
        it("should send a delete request", function () {
            expect(mockClient.getLogs()[0].method).toBe("delete");
        });
        it("should pass id to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getAllRecordsWithId", function () {
        describe("success with condition", function () {
            it("should do nothing if `fields` is not specified", function () { return __awaiter(void 0, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                app: APP_ID,
                                condition: "".concat(fieldCode, " = \"foo\""),
                            };
                            mockClient.mockResponse({ records: [] });
                            return [4 /*yield*/, recordClient.getAllRecordsWithId(params)];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[0].params.fields).toBe(undefined);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should do nothing if `fields` is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                app: APP_ID,
                                fields: [],
                                condition: "".concat(fieldCode, " = \"foo\""),
                            };
                            mockClient.mockResponse({ records: [] });
                            return [4 /*yield*/, recordClient.getAllRecordsWithId(params)];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[0].params.fields).toEqual([]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should append `$id` if `fields` is specified and doesn't contain `$id`", function () { return __awaiter(void 0, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                app: APP_ID,
                                fields: [fieldCode],
                                condition: "".concat(fieldCode, " = \"foo\""),
                            };
                            mockClient.mockResponse({ records: [] });
                            return [4 /*yield*/, recordClient.getAllRecordsWithId(params)];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[0].params.fields.sort()).toEqual(__spreadArray(__spreadArray([], params.fields, true), ["$id"], false).sort());
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should do nothing if `fields` is specified and contains `$id`", function () { return __awaiter(void 0, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                app: APP_ID,
                                fields: ["$id", fieldCode],
                                condition: "".concat(fieldCode, " = \"foo\""),
                            };
                            mockClient.mockResponse({ records: [] });
                            return [4 /*yield*/, recordClient.getAllRecordsWithId(params)];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[0].params.fields).toEqual(params.fields);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("success with condition", function () {
            var params = {
                app: APP_ID,
                fields: ["$id"],
                condition: "".concat(fieldCode, " = \"foo\""),
            };
            var result;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var records, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            records = [];
                            for (i = 1; i <= 500; i++) {
                                records.push({
                                    $id: {
                                        type: "__ID__",
                                        value: i.toString(),
                                    },
                                });
                            }
                            mockClient.mockResponse({ records: records });
                            mockClient.mockResponse({
                                records: [{ $id: { type: "__ID__", value: "501" } }],
                            });
                            return [4 /*yield*/, recordClient.getAllRecordsWithId(params)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return all records", function () {
                expect(mockClient.getLogs()[0]).toEqual({
                    path: "/k/v1/records.json",
                    method: "get",
                    params: {
                        app: params.app,
                        fields: params.fields,
                        query: "(".concat(params.condition, ") and $id > 0 order by $id asc limit 500"),
                    },
                });
                expect(mockClient.getLogs()[1]).toEqual({
                    path: "/k/v1/records.json",
                    method: "get",
                    params: {
                        app: params.app,
                        fields: params.fields,
                        query: "(".concat(params.condition, ") and $id > 500 order by $id asc limit 500"),
                    },
                });
                expect(result.length).toBe(501);
                expect(result[500]).toStrictEqual({
                    $id: { type: "__ID__", value: "501" },
                });
            });
        });
        describe("success without condition", function () {
            var params = {
                app: APP_ID,
                fields: ["$id"],
            };
            var result;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var records, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            records = [];
                            for (i = 1; i <= 500; i++) {
                                records.push({
                                    $id: {
                                        type: "__ID__",
                                        value: i.toString(),
                                    },
                                });
                            }
                            mockClient.mockResponse({ records: records });
                            mockClient.mockResponse({
                                records: [{ $id: { type: "__ID__", value: "501" } }],
                            });
                            return [4 /*yield*/, recordClient.getAllRecordsWithId(params)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return all records", function () {
                expect(mockClient.getLogs()[0]).toEqual({
                    path: "/k/v1/records.json",
                    method: "get",
                    params: {
                        app: params.app,
                        fields: params.fields,
                        query: "$id > 0 order by $id asc limit 500",
                    },
                });
                expect(mockClient.getLogs()[1]).toEqual({
                    path: "/k/v1/records.json",
                    method: "get",
                    params: {
                        app: params.app,
                        fields: params.fields,
                        query: "$id > 500 order by $id asc limit 500",
                    },
                });
                expect(result.length).toBe(501);
                expect(result[500]).toStrictEqual({
                    $id: { type: "__ID__", value: "501" },
                });
            });
        });
    });
    describe("getAllRecordsWithOffset", function () {
        describe("condition and orderBy parameters", function () {
            it("with condition and orderBy", function () { return __awaiter(void 0, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                app: APP_ID,
                                condition: "".concat(fieldCode, " = \"foo\""),
                                orderBy: "".concat(fieldCode, " asc"),
                            };
                            mockClient.mockResponse({ records: [] });
                            return [4 /*yield*/, recordClient.getAllRecordsWithOffset(params)];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[0].params.query).toBe("".concat(fieldCode, " = \"foo\" order by ").concat(fieldCode, " asc limit 500 offset 0"));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("with condition, without orderBy", function () { return __awaiter(void 0, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                app: APP_ID,
                                condition: "".concat(fieldCode, " = \"foo\""),
                            };
                            mockClient.mockResponse({ records: [] });
                            return [4 /*yield*/, recordClient.getAllRecordsWithOffset(params)];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[0].params.query).toBe("".concat(fieldCode, " = \"foo\" limit 500 offset 0"));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("without condition, with orderBy", function () { return __awaiter(void 0, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                app: APP_ID,
                                orderBy: "".concat(fieldCode, " asc"),
                            };
                            mockClient.mockResponse({ records: [] });
                            return [4 /*yield*/, recordClient.getAllRecordsWithOffset(params)];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[0].params.query).toBe("order by ".concat(fieldCode, " asc limit 500 offset 0"));
                            return [2 /*return*/];
                    }
                });
            }); });
            it("neither condition nor orderBy", function () { return __awaiter(void 0, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                app: APP_ID,
                            };
                            mockClient.mockResponse({ records: [] });
                            return [4 /*yield*/, recordClient.getAllRecordsWithOffset(params)];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[0].params.query).toBe("limit 500 offset 0");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("success", function () {
            var params = {
                app: APP_ID,
                fields: ["$id"],
                condition: "".concat(fieldCode, " = \"foo\""),
            };
            var result;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var records, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            records = [];
                            for (i = 1; i <= 500; i++) {
                                records.push({
                                    $id: {
                                        type: "__ID__",
                                        value: i.toString(),
                                    },
                                });
                            }
                            mockClient.mockResponse({ records: records });
                            mockClient.mockResponse({
                                records: [{ $id: { type: "__ID__", value: "501" } }],
                            });
                            return [4 /*yield*/, recordClient.getAllRecordsWithOffset(params)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return all records", function () {
                expect(mockClient.getLogs()[0]).toEqual({
                    path: "/k/v1/records.json",
                    method: "get",
                    params: {
                        app: params.app,
                        fields: params.fields,
                        query: "".concat(params.condition, " limit 500 offset 0"),
                    },
                });
                expect(mockClient.getLogs()[1]).toEqual({
                    path: "/k/v1/records.json",
                    method: "get",
                    params: {
                        app: params.app,
                        fields: params.fields,
                        query: "".concat(params.condition, " limit 500 offset 500"),
                    },
                });
                expect(result.length).toBe(501);
                expect(result[500]).toStrictEqual({
                    $id: { type: "__ID__", value: "501" },
                });
            });
        });
    });
    describe("getAllRecords", function () {
        describe("`orderBy` is specified", function () {
            var params = {
                app: APP_ID,
                condition: "".concat(fieldCode, " = \"foo\""),
                orderBy: "".concat(fieldCode, " asc"),
            };
            var withCursorMockFn;
            var withOffsetMockFn;
            beforeEach(function () {
                withCursorMockFn = jest.fn();
                withOffsetMockFn = jest.fn();
                recordClient.getAllRecordsWithCursor = withCursorMockFn;
                recordClient.getAllRecordsWithOffset = withOffsetMockFn;
            });
            it("should call `getAllRecordsWithCursor` if `withCursor` is not specified", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(__assign({}, params))];
                        case 1:
                            _a.sent();
                            expect(withCursorMockFn.mock.calls.length).toBe(1);
                            expect(withCursorMockFn.mock.calls[0][0]).toStrictEqual({
                                app: params.app,
                                query: "".concat(params.condition, " order by ").concat(params.orderBy),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call `getAllRecordsWithCursor` if `withCursor` is true", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(__assign(__assign({}, params), { withCursor: true }))];
                        case 1:
                            _a.sent();
                            expect(withCursorMockFn.mock.calls.length).toBe(1);
                            expect(withCursorMockFn.mock.calls[0][0]).toStrictEqual({
                                app: params.app,
                                query: "".concat(params.condition, " order by ").concat(params.orderBy),
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call `getAllRecordsWithOffset` if `withCursor` is false", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(__assign(__assign({}, params), { withCursor: false }))];
                        case 1:
                            _a.sent();
                            expect(withOffsetMockFn.mock.calls.length).toBe(1);
                            expect(withOffsetMockFn.mock.calls[0][0]).toStrictEqual(params);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("`orderBy` is an empty string", function () {
            var params = {
                app: APP_ID,
                condition: "".concat(fieldCode, " = \"foo\""),
                orderBy: "",
            };
            var orderBy = params.orderBy, expected = __rest(params, ["orderBy"]);
            var mockFn;
            beforeEach(function () {
                mockFn = jest.fn();
                recordClient.getAllRecordsWithId = mockFn;
            });
            it("should call `getAllRecordsWithId` if `withCursor` is not specified", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(params)];
                        case 1:
                            _a.sent();
                            expect(mockFn.mock.calls.length).toBe(1);
                            expect(mockFn.mock.calls[0][0]).toStrictEqual(expected);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call `getAllRecordsWithId` if `withCursor` is true", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(__assign(__assign({}, params), { withCursor: true }))];
                        case 1:
                            _a.sent();
                            expect(mockFn.mock.calls.length).toBe(1);
                            expect(mockFn.mock.calls[0][0]).toStrictEqual(expected);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call `getAllRecordsWithId` if `withCursor` is false", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(__assign(__assign({}, params), { withCursor: false }))];
                        case 1:
                            _a.sent();
                            expect(mockFn.mock.calls.length).toBe(1);
                            expect(mockFn.mock.calls[0][0]).toStrictEqual(expected);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("`orderBy` is not specified", function () {
            var params = {
                app: APP_ID,
                condition: "".concat(fieldCode, " = \"foo\""),
            };
            var mockFn;
            beforeEach(function () {
                mockFn = jest.fn();
                recordClient.getAllRecordsWithId = mockFn;
            });
            it("should call `getAllRecordsWithId` if `withCursor` is not specified", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(params)];
                        case 1:
                            _a.sent();
                            expect(mockFn.mock.calls.length).toBe(1);
                            expect(mockFn.mock.calls[0][0]).toStrictEqual(params);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call `getAllRecordsWithId` if `withCursor` is true", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(__assign(__assign({}, params), { withCursor: true }))];
                        case 1:
                            _a.sent();
                            expect(mockFn.mock.calls.length).toBe(1);
                            expect(mockFn.mock.calls[0][0]).toStrictEqual(params);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call `getAllRecordsWithId` if `withCursor` is false", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, recordClient.getAllRecords(__assign(__assign({}, params), { withCursor: false }))];
                        case 1:
                            _a.sent();
                            expect(mockFn.mock.calls.length).toBe(1);
                            expect(mockFn.mock.calls[0][0]).toStrictEqual(params);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("getAllRecordsWithCursor", function () {
        var params = {
            app: APP_ID,
            fields: [fieldCode],
            query: "".concat(fieldCode, " = \"foo\""),
        };
        var CURSOR_ID = "1";
        var result;
        describe("success", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // response from createCursor
                            mockClient.mockResponse({ id: CURSOR_ID, totalCount: "4" });
                            // response from getRecordsByCursor
                            mockClient.mockResponse({
                                records: [
                                    { $id: { type: "__ID__", value: "1" } },
                                    { $id: { type: "__ID__", value: "2" } },
                                ],
                                next: true,
                            });
                            mockClient.mockResponse({
                                records: [
                                    { $id: { type: "__ID__", value: "3" } },
                                    { $id: { type: "__ID__", value: "4" } },
                                ],
                                next: false,
                            });
                            return [4 /*yield*/, recordClient.getAllRecordsWithCursor(params)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should create a cursor", function () {
                expect(mockClient.getLogs()[0]).toEqual({
                    path: "/k/v1/records/cursor.json",
                    method: "post",
                    params: params,
                });
            });
            it("should return all records", function () {
                expect(mockClient.getLogs()[1]).toEqual({
                    path: "/k/v1/records/cursor.json",
                    method: "get",
                    params: { id: CURSOR_ID },
                });
                expect(mockClient.getLogs()[2]).toEqual({
                    path: "/k/v1/records/cursor.json",
                    method: "get",
                    params: { id: CURSOR_ID },
                });
                expect(result).toStrictEqual([
                    { $id: { type: "__ID__", value: "1" } },
                    { $id: { type: "__ID__", value: "2" } },
                    { $id: { type: "__ID__", value: "3" } },
                    { $id: { type: "__ID__", value: "4" } },
                ]);
            });
            it("should not call deleteCursor", function () {
                expect(mockClient.getLogs().length).toEqual(3);
            });
        });
        describe("failure", function () {
            beforeEach(function () {
                // response from createCursor
                mockClient.mockResponse({ id: CURSOR_ID, totalCount: "4" });
                // response from getRecordsByCursor
                mockClient.mockResponse({
                    records: [{ id: 1 }, { id: 2 }],
                    next: true,
                });
                mockClient.mockResponse(new Error("failed"));
            });
            it("should raise error", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, expect(recordClient.getAllRecordsWithCursor(params)).rejects.toThrow("failed")];
                        case 1:
                            _a.sent();
                            expect(mockClient.getLogs()[3]).toStrictEqual({
                                path: "/k/v1/records/cursor.json",
                                method: "delete",
                                params: { id: CURSOR_ID },
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("addAllRecords", function () {
        var params = {
            app: APP_ID,
            records: Array.from({ length: 3000 }, function (_, index) { return index + 1; }).map(function (value) {
                var _a;
                return (_a = {},
                    _a[fieldCode] = {
                        value: value,
                    },
                    _a);
            }),
        };
        var response;
        describe("success", function () {
            var mockResponse = {
                results: Array.from({ length: 20 }, function (_, index) { return index + 1; }).map(function (value) { return ({
                    ids: Array.from({ length: 100 }, function (_, index) { return index + 1; }),
                    revisions: Array.from({ length: 100 }, function () { return 1; }),
                }); }),
            };
            var mockResponse2 = {
                results: Array.from({ length: 10 }, function (_, index) { return index + 1; }).map(function (value) { return ({
                    ids: Array.from({ length: 100 }, function (_, index) { return index + 1; }),
                    revisions: Array.from({ length: 100 }, function () { return 1; }),
                }); }),
            };
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // response from first call of bulkRequest.send
                            mockClient.mockResponse(mockResponse);
                            // response from second call of bulkRequest.send
                            mockClient.mockResponse(mockResponse2);
                            return [4 /*yield*/, recordClient.addAllRecords(params)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call bulkRequest multiple times", function () {
                expect(mockClient.getLogs().length).toBe(2);
            });
            it("should return merged result of each bulkRequest's result", function () {
                var accumulateResponse = function (acc, _a) {
                    var ids = _a.ids, revisions = _a.revisions;
                    return acc.concat(ids.map(function (id, index) { return ({
                        id: id,
                        revision: revisions[index],
                    }); }));
                };
                var expected = __spreadArray(__spreadArray([], mockResponse.results.reduce(accumulateResponse, []), true), mockResponse2.results.reduce(accumulateResponse, []), true);
                expect(response.records).toStrictEqual(expected);
            });
        });
        describe("parameter error", function () {
            it("should raise an Error if `records` parameter is not an array", function () { return __awaiter(void 0, void 0, void 0, function () {
                var invalidParams;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            invalidParams = {
                                app: APP_ID,
                                records: Array.from({ length: 3000 }, function (_, index) { return index + 1; }).map(function (value) {
                                    var _a;
                                    if (value === 1000) {
                                        return value;
                                    }
                                    return _a = {},
                                        _a[fieldCode] = {
                                            value: value,
                                        },
                                        _a;
                                }),
                            };
                            return [4 /*yield*/, expect(recordClient.addAllRecords(invalidParams)).rejects.toThrow("the `records` parameter must be an array of object.")];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("response error", function () {
            var _a;
            // success
            var mockResponse = {
                results: Array.from({ length: 20 }, function (_, index) { return index + 1; }).map(function (value) { return ({
                    ids: Array.from({ length: 100 }, function (_, index) { return index + 1; }),
                    revisions: Array.from({ length: 100 }, function () { return 1; }),
                }); }),
            };
            // failed
            var errorResponse = {
                data: {
                    results: [
                        {},
                        {},
                        {
                            id: "some id",
                            code: "some code",
                            message: "some error message",
                            errors: (_a = {},
                                _a["records[5].Customer"] = {
                                    messages: ["key is missing"],
                                },
                                _a),
                        },
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                    ],
                },
                status: 500,
                statusText: "Internal Server Error",
                headers: {
                    "X-Some-Header": "error",
                },
            };
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mockClient.mockResponse(mockResponse);
                    mockClient.mockResponse(new KintoneRestAPIError(errorResponse));
                    return [2 /*return*/];
                });
            }); });
            it("should raise an KintoneAllRecordsError if an error occurs during bulkRequest", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, expect(recordClient.addAllRecords(params)).rejects.toBeInstanceOf(KintoneAllRecordsError)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("updateAllRecords", function () {
        var params = {
            app: APP_ID,
            records: Array.from({ length: 3000 }, function (_, index) { return index + 1; }).map(function (value) {
                var _a;
                return ({
                    id: value,
                    record: (_a = {},
                        _a[fieldCode] = {
                            value: "".concat(fieldCode, "-").concat(value),
                        },
                        _a),
                    revision: 1,
                });
            }),
        };
        var response;
        describe("success", function () {
            var mockResponse = {
                results: Array.from({ length: 20 }, function (_, index) { return index; }).map(function (value) { return ({
                    records: Array.from({ length: 100 }, function (_, index) {
                        return String(value * 100 + index + 1);
                    }).map(function (id) { return ({
                        id: id,
                        revision: "2",
                    }); }),
                }); }),
            };
            var mockResponse2 = {
                results: Array.from({ length: 10 }, function (_, index) { return index; }).map(function (value) { return ({
                    records: Array.from({ length: 100 }, function (_, index) {
                        return String(2000 + value * 100 + index + 1);
                    }).map(function (id) { return ({
                        id: id,
                        revision: "2",
                    }); }),
                }); }),
            };
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // response from first call of bulkRequest.send
                            mockClient.mockResponse(mockResponse);
                            // response from second call of bulkRequest.send
                            mockClient.mockResponse(mockResponse2);
                            return [4 /*yield*/, recordClient.updateAllRecords(params)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call bulkRequest multiple times", function () {
                expect(mockClient.getLogs().length).toBe(2);
            });
            it("should return merged result of each bulkRequest's result", function () {
                var accumulateResponse = function (acc, result) {
                    return acc.concat(result.records);
                };
                var expected = __spreadArray(__spreadArray([], mockResponse.results, true), mockResponse2.results, true).reduce(accumulateResponse, []);
                expect(response.records).toStrictEqual(expected);
            });
        });
        describe("response error", function () {
            var _a;
            // success
            var mockResponse = {
                results: Array.from({ length: 20 }, function (_, index) { return index; }).map(function (value) { return ({
                    records: Array.from({ length: 100 }, function (_, index) {
                        return String(value * 100 + index + 1);
                    }).map(function (id) { return ({
                        id: id,
                        revision: "2",
                    }); }),
                }); }),
            };
            // failed
            var errorResponse = {
                data: {
                    results: [
                        {},
                        {},
                        {
                            id: "some id",
                            code: "some code",
                            message: "some error message",
                            errors: (_a = {},
                                _a["records[5].Customer"] = {
                                    messages: ["key is missing"],
                                },
                                _a),
                        },
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                    ],
                },
                status: 500,
                statusText: "Internal Server Error",
                headers: {
                    "X-Some-Header": "error",
                },
            };
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mockClient.mockResponse(mockResponse);
                    mockClient.mockResponse(new KintoneRestAPIError(errorResponse));
                    return [2 /*return*/];
                });
            }); });
            it("should raise an KintoneAllRecordsError if an error occurs during bulkRequest", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, expect(recordClient.updateAllRecords(params)).rejects.toBeInstanceOf(KintoneAllRecordsError)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("deleteAllRecords", function () {
        var params = {
            app: APP_ID,
            records: Array.from({ length: 3000 }, function (_, index) { return index + 1; }).map(function (value) { return ({
                id: value,
                revision: 1,
            }); }),
        };
        var response;
        describe("success", function () {
            var mockResponse = {
                results: Array.from({ length: 20 }, function () { return ({}); }),
            };
            var mockResponse2 = {
                results: Array.from({ length: 10 }, function () { return ({}); }),
            };
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // response from first call of bulkRequest.send
                            mockClient.mockResponse(mockResponse);
                            // response from second call of bulkRequest.send
                            mockClient.mockResponse(mockResponse2);
                            return [4 /*yield*/, recordClient.deleteAllRecords(params)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should call bulkRequest multiple times", function () {
                expect(mockClient.getLogs().length).toBe(2);
            });
            it("should return an empty object", function () {
                expect(response).toStrictEqual({});
            });
        });
        describe("response error", function () {
            // success
            var mockResponse = {
                results: Array.from({ length: 20 }, function () { return ({}); }),
            };
            // failed
            var errorResponse = {
                data: {
                    results: [
                        {},
                        {},
                        {
                            id: "some id",
                            code: "some code",
                            message: "some error message",
                        },
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                    ],
                },
                status: 500,
                statusText: "Internal Server Error",
                headers: {
                    "X-Some-Header": "error",
                },
            };
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mockClient.mockResponse(mockResponse);
                    mockClient.mockResponse(new KintoneRestAPIError(errorResponse));
                    return [2 /*return*/];
                });
            }); });
            it("should raise an KintoneAllRecordsError if an error occurs during bulkRequest", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, expect(recordClient.deleteAllRecords(params)).rejects.toBeInstanceOf(KintoneAllRecordsError)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("addRecordComment", function () {
        var params = {
            app: APP_ID,
            record: RECORD_ID,
            comment: {
                text: "hello",
                mentions: [
                    {
                        code: "Administrator",
                        type: "USER",
                    },
                ],
            },
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.addRecordComment(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/record/comment.json");
        });
        it("should send a post request", function () {
            expect(mockClient.getLogs()[0].method).toBe("post");
        });
        it("should pass app, record and comment to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("deleteRecordComment", function () {
        var params = {
            app: APP_ID,
            record: RECORD_ID,
            comment: "1",
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.deleteRecordComment(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/record/comment.json");
        });
        it("should send a delete request", function () {
            expect(mockClient.getLogs()[0].method).toBe("delete");
        });
        it("should pass app, record and comment to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getRecordComments", function () {
        var params = {
            app: APP_ID,
            record: RECORD_ID,
            order: "desc",
            offset: 5,
            limit: 5,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.getRecordComments(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/record/comments.json");
        });
        it("should send a get request", function () {
            expect(mockClient.getLogs()[0].method).toBe("get");
        });
        it("should pass app, record, order, offset and limit to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("updateRecordAssignees", function () {
        var params = {
            app: APP_ID,
            id: RECORD_ID,
            assignees: ["user1"],
            revision: 10,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.updateRecordAssignees(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/record/assignees.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, id, assignees, and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("updateRecordStatus", function () {
        var params = {
            action: "Action1",
            app: APP_ID,
            assignee: "user1",
            id: RECORD_ID,
            revision: 10,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.updateRecordStatus(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/record/status.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass action, app, assignee, id, and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("updateRecordsStatus", function () {
        var params = {
            app: APP_ID,
            records: [
                {
                    action: "Action1",
                    assignee: "user1",
                    id: RECORD_ID,
                    revision: 10,
                },
            ],
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recordClient.updateRecordsStatus(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/records/status.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app and records to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
});
describe("RecordClient with guestSpaceId", function () {
    it("should pass the path to the http client", function () { return __awaiter(void 0, void 0, void 0, function () {
        var APP_ID, RECORD_ID, GUEST_SPACE_ID, requestConfigBuilder, mockClient, bulkRequestClient, recordClient, params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    APP_ID = 1;
                    RECORD_ID = 2;
                    GUEST_SPACE_ID = 3;
                    requestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: "https://example.cybozu.com",
                        auth: { type: "session" },
                    });
                    mockClient = buildMockClient(requestConfigBuilder);
                    bulkRequestClient = new BulkRequestClient(mockClient);
                    recordClient = new RecordClient(mockClient, bulkRequestClient, GUEST_SPACE_ID);
                    params = { app: APP_ID, id: RECORD_ID };
                    return [4 /*yield*/, recordClient.getRecord(params)];
                case 1:
                    _a.sent();
                    expect(mockClient.getLogs()[0].path).toBe("/k/guest/".concat(GUEST_SPACE_ID, "/v1/record.json"));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=RecordClient.test.js.map