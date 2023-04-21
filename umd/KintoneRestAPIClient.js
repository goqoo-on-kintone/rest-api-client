/**
 * MIT License
 *
 * Copyright (c) 2023 Goqoo on kintone
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * This bundle includes the following third-party libraries:
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@kintone/rest-api-client/esm/platform/'), require('@kintone/rest-api-client/esm/platform/browser'), require('@kintone/rest-api-client/esm/KintoneRestAPIClient'), require('@kintone/rest-api-client/esm/error')) :
	typeof define === 'function' && define.amd ? define(['exports', '@kintone/rest-api-client/esm/platform/', '@kintone/rest-api-client/esm/platform/browser', '@kintone/rest-api-client/esm/KintoneRestAPIClient', '@kintone/rest-api-client/esm/error'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.window = global.window || {}, global._, global.browserDeps, global.KintoneRestAPIClient, global.error));
})(this, (function (exports, _, browserDeps, KintoneRestAPIClient, error) { 'use strict';

	function _interopNamespaceDefault(e) {
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n.default = e;
		return Object.freeze(n);
	}

	var browserDeps__namespace = /*#__PURE__*/_interopNamespaceDefault(browserDeps);

	_.injectPlatformDeps(browserDeps__namespace);

	Object.defineProperty(exports, 'KintoneRestAPIClient', {
		enumerable: true,
		get: function () { return KintoneRestAPIClient.KintoneRestAPIClient; }
	});
	Object.keys(error).forEach(function (k) {
		if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () { return error[k]; }
		});
	});

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2ludG9uZVJlc3RBUElDbGllbnQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5icm93c2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdFBsYXRmb3JtRGVwcyB9IGZyb20gJ0BraW50b25lL3Jlc3QtYXBpLWNsaWVudC9lc20vcGxhdGZvcm0vJ1xuaW1wb3J0ICogYXMgYnJvd3NlckRlcHMgZnJvbSAnQGtpbnRvbmUvcmVzdC1hcGktY2xpZW50L2VzbS9wbGF0Zm9ybS9icm93c2VyJ1xuXG5pbmplY3RQbGF0Zm9ybURlcHMoYnJvd3NlckRlcHMpXG5cbmV4cG9ydCB7IEtpbnRvbmVSZXN0QVBJQ2xpZW50IH0gZnJvbSAnQGtpbnRvbmUvcmVzdC1hcGktY2xpZW50L2VzbS9LaW50b25lUmVzdEFQSUNsaWVudCdcbmV4cG9ydCAqIGZyb20gJ0BraW50b25lL3Jlc3QtYXBpLWNsaWVudC9lc20vZXJyb3InXG4iXSwibmFtZXMiOlsiaW5qZWN0UGxhdGZvcm1EZXBzIiwiYnJvd3NlckRlcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQUEsQ0FBa0IsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUNDLHNCQUFXLENBQUMsQ0FBQTs7Ozs7Ozs7Ozs7OzsifQ==
