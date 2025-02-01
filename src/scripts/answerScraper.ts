function getAnswer() {
    const element1 = document.getElementsByClassName("s1i7awl8")
    console.log(element1.length)

    for (let i = 0; i < element1.length; i++) {
        const currentElement = element1[i];
    }

    const element = document.querySelector('#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(2) > div > div.s1i7awl8');
    if (element) {
        const styles = window.getComputedStyle(element);
        let styleString = '';
        for (let i = 0; i < styles.length; i++) {
            const property = styles[i];
            styleString += `${property}: ${styles.getPropertyValue(property)}; `;
        }
        element.setAttribute('style', styleString);
        const HTMLAnswer = element.outerHTML;
        const pageURL = window.location.toString();
        console.log(HTMLAnswer);
        console.log(pageURL)

        let pageTitle

        const URLparts = pageURL.split('/');
        console.log(URLparts)
        if (URLparts.length >= 7) {
            console.log(URLparts[6])
            let pageName = URLparts[6].split('-').slice(0, -5)
            pageName = pageName.map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            });
            pageTitle = pageName.join(' ')
        }
        
        var port = chrome.runtime.connect({name: "answers"});
        port.postMessage({
            html: HTMLAnswer,
            name: pageTitle});
    } else {
        console.warn("Answer element not found")
    }
}


// runs on full page load (document idle)
console.log("Script injected successfully.")
getAnswer()