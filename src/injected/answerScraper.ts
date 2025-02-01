import { textbookURLParts, questionNameLocation } from "../utils/constants";

function getAnswer() {
    const element = document.querySelectorAll(".s1i7awl8")
    const elementLength = element.length;
    if (element) {
        for (let i = 0; i < elementLength; i++) {
            const currentElement = element[i];
            const styles = window.getComputedStyle(currentElement);
            let styleString = '';
            for (let j = 0; j < styles.length; j++) {
                const property = styles[j];
                styleString += `${property}: ${styles.getPropertyValue(property)}; `;
            }
            currentElement.setAttribute('style', styleString);
            const HTMLAnswer = currentElement.outerHTML;
            const pageURL = window.location.toString();
            const pageTitle = formatSolutionName(pageURL, elementLength, i)

 
            var port = chrome.runtime.connect({name: "answers"});
            port.postMessage({
                html: HTMLAnswer,
                name: pageTitle,
                answer: i,
                answers: elementLength});
                port.onMessage.addListener(function(msg) {
                    const button1 = document.querySelector('#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(3) > div > div.b1opuclq > div > div.n5cc71p > div > a') as HTMLElement | null;
                    const button2 = document.querySelector('#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(2) > div > div.b1opuclq > div > div.n5cc71p > div > a') as HTMLElement | null;
                    if (msg.instruction === true) {
                        if (elementLength > 1 && button1) {
                            button1.click();
                        } else if (button2) {
                            button2.click();
                        }
                    }
                });
        }    
    } else {
        console.log("%cAnswer element not found", "color: red;");
    }
}

function formatSolutionName(pageURL: string, elementLength: number, solutionNumber: number) {
    let pageTitle
     const URLparts = pageURL.split('/');
        if (URLparts.length >= textbookURLParts) {
            let pageName = URLparts[textbookURLParts - 1].split('-').slice(0, questionNameLocation)
            pageName = pageName.map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            });
            pageTitle = pageName.join(' ')
            if (elementLength > 1) {
                pageTitle = pageTitle + `(${solutionNumber + 1})`
            }
        }

    return pageTitle;
}

// runs on full page load (document idle)
console.log("Script injected successfully.")
getAnswer()