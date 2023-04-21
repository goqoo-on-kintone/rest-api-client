import { injectPlatformDeps } from '@kintone/rest-api-client/esm/platform/'
import * as browserDeps from '@kintone/rest-api-client/esm/platform/browser'

injectPlatformDeps(browserDeps)

export { KintoneRestAPIClient } from '@kintone/rest-api-client/esm/KintoneRestAPIClient'
export * from '@kintone/rest-api-client/esm/error'
