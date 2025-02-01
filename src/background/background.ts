function injectScript(tabId: number) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tabId},
            files: ['injected/answerScraper.js'],
        }
    );
}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(changeInfo.url)
    if (changeInfo.url && changeInfo.url.startsWith("https://quizlet.com/explanations/textbook-solutions/")) {
        setTimeout(() => {
            injectScript(tabId);
        }, 100)
    }
});

// gets html from content script
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "answers");
  port.onMessage.addListener(function(msg) {
    console.log(msg.html)
		console.log(msg.name)
	});
});