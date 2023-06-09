import { KintoneAllRecordsError } from "../KintoneAllRecordsError";
import { KintoneRestAPIError } from "../KintoneRestAPIError";
describe("KintoneAllRecordsError", function () {
    var kintoneAllRecordsError;
    var kintoneRestApiError;
    var errorResponse;
    var processedRecordsResult = { records: [{}, {}, {}, {}, {}] };
    var unprocessedRecords = [{}, {}, {}];
    var numOfAllRecords = 8;
    var numOfProcessedRecords = numOfAllRecords - unprocessedRecords.length;
    var chunkLength = 100;
    // ref. errorResponse.data.results
    var bulkRequestIndex = 2;
    var errorParseResult = 5;
    beforeEach(function () {
        var _a;
        errorResponse = {
            data: {
                results: [
                    {},
                    {},
                    {
                        id: "some id",
                        code: "some code",
                        message: "some error message",
                        errors: (_a = {},
                            _a["records[".concat(errorParseResult, "].Customer")] = {
                                messages: ["key is missing"],
                            },
                            _a),
                    },
                ],
            },
            status: 500,
            statusText: "Internal Server Error",
            headers: {
                "X-Some-Header": "error",
            },
        };
        kintoneRestApiError = new KintoneRestAPIError(errorResponse);
        kintoneAllRecordsError = new KintoneAllRecordsError(processedRecordsResult, unprocessedRecords, numOfAllRecords, kintoneRestApiError, chunkLength);
    });
    describe("constructor", function () {
        it("should set errorIndex from an error", function () {
            expect(kintoneAllRecordsError.errorIndex).toBe(numOfProcessedRecords +
                bulkRequestIndex * chunkLength +
                errorParseResult);
        });
        it("should set processedRecordsResult, unprocessedRecords, numOfAllRecords, numOfProcessedRecords, and error properties", function () {
            expect(kintoneAllRecordsError.processedRecordsResult).toStrictEqual(processedRecordsResult);
            expect(kintoneAllRecordsError.unprocessedRecords).toStrictEqual(unprocessedRecords);
            expect(kintoneAllRecordsError.numOfAllRecords).toStrictEqual(numOfAllRecords);
            expect(kintoneAllRecordsError.numOfProcessedRecords).toStrictEqual(numOfProcessedRecords);
            expect(kintoneAllRecordsError.error).toStrictEqual(kintoneRestApiError);
        });
        it("should set a message that includes an error index if error.errors exists", function () {
            expect(kintoneAllRecordsError.message).toBe("An error occurred at records[".concat(kintoneAllRecordsError.errorIndex, "]. ").concat(numOfProcessedRecords, "/").concat(numOfAllRecords, " records are processed successfully"));
        });
        it("should set a message that includes the succeeded count", function () {
            errorResponse = {
                data: {
                    results: [
                        {},
                        {},
                        {
                            id: "some id",
                            code: "some code",
                            message: "some error message",
                            errors: {
                                unexpectedKey: {
                                    messages: ["key is missing"],
                                },
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
            kintoneRestApiError = new KintoneRestAPIError(errorResponse);
            kintoneAllRecordsError = new KintoneAllRecordsError(processedRecordsResult, unprocessedRecords, numOfAllRecords, kintoneRestApiError, chunkLength);
            expect(kintoneAllRecordsError.message).toBe("".concat(numOfProcessedRecords, "/").concat(numOfAllRecords, " records are processed successfully"));
        });
        it("should set errorIndex even if bulkRequestIndex = 0", function () {
            var _a;
            errorResponse = {
                data: {
                    results: [
                        {
                            id: "some id",
                            code: "some code",
                            message: "some error message",
                            errors: (_a = {},
                                _a["records[".concat(errorParseResult, "].Customer")] = {
                                    messages: ["key is missing"],
                                },
                                _a),
                        },
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
            kintoneRestApiError = new KintoneRestAPIError(errorResponse);
            kintoneAllRecordsError = new KintoneAllRecordsError(processedRecordsResult, unprocessedRecords, numOfAllRecords, kintoneRestApiError, chunkLength);
            expect(kintoneAllRecordsError.errorIndex).toBe(numOfProcessedRecords + errorParseResult);
        });
        it("should set errorIndex as the smallest value from the response errors", function () {
            var _a;
            var largerErrorIndex = 9;
            var smallestErrorIndex = 5;
            errorResponse = {
                data: {
                    results: [
                        {
                            id: "some id",
                            code: "some code",
                            message: "some error message",
                            errors: (_a = {},
                                _a["records[".concat(largerErrorIndex, "].Customer")] = {
                                    messages: ["key is missing"],
                                },
                                _a["records[".concat(smallestErrorIndex, "].Customer")] = {
                                    messages: ["key is missing"],
                                },
                                _a),
                        },
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
            kintoneRestApiError = new KintoneRestAPIError(errorResponse);
            kintoneAllRecordsError = new KintoneAllRecordsError(processedRecordsResult, unprocessedRecords, numOfAllRecords, kintoneRestApiError, chunkLength);
            expect(kintoneAllRecordsError.errorIndex).toBe(numOfProcessedRecords + smallestErrorIndex);
        });
    });
});
//# sourceMappingURL=KintoneAllRecordsError.test.js.map