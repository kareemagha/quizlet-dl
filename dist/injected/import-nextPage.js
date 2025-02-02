(function () {

	const importPath = /*@__PURE__*/ JSON.parse('"injected/nextPage.js"');

	import(chrome.runtime.getURL(importPath));

})();
