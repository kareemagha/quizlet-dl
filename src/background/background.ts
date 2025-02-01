function injectScraper(tabId: number) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tabId},
            files: ['injected/answerScraper.js'],
        }
    );
}

function injectFlipper(tabId: number) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tabId},
            files: ['injected/nextPage.js'],
        }
    );
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(changeInfo.url)
    if (changeInfo.url && changeInfo.url.startsWith("https://quizlet.com/explanations/textbook-solutions/")) {
        setTimeout(() => {
            injectScraper(tabId);
        }, 100)
    }
});

// Gets HTML from content script
chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === "answers");
  let tabID: number | undefined;
  if (port.sender && port.sender.tab) {
    tabID = port.sender.tab.id;
  }
  port.onMessage.addListener(function (msg) {
    addAnswer(msg.html, msg.name);
    console.log(msg.answer);
    console.log(msg.answers);
    if (msg.answer === msg.answers - 1 && typeof tabID === "number") {
      injectFlipper(tabID);
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
