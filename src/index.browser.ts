import { injectPlatformDeps } from '../node_modules/@kintone/rest-api-client/esm/platform/'
import * as browserDeps from '../node_modules/@kintone/rest-api-client/esm/platform/browser'

injectPlatformDeps(browserDeps)

export { KintoneRestAPIClient } from '../node_modules/@kintone/rest-api-client/esm/KintoneRestAPIClient'
export * from '../node_modules/@kintone/rest-api-client/esm/error'
