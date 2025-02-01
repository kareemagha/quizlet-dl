function injectScript(tabId: number) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tabId},
            files: ['injected/answerScraper.js'],
        }
    );
}


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
		// console.log(msg.html)
		// console.log(msg.name)
		addAnswer(msg.html, msg.name)
		console.log(msg.answer)
		console.log(msg.answers)
		if (msg.answer === msg.answers - 1) {
			port.postMessage({instruction: true});
		} else {
			port.postMessage({instruction: false});
		}
	});
});

const savedAnswer: string[] = [];

function addAnswer(html: string, name: string) {
    const answers = document.getElementById("answers");
    if (!savedAnswer.includes(name) && answers) {
        answers.innerHTML += `<h2>${name}</h2><br /><div class="answer">${html}</div><div class="pagebreak"> </div>`;

    }
		savedAnswer.push(name)
}
