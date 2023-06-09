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
import { buildMockClient } from "../../http/MockClient";
import { AppClient } from "../AppClient";
import { KintoneRequestConfigBuilder } from "../../KintoneRequestConfigBuilder";
var APP_ID = 1;
var REVISION = 5;
var RECORD_ID = 3;
var properties = {
    fieldCode: {
        type: "SINGLE_LINE_TEXT",
        code: "fieldCode",
        label: "Text Field",
    },
};
var layout = [
    {
        type: "ROW",
        fields: [
            {
                type: "SINGLE_LINE_TEXT",
                code: "fieldCode1",
                size: { width: "100" },
            },
            {
                type: "LABEL",
                label: "label1",
                size: { width: "100" },
            },
            {
                type: "SPACER",
                elementId: "space",
                size: { width: "100", height: "50" },
            },
        ],
    },
    {
        type: "SUBTABLE",
        code: "tableFieldCode",
        fields: [
            {
                type: "MULTI_LINE_TEXT",
                code: "fieldCode2",
                size: { width: "150", innerHeight: "200" },
            },
        ],
    },
    {
        type: "GROUP",
        code: "fieldCode3",
        layout: [
            {
                type: "ROW",
                fields: [
                    {
                        type: "NUMBER",
                        code: "fieldCode3_1",
                        size: {
                            width: 200,
                        },
                    },
                ],
            },
        ],
    },
];
var views = {
    view1: {
        type: "LIST",
        index: 0,
        name: "view1",
        fields: ["field"],
        filterCond: 'field = "foo"',
        sort: "sortField desc",
    },
    view2: {
        type: "CALENDAR",
        index: 1,
        name: "view2",
        date: "dateField",
        title: "titleField",
        filterCond: 'field = "bar"',
        sort: "sortField asc",
    },
    view3: {
        type: "CUSTOM",
        index: 2,
        name: "view3",
        html: "<div>Hello!</div>",
        pager: true,
        device: "DESKTOP",
    },
};
var states = {
    status1: {
        name: "status1",
        index: 0,
        assignee: {
            type: "ONE",
            entities: [
                { entity: { type: "FIELD_ENTITY", code: "creator" } },
            ],
        },
    },
    status2: {
        name: "status2",
        index: 1,
        assignee: {
            type: "ANY",
            entities: [{ entity: { type: "CREATOR" } }],
        },
    },
    status3: {
        name: "status3",
        index: 2,
        assignee: {
            type: "ALL",
            entities: [
                { entity: { type: "USER", code: "user1" } },
                { entity: { type: "USER", code: "user2" } },
            ],
        },
    },
};
var actions = [
    { name: "action1to2", from: "status1", to: "status2" },
    {
        name: "action2to3",
        from: "status2",
        to: "status3",
        filterCond: 'field = "foo"',
    },
];
describe("AppClient", function () {
    var mockClient;
    var appClient;
    beforeEach(function () {
        var requestConfigBuilder = new KintoneRequestConfigBuilder({
            baseUrl: "https://example.cybozu.com",
            auth: { type: "apiToken", apiToken: "foo" },
        });
        mockClient = buildMockClient(requestConfigBuilder);
        appClient = new AppClient(mockClient);
    });
    describe("getFormFields", function () {
        var lang = "default";
        var params = { app: APP_ID, lang: lang };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getFormFields(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/form/fields.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getFormFields(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/form/fields.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("addFormFields", function () {
        var params = { app: APP_ID, properties: properties, revision: REVISION };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.addFormFields(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/form/fields.json");
        });
        it("should send a post request", function () {
            expect(mockClient.getLogs()[0].method).toBe("post");
        });
        it("should pass app, properties and revision as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("updateFormFields", function () {
        var params = { app: APP_ID, properties: properties, revision: REVISION };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateFormFields(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/form/fields.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, properties and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("deleteFormFields", function () {
        var fields = ["fieldCode1", "fieldCode2"];
        var params = { app: APP_ID, fields: fields, revision: REVISION };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.deleteFormFields(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/form/fields.json");
        });
        it("should send a delete request", function () {
            expect(mockClient.getLogs()[0].method).toBe("delete");
        });
        it("should pass app, fields, and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getFormLayout", function () {
        var params = { app: APP_ID };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getFormLayout(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/form/layout.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getFormLayout(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/form/layout.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateFormLayout", function () {
        var params = { app: APP_ID, layout: layout, revision: REVISION };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateFormLayout(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/form/layout.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, layout and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getViews", function () {
        var lang = "default";
        var params = { app: APP_ID, lang: lang };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getViews(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/views.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getViews(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/views.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateViews", function () {
        var params = { app: APP_ID, views: views, revision: REVISION };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateViews(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/views.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, views and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getApp", function () {
        var params = {
            id: APP_ID,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.getApp(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/app.json");
        });
        it("should send a get request", function () {
            expect(mockClient.getLogs()[0].method).toBe("get");
        });
        it("should pass id as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getApps", function () {
        var params = {
            ids: [APP_ID],
            codes: ["APP"],
            name: "app",
            spaceIds: [1, 2],
            limit: 100,
            offset: 30,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.getApps(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/apps.json");
        });
        it("should send a get request", function () {
            expect(mockClient.getLogs()[0].method).toBe("get");
        });
        it("should pass ids, codes, name, spaceIds, limit, and offset as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("addApp", function () {
        describe("without space", function () {
            var params = {
                name: "app",
            };
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.addApp(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app.json");
            });
            it("should send a post request", function () {
                expect(mockClient.getLogs()[0].method).toBe("post");
            });
            it("should pass name, space, and thread as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("with space", function () {
            var params = {
                name: "app",
                space: 10,
            };
            var defaultThread = 20;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mockClient.mockResponse({ defaultThread: defaultThread });
                            return [4 /*yield*/, appClient.addApp(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should fetch the default thread of the space", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/space.json");
                expect(mockClient.getLogs()[0].method).toBe("get");
                expect(mockClient.getLogs()[0].params).toEqual({ id: params.space });
            });
            it("should add new app into the default thread", function () {
                expect(mockClient.getLogs()[1].path).toBe("/k/v1/preview/app.json");
                expect(mockClient.getLogs()[1].method).toBe("post");
                expect(mockClient.getLogs()[1].params).toEqual(__assign(__assign({}, params), { thread: defaultThread }));
            });
        });
    });
    describe("getProcessManagement", function () {
        var lang = "default";
        var params = { app: APP_ID, lang: lang };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getProcessManagement(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/status.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getProcessManagement(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/status.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateProcessManagement", function () {
        var params = {
            app: APP_ID,
            revision: REVISION,
            enable: true,
            states: states,
            actions: actions,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateProcessManagement(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/status.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, states, actions and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getAppSettings", function () {
        var lang = "default";
        var params = { app: APP_ID, lang: lang };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getAppSettings(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/settings.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getAppSettings(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/settings.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateAppSettings", function () {
        var params = {
            app: APP_ID,
            revision: REVISION,
            name: "test app",
            description: "<div>Description</div>",
            icon: {
                type: "FILE",
                file: {
                    fileKey: "file key",
                },
            },
            theme: "WHITE",
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateAppSettings(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/settings.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, name, description, icon, theme and revision to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getDeployStatus", function () {
        var params = {
            apps: [APP_ID],
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.getDeployStatus(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/deploy.json");
        });
        it("should send a get request", function () {
            expect(mockClient.getLogs()[0].method).toBe("get");
        });
        it("should pass apps as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("deployApp", function () {
        var params = {
            apps: [{ app: APP_ID, revision: REVISION }],
            revert: true,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.deployApp(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/deploy.json");
        });
        it("should send a post request", function () {
            expect(mockClient.getLogs()[0].method).toBe("post");
        });
        it("should pass apps and revert as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getFieldAcl", function () {
        var params = {
            app: APP_ID,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.getFieldAcl(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/field/acl.json");
        });
        it("should send a get request", function () {
            expect(mockClient.getLogs()[0].method).toBe("get");
        });
        it("should pass app as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("updateFieldAcl", function () {
        var params = {
            app: APP_ID,
            rights: [
                {
                    code: "foo",
                    entities: [
                        {
                            accessibility: "READ",
                            entity: {
                                code: "bar",
                                type: "USER",
                            },
                        },
                    ],
                },
            ],
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateFieldAcl(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/field/acl.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app and rights as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getRecordAcl", function () {
        var lang = "default";
        var params = {
            app: APP_ID,
            lang: lang,
        };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getRecordAcl(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/record/acl.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getRecordAcl(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/record/acl.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateRecordAcl", function () {
        var params = {
            app: APP_ID,
            rights: [
                {
                    filterCond: 'field = "foo"',
                    entities: [
                        {
                            entity: {
                                code: "bar",
                                type: "USER",
                            },
                            viewable: false,
                            editable: false,
                            deletable: false,
                            includeSubs: true,
                        },
                    ],
                },
            ],
            revision: REVISION,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateRecordAcl(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/record/acl.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app, right and revision as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getPerRecordNotifications", function () {
        var params = {
            app: APP_ID,
        };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getPerRecordNotifications(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/notifications/perRecord.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getPerRecordNotifications(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/notifications/perRecord.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and preview as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("getAppAcl", function () {
        var params = {
            app: APP_ID,
        };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getAppAcl(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/acl.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getAppAcl(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/acl.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and preview as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateAppAcl", function () {
        var params = {
            app: APP_ID,
            rights: [
                {
                    entity: {
                        type: "USER",
                        code: "foo",
                    },
                    appEditable: true,
                    recordViewable: true,
                    recordAddable: true,
                    recordEditable: true,
                    recordDeletable: true,
                    recordImportable: true,
                    recordExportable: true,
                },
            ],
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateAppAcl(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/acl.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app and rights as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("evaluateRecordsAcl", function () {
        var params = {
            app: APP_ID,
            ids: [RECORD_ID],
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.evaluateRecordsAcl(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/records/acl/evaluate.json");
        });
        it("should send a get request", function () {
            expect(mockClient.getLogs()[0].method).toBe("get");
        });
        it("should pass app and ids as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getAppCustomize", function () {
        var params = { app: APP_ID };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getAppCustomize(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/customize.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getAppCustomize(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/customize.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and preview as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateAppCustomize", function () {
        var resource = {
            js: [
                {
                    type: "URL",
                    url: "https://www.example.com/example-mobile.js",
                },
            ],
            css: [
                {
                    type: "FILE",
                    file: {
                        fileKey: "ddfc8e89-7aa3-4350-b9ab-3a75c9cf46b3",
                    },
                },
            ],
        };
        var params = {
            app: APP_ID,
            scope: "ALL",
            desktop: resource,
            mobile: resource,
            revision: REVISION,
        };
        describe("customize resources are specified", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.updateAppCustomize(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/customize.json");
            });
            it("should send a put request", function () {
                expect(mockClient.getLogs()[0].method).toBe("put");
            });
            it("should pass app, scope, desktop, mobile and revision as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("getGeneralNotifications", function () {
        var params = {
            app: APP_ID,
        };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getGeneralNotifications(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/notifications/general.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getGeneralNotifications(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/notifications/general.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and preview as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateReminderNotifications", function () {
        var params = {
            app: 1,
            notifications: [
                {
                    timing: {
                        code: "CREATED_TIME",
                        daysLater: "1",
                        hoursLater: "2",
                    },
                    filterCond: 'CREATED_TIME in ("user1)',
                    title: "test title1",
                    targets: [
                        {
                            entity: {
                                type: "USER",
                                code: "user1",
                            },
                            includeSubs: false,
                        },
                    ],
                },
                {
                    timing: {
                        code: "CREATED_TIME",
                        daysLater: "-3",
                        time: "08:30",
                    },
                    filterCond: 'CREATED_TIME in ("user1")',
                    title: "test title2",
                    targets: [
                        {
                            entity: {
                                type: "USER",
                                code: "user1",
                            },
                            includeSubs: false,
                        },
                    ],
                },
            ],
            timezone: "Asia/Tokyo",
            revision: "2",
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateReminderNotifications(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/notifications/reminder.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app and rights as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("updatePerRecordNotifications", function () {
        var params = {
            app: APP_ID,
            notifications: [
                {
                    filterCond: 'Customer = "foo"',
                    title: "Send a notification",
                    targets: [
                        {
                            entity: {
                                type: "USER",
                                code: "foo",
                            },
                            includeSubs: false,
                        },
                    ],
                },
            ],
            revision: 1,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updatePerRecordNotifications(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/notifications/perRecord.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app and rights as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getAppNotificationsReminder", function () {
        var lang = "default";
        var params = { app: APP_ID, lang: lang };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getReminderNotifications(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/notifications/reminder.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getReminderNotifications(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/notifications/reminder.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateAppUpdateGeneralNotifications", function () {
        var params = {
            app: APP_ID,
            notifications: [
                {
                    entity: {
                        type: "USER",
                        code: "foo",
                    },
                    includeSubs: true,
                    recordAdded: true,
                    recordEdited: true,
                    commentAdded: true,
                    statusChanged: true,
                    fileImported: true,
                },
            ],
            notifyToCommenter: true,
            revision: 1,
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateGeneralNotifications(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/notifications/general.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app and rights as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getReports", function () {
        var lang = "default";
        var params = { app: APP_ID, lang: lang };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getReports(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/reports.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getReports(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/reports.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateReports", function () {
        var params = {
            app: 1,
            reports: {
                "Graph 1": {
                    chartType: "BAR",
                    chartMode: "NORMAL",
                    name: "Graph 1",
                    index: 0,
                    groups: [
                        {
                            code: "Radio_button",
                        },
                    ],
                    aggregations: [
                        {
                            type: "COUNT",
                        },
                    ],
                    filterCond: "",
                    sorts: [
                        {
                            by: "TOTAL",
                            order: "DESC",
                        },
                    ],
                    periodicReport: {
                        active: true,
                        period: {
                            every: "QUARTER",
                            pattern: "JAN_APR_JUL_OCT",
                            dayOfMonth: "END_OF_MONTH",
                            time: "23:30",
                        },
                    },
                },
            },
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateReports(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/reports.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app and rights as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
    describe("getAppActions", function () {
        var lang = "default";
        var params = { app: APP_ID, lang: lang };
        describe("without preview", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getAppActions(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/app/actions.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
        describe("preview: true", function () {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, appClient.getAppActions(__assign(__assign({}, params), { preview: true }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should pass the path to the http client", function () {
                expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/actions.json");
            });
            it("should send a get request", function () {
                expect(mockClient.getLogs()[0].method).toBe("get");
            });
            it("should pass app and lang as a param to the http client", function () {
                expect(mockClient.getLogs()[0].params).toEqual(params);
            });
        });
    });
    describe("updateAppActions", function () {
        var params = {
            app: APP_ID,
            actions: {
                Action_A: {
                    name: "Action_A",
                    index: "0",
                    destApp: {
                        code: "INVOICE",
                    },
                    mappings: [
                        {
                            srcType: "FIELD",
                            srcField: "CompanyName",
                            destField: "CompanyName",
                        },
                        {
                            srcType: "FIELD",
                            srcField: "DivisionName",
                            destField: "DivisionName",
                        },
                        {
                            srcType: "RECORD_URL",
                            destField: "URL",
                        },
                    ],
                    entities: [
                        {
                            type: "USER",
                            code: "Administrator",
                        },
                    ],
                },
            },
        };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appClient.updateAppActions(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should pass the path to the http client", function () {
            expect(mockClient.getLogs()[0].path).toBe("/k/v1/preview/app/actions.json");
        });
        it("should send a put request", function () {
            expect(mockClient.getLogs()[0].method).toBe("put");
        });
        it("should pass app and actions as a param to the http client", function () {
            expect(mockClient.getLogs()[0].params).toEqual(params);
        });
    });
});
describe("AppClient with guestSpaceId", function () {
    it("should pass the path to the http client", function () { return __awaiter(void 0, void 0, void 0, function () {
        var GUEST_SPACE_ID, lang, params, requestConfigBuilder, mockClient, appClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    GUEST_SPACE_ID = 2;
                    lang = "default";
                    params = { app: APP_ID, lang: lang };
                    requestConfigBuilder = new KintoneRequestConfigBuilder({
                        baseUrl: "https://example.cybozu.com",
                        auth: { type: "session" },
                    });
                    mockClient = buildMockClient(requestConfigBuilder);
                    appClient = new AppClient(mockClient, GUEST_SPACE_ID);
                    return [4 /*yield*/, appClient.getFormFields(params)];
                case 1:
                    _a.sent();
                    expect(mockClient.getLogs()[0].path).toBe("/k/guest/".concat(GUEST_SPACE_ID, "/v1/app/form/fields.json"));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=AppClient.test.js.map