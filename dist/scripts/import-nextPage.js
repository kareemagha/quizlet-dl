(function () {

	const importPath = /*@__PURE__*/ JSON.parse('"scripts/nextPage.js"');

	import(chrome.runtime.getURL(importPath));

})();
