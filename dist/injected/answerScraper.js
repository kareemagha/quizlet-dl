function getAnswer() {
    const element = document.querySelectorAll(".s1i7awl8");
    console.log(element.length);
    if (element) {
        for (let i = 0; i < element.length; i++) {
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
            console.log(HTMLAnswer);
            console.log(pageURL);
            let pageTitle;
            const URLparts = pageURL.split('/');
            console.log(URLparts);
            if (URLparts.length >= 7) {
                console.log(URLparts[6]);
                let pageName = URLparts[6].split('-').slice(0, -5);
                pageName = pageName.map(word => {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                });
                pageTitle = pageName.join(' ');
                if (element.length > 1) {
                    pageTitle = pageTitle + ` (${i + 1})`;
                }
            }
            var port = chrome.runtime.connect({ name: "answers" });
            port.postMessage({
                html: HTMLAnswer,
                name: pageTitle,
                answer: i,
                answers: element.length
            });
            port.onMessage.addListener(function (msg) {
                const button1 = document.querySelector('#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(3) > div > div.b1opuclq > div > div.n5cc71p > div > a');
                const button2 = document.querySelector('#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(2) > div > div.b1opuclq > div > div.n5cc71p > div > a');
                if (msg.instruction === true) {
                    if (element.length > 1 && button1) {
                        button1.click();
                    }
                    else if (button2) {
                        button2.click();
                    }
                }
            });
        }
    }
    else {
        console.warn("Answer element not found");
    }
}
// runs on full page load (document idle)
console.log("Script injected successfully.");
getAnswer();
