import type { HttpClient } from "../http";
export declare class FileClient {
    private client;
    private guestSpaceId?;
    constructor(client: HttpClient, guestSpaceId?: number | string);
    uploadFile(params: {
        file: {
            name: string;
            data: unknown;
        } | {
            path: string;
        };
    }): Promise<{
        fileKey: string;
    }>;
    downloadFile(params: {
        fileKey: string;
    }): Promise<ArrayBuffer>;
    private buildPathWithGuestSpaceId;
}
