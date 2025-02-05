function injectScraper(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['injected/answerScraper.js'],
    });
}
function injectFlipper(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['injected/nextPage.js'],
    });
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.startsWith("https://quizlet.com/explanations/textbook-solutions/")) {
        setTimeout(() => {
            // empty saved answers array for new page
            savedAnswer.length === 0;
            injectScraper(tabId);
        }, 100);
    }
});
// Gets HTML from content script
chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "answers");
    let tabID;
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
const savedAnswer = [];
function addAnswer(html, styles, name, book) {
    if (typeof document !== "undefined") {
        const answers = document.getElementById("answers");
        if (answers && !savedAnswer.includes(name)) {
            // Create a temporary container to parse the HTML string
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html;
            const element = tempContainer.firstElementChild;
            // Apply the computed styles as inline styles
            if (element) {
                for (const [property, value] of Object.entries(styles)) {
                    element.style.setProperty(property, value);
                }
            }
            // Append the styled HTML to the answers container
            answers.innerHTML += `<h2>${name}</h2><br /><div class="answer">${tempContainer.innerHTML}</div><div class="pagebreak"> </div>`;
            console.log(document.title);
            document.title = book;
            savedAnswer.push(name);
        }
    }
}
