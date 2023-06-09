import type { HttpClient } from "../http";
export type EndpointName = "record" | "records" | "record/status" | "records/status" | "record/assignees";
export declare class BulkRequestClient {
    private client;
    private guestSpaceId?;
    readonly REQUESTS_LENGTH_LIMIT: number;
    constructor(client: HttpClient, guestSpaceId?: number | string);
    send(params: {
        requests: Array<{
            method: string;
            api: string;
            payload: object;
        } | {
            method: string;
            endpointName: EndpointName;
            payload: object;
        }>;
    }): Promise<{
        results: Array<{
            [K: string]: any;
        }>;
    }>;
    private buildPathWithGuestSpaceId;
}
