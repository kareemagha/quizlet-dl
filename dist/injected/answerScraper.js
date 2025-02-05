function getAnswer() {
    const elements = document.querySelectorAll(".s1i7awl8");
    const elementCount = elements.length;
    if (elementCount > 0) {
        for (let i = 0; i < elementCount; i++) {
            const currentElement = elements[i];
            const computedStyles = window.getComputedStyle(currentElement);
            const styleObject = {};
            for (let j = 0; j < computedStyles.length; j++) {
                const property = computedStyles[j];
                styleObject[property] = computedStyles.getPropertyValue(property);
            }
            const htmlAnswer = currentElement.outerHTML;
            const pageURL = window.location.toString();
            const pageTitle = formatSolutionName(pageURL, elementCount, i);
            const bookNameElement = document.querySelector('.tgk5emi');
            let bookName;
            if (bookNameElement) {
                const spanElement = bookNameElement.querySelector('span');
                if (spanElement) {
                    bookName = spanElement.textContent || '';
                }
            }
            const port = chrome.runtime.connect({ name: "answers" });
            port.postMessage({
                html: htmlAnswer,
                name: pageTitle,
                answer: i,
                answers: elementCount,
                styles: styleObject,
                book: bookName
            });
        }
    }
    else {
        console.log("%cAnswer element not found.", "color: red;");
    }
}
function formatSolutionName(pageURL, elementLength, solutionNumber) {
    const questionNameLocation = -5;
    const textbookURLParts = 7;
    let pageTitle;
    const URLparts = pageURL.split('/');
    if (URLparts.length >= textbookURLParts) {
        let pageName = URLparts[textbookURLParts - 1].split('-').slice(0, questionNameLocation);
        pageName = pageName.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        pageTitle = pageName.join(' ');
        if (elementLength > 1) {
            pageTitle = pageTitle + " " + `(${solutionNumber + 1})`;
        }
    }
    return pageTitle;
}
// runs on full page load (document idle)
console.log("Script injected successfully.");
getAnswer();
