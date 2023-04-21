/// <reference types="node" />
/// <reference types="node" />
import type { EndpointName } from '../esm-origin/client/BulkRequestClient';
import { AppClient } from '../esm-origin/client/AppClient';
import { RecordClient } from './client/RecordClient';
import { FileClient } from '../esm-origin/client/FileClient';
import type { ProxyConfig } from '../esm-origin/http/HttpClientInterface';
import type { BasicAuth, DiscriminatedAuth } from '../esm-origin/types/auth';
import type { Agent as HttpsAgent } from 'https';
type OmitTypePropertyFromUnion<T> = T extends unknown ? Omit<T, 'type'> : never;
type Auth = OmitTypePropertyFromUnion<DiscriminatedAuth>;
type Options = {
    baseUrl?: string;
    auth?: Auth;
    guestSpaceId?: number | string;
    basicAuth?: BasicAuth;
    proxy?: ProxyConfig;
    httpsAgent?: HttpsAgent;
    clientCertAuth?: {
        pfx: Buffer;
        password: string;
    } | {
        pfxFilePath: string;
        password: string;
    };
    featureFlags?: {
        enableAbortSearchError: boolean;
    };
    userAgent?: string;
};
export declare class KintoneRestAPIClient {
    record: RecordClient;
    app: AppClient;
    file: FileClient;
    private bulkRequest_;
    private baseUrl?;
    constructor(options?: Options);
    static get version(): string;
    getBaseUrl(): string | undefined;
    bulkRequest(params: {
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
}
export {};
