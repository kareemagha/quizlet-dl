function getAnswer() {
    const element = document.getElementsByClassName("s1i7awl8")
    console.log(element.length)
    if (element) {
        for (let i = 0; i < element.length; i++) {
            const currentElement = element[i];
            const styles = window.getComputedStyle(currentElement);
            let styleString = '';
            for (let i = 0; i < styles.length; i++) {
                const property = styles[i];
                styleString += `${property}: ${styles.getPropertyValue(property)}; `;
            }
            currentElement.setAttribute('style', styleString);
            const HTMLAnswer = currentElement.outerHTML;
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
                if(element.length > 1) {
                    pageTitle = pageTitle + ` (${i + 1})`
                }
            }
            
            var port = chrome.runtime.connect({name: "answers"});
            port.postMessage({
                html: HTMLAnswer,
                name: pageTitle});
        }    
    } else {
        console.warn("Answer element not found")
    }
}


// runs on full page load (document idle)
console.log("Script injected successfully.")
getAnswer()