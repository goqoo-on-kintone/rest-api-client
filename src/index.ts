import { injectPlatformDeps } from '@kintone/rest-api-client/esm/platform/'
import * as nodeDeps from '@kintone/rest-api-client/esm/platform/node'

injectPlatformDeps(nodeDeps)

export { KintoneRestAPIClient } from '@kintone/rest-api-client/esm/KintoneRestAPIClient'
export * from '@kintone/rest-api-client/esm/error'
export * as KintoneRecordField from '@kintone/rest-api-client/esm/KintoneFields/exportTypes/field'
export * as KintoneFormLayout from '@kintone/rest-api-client/esm/KintoneFields/exportTypes/layout'
export * as KintoneFormFieldProperty from '@kintone/rest-api-client/esm/KintoneFields/exportTypes/property'
