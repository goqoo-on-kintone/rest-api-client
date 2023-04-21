import type { EndpointName } from '../esm-origin/client/BulkRequestClient'
import { BulkRequestClient } from '../esm-origin/client/BulkRequestClient'
import { AppClient } from '../esm-origin/client/AppClient'
import { RecordClient } from '../esm-origin/client/RecordClient'
import { FileClient } from '../esm-origin/client/FileClient'
import { DefaultHttpClient } from '../esm-origin/http/'
import type { ProxyConfig } from '../esm-origin/http/HttpClientInterface'
import type { BasicAuth, DiscriminatedAuth } from '../esm-origin/types/auth'
import { KintoneRequestConfigBuilder } from '../esm-origin/KintoneRequestConfigBuilder'
import { KintoneResponseHandler } from '../esm-origin/KintoneResponseHandler'
import { platformDeps } from '../esm-origin/platform'
import { UnsupportedPlatformError } from '../esm-origin/platform/UnsupportedPlatformError'
import type { Agent as HttpsAgent } from 'https'
import { URL } from 'url'

type OmitTypePropertyFromUnion<T> = T extends unknown ? Omit<T, 'type'> : never
type Auth = OmitTypePropertyFromUnion<DiscriminatedAuth>

type Options = {
  baseUrl?: string
  auth?: Auth
  guestSpaceId?: number | string
  basicAuth?: BasicAuth
  proxy?: ProxyConfig
  httpsAgent?: HttpsAgent
  clientCertAuth?:
    | {
        pfx: Buffer
        password: string
      }
    | {
        pfxFilePath: string
        password: string
      }
  featureFlags?: {
    enableAbortSearchError: boolean
  }
  userAgent?: string
}

const buildDiscriminatedAuth = (auth: Auth): DiscriminatedAuth => {
  if ('username' in auth) {
    return { type: 'password', ...auth }
  }
  if ('apiToken' in auth) {
    return { type: 'apiToken', ...auth }
  }
  if ('oAuthToken' in auth) {
    return { type: 'oAuthToken', ...auth }
  }
  try {
    return platformDeps.getDefaultAuth()
  } catch (e) {
    if (e instanceof UnsupportedPlatformError) {
      throw new Error(`session authentication is not supported in ${e.platform} environment.`)
    }
    throw e
  }
}

export class KintoneRestAPIClient {
  record: RecordClient
  app: AppClient
  file: FileClient
  private bulkRequest_: BulkRequestClient
  private baseUrl?: string

  constructor(options: Options = {}) {
    validateOptions(options)

    this.baseUrl = platformDeps.buildBaseUrl(options.baseUrl).replace(/\/+$/, '') // Remove trailing slash

    const auth = buildDiscriminatedAuth(options.auth ?? {})
    const requestConfigBuilder = new KintoneRequestConfigBuilder({
      ...options,
      baseUrl: this.baseUrl,
      auth,
    })
    const responseHandler = new KintoneResponseHandler({
      enableAbortSearchError: options.featureFlags?.enableAbortSearchError ?? false,
    })
    const httpClient = new DefaultHttpClient({
      responseHandler,
      requestConfigBuilder,
    })
    const { guestSpaceId } = options

    this.bulkRequest_ = new BulkRequestClient(httpClient, guestSpaceId)
    this.record = new RecordClient(httpClient, this.bulkRequest_, guestSpaceId)
    this.app = new AppClient(httpClient, guestSpaceId)
    this.file = new FileClient(httpClient, guestSpaceId)
  }

  public static get version() {
    return platformDeps.getVersion()
  }

  public getBaseUrl() {
    return this.baseUrl
  }

  public bulkRequest(params: {
    requests: Array<
      | {
          method: string
          api: string
          payload: object
        }
      | {
          method: string
          endpointName: EndpointName
          payload: object
        }
    >
  }): Promise<{ results: Array<{ [K: string]: any }> }> {
    return this.bulkRequest_.send(params)
  }
}

const validateOptions = (options: Options) => {
  validateBaseUrl(options.baseUrl)
  validateGuestSpaceId(options.guestSpaceId)
}

const validateBaseUrl = (baseUrl: Options['baseUrl']) => {
  if (baseUrl === undefined) {
    return
  }

  const url = new URL(baseUrl)
  if (url.hostname !== 'localhost' && url.protocol !== 'https:') {
    throw new Error('The protocol of baseUrl must be "https".')
  }
}

const validateGuestSpaceId = (guestSpaceId: Options['guestSpaceId']) => {
  if (guestSpaceId === '' || guestSpaceId === null) {
    throw new Error(`invalid guestSpaceId: got [${guestSpaceId}]`)
  }
}
