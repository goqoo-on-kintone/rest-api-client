import { injectPlatformDeps } from '../esm-origin/platform/'
import * as browserDeps from '../esm-origin/platform/browser'

injectPlatformDeps(browserDeps)

export { KintoneRestAPIClient } from '../esm-origin/KintoneRestAPIClient'
export * from '../esm-origin/error'
