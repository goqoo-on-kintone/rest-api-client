import { KintoneRestAPIError } from "../KintoneRestAPIError";
describe("KintoneRestAPIError", function () {
    describe("constructor", function () {
        it("should set properties from an error", function () {
            var errorResponse = {
                data: {
                    id: "some id",
                    code: "some code",
                    message: "some error message",
                    errors: [
                        {
                            key: {
                                messages: ["key is missing"],
                            },
                        },
                    ],
                },
                status: 500,
                statusText: "Internal Server Error",
                headers: {
                    "X-Some-Header": "error",
                },
            };
            var kintoneRestAPIError = new KintoneRestAPIError(errorResponse);
            expect(kintoneRestAPIError.name).toBe("KintoneRestAPIError");
            expect(kintoneRestAPIError.code).toBe(errorResponse.data.code);
            expect(kintoneRestAPIError.errors).toEqual(errorResponse.data.errors);
            expect(kintoneRestAPIError.status).toBe(errorResponse.status);
            expect(kintoneRestAPIError.bulkRequestIndex).toBe(undefined);
            expect(kintoneRestAPIError.headers).toEqual(errorResponse.headers);
            expect(kintoneRestAPIError.message).toBe("[".concat(errorResponse.status, "] [").concat(errorResponse.data.code, "] ").concat(errorResponse.data.message, " (").concat(errorResponse.data.id, ")"));
        });
        it("should set properties from an BulkRequest error", function () {
            var errorResponseData = {
                id: "some id",
                code: "some code",
                message: "some error message",
                errors: [
                    {
                        key: {
                            messages: ["key is missing"],
                        },
                    },
                ],
            };
            var errorResponse = {
                data: {
                    results: [{}, {}, errorResponseData, {}],
                },
                status: 500,
                statusText: "Internal Server Error",
                headers: {
                    "X-Some-Header": "error",
                },
            };
            var kintoneRestAPIError = new KintoneRestAPIError(errorResponse);
            expect(kintoneRestAPIError.name).toBe("KintoneRestAPIError");
            expect(kintoneRestAPIError.code).toBe(errorResponseData.code);
            expect(kintoneRestAPIError.errors).toEqual(errorResponseData.errors);
            expect(kintoneRestAPIError.status).toBe(errorResponse.status);
            expect(kintoneRestAPIError.headers).toEqual(errorResponse.headers);
            expect(kintoneRestAPIError.bulkRequestIndex).toEqual(2);
            expect(kintoneRestAPIError.message).toBe("[".concat(errorResponse.status, "] [").concat(errorResponseData.code, "] ").concat(errorResponseData.message, " (").concat(errorResponseData.id, ")"));
        });
        it("should throw an error if there is no error object in the results", function () {
            var errorResponse = {
                data: {
                    results: [{}, {}, {}],
                },
                status: 500,
                statusText: "Internal Server Error",
                headers: {
                    "X-Some-Header": "error",
                },
            };
            expect(function () {
                new KintoneRestAPIError(errorResponse);
            }).toThrow("Missing response data in `results`. This error is likely caused by a bug in Kintone REST API Client. Please file an issue.");
        });
    });
});
//# sourceMappingURL=KintoneRestAPIError.test.js.map