/// <reference types="node" />
/// <reference types="node" />
import FormData from 'form-data';
import type { RequestConfigBuilder, HttpMethod, Params, ProxyConfig } from './http/HttpClientInterface';
import type { BasicAuth, DiscriminatedAuth } from '../esm-origin/types/auth';
import type { Agent as HttpsAgent } from 'https';
type Data = Params | FormData;
export declare class KintoneRequestConfigBuilder implements RequestConfigBuilder {
    private readonly baseUrl;
    private readonly headers;
    private readonly auth;
    private readonly httpsAgent?;
    private readonly clientCertAuth?;
    private readonly proxy?;
    private requestToken;
    constructor(options: {
        baseUrl: string;
        auth: DiscriminatedAuth;
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
        userAgent?: string;
    });
    build(method: HttpMethod, path: string, params: Data, options?: {
        responseType: 'arraybuffer';
    }): Promise<{
        url: string;
        method: string;
        data: {
            url: string;
            method: "GET";
            appId: any;
            pluginId: any;
            readable: boolean;
            readableEncoding: BufferEncoding | null;
            readableEnded: boolean;
            readableFlowing: boolean | null;
            readableHighWaterMark: number;
            readableLength: number;
            readableObjectMode: boolean;
            destroyed: boolean;
            off(event: string | symbol, listener: (...args: any[]) => void): FormData;
            removeAllListeners(event?: string | symbol | undefined): FormData;
            setMaxListeners(n: number): FormData;
            getMaxListeners(): number;
            listeners(event: string | symbol): Function[];
            rawListeners(event: string | symbol): Function[];
            listenerCount(type: string | symbol): number;
            eventNames(): (string | symbol)[];
            headers: {};
            body: {};
        } | {
            url: string;
            method: "GET";
            appId: any;
            pluginId: any;
            headers: {};
            body: {};
        };
        headers: any;
        httpsAgent?: any;
        proxy?: ProxyConfig | undefined;
    } | {
        url: string;
        method: HttpMethod;
        headers: any;
        httpsAgent?: any;
        data?: any;
        proxy?: ProxyConfig | undefined;
    }>;
    private buildProxy;
    private buildRequestUrl;
    private buildData;
    private buildHeaders;
    private getRequestToken;
}
export {};
