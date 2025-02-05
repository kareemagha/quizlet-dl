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
    if (changeInfo.url && changeInfo.url.startsWith("https://quizlet.com/explanations/textbook-solutions/")) {
        setTimeout(() => {
            // empty saved answers array for new page
            savedAnswer.length === 0;
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
    addAnswer(msg.html, msg.styles, msg.name, msg.book);
    checkBackgroundPageOpen().then((isBackgroundPageOpen) => {
      if (msg.answer === msg.answers - 1 && typeof tabID === "number" && isBackgroundPageOpen) {
        injectFlipper(tabID);
      }
    }).catch((error) => {
      console.error('Error checking background page status:', error);
    });
  });
});


async function checkBackgroundPageOpen() {
  const tabs = await chrome.tabs.query({});
  const backgroundPageUrl = chrome.runtime.getURL('background/document.html');
  return tabs.some(tab => tab.url === backgroundPageUrl);
}

const savedAnswer: string[] = [];


function addAnswer(html: string, styles: { [key: string]: string }, name: string, book: string) {
    if (typeof document !== "undefined") {
        const answers = document.getElementById("answers");
        if (answers && !savedAnswer.includes(name)) {
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            const element = tempContainer.firstElementChild as HTMLElement | null;

            if (element) {
                for (const [property, value] of Object.entries(styles)) {
                    element.style.setProperty(property, value);
                }
            }

            answers.innerHTML += `<h2>${name}</h2><br /><div class="answer">${tempContainer.innerHTML}</div><div class="pagebreak"> </div>`;
            console.log(document.title)
            document.title = book;
            savedAnswer.push(name);
        }
    }
}
