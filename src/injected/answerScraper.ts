import MarkdownIt from 'markdown-it';
import mk from '@vscode/markdown-it-katex';

const md = new MarkdownIt();

md.use(mk);


function getAnswer() {
    const scriptElement = document.getElementById('__NEXT_DATA__');
    const jsonData = scriptElement?.textContent ? JSON.parse(scriptElement.textContent) : null;

    if (jsonData) {
        // itterates over number of solutions
        const elementCount = jsonData.props?.pageProps?.exercise?.solutions?.length
        const bookName = jsonData.props?.pageProps?.textbook?.title;
        const bookEdition = jsonData.props?.pageProps?.textbook?.edition;
        const pageURL = window.location.toString();
        for (let i = 0; i < elementCount; i++) {
            const pageTitle = formatSolutionName(pageURL, elementCount, i);
            let htmlAnswer: string = "";
            const step = jsonData.props?.pageProps?.exercise?.solutions?.[i]?.steps;
            // itterates through number of steps
            for (let j = 0; j < step?.length; j++) {
                let stepName = j + 1 == step.length ? `Result` : `Step ${j + 1}`;
                const image = step?.[j]?.columns?.[0]?.images?.additional?.regular;
                const imageSrc = image?.srcUrl == undefined ? "" : image?.srcUrl;



                const formattedHTML = md.render(step?.[j]?.columns?.[0]?.text)



                // const formattedHTML = formatText(step?.[j]?.columns?.[0]?.text)
                htmlAnswer += `
                    <div class="answerContainer">
                        <div class="stepHeader">
                            <h2 class="stepName">${stepName}</h2>
                            <h3 class="stepCounter">${j + 1} of ${step?.length}</h3>
                        </div>
                        <div class="stepContent">
                            <div class="answerElement">
                                ${formattedHTML}
                            </div>
                            <img src="${imageSrc}" width=${image?.width}>
                        </div>
                    </div>
                    <br />
                `
            }
            console.log(htmlAnswer)
            const port = chrome.runtime.connect({ name: "answers" });
            port.postMessage({
                html: htmlAnswer,
                name: pageTitle,
                answer: i,
                answers: elementCount,
                book: `${bookName} (${bookEdition})` 
            });
        }
    } else {
        console.log("no answers")
    }
}

function formatSolutionName(pageURL: string, elementLength: number, solutionNumber: number) {
    const questionNameLocation = -5;
    const textbookURLParts = 7;
    let pageTitle
     const URLparts = pageURL.split('/');
        if (URLparts.length >= textbookURLParts) {
            let pageName = URLparts[textbookURLParts - 1].split('-').slice(0, questionNameLocation)
            pageName = pageName.map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            });
            pageTitle = pageName.join(' ')
            if (elementLength > 1) {
                pageTitle = pageTitle + " " +`(${solutionNumber + 1})`
            }
        }

    return pageTitle;
}

// runs on full page load (document idle)
console.log("Script injected successfully.")
getAnswer()