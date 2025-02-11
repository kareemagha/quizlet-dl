import MarkdownIt from 'markdown-it';
import mk from '@vscode/markdown-it-katex';
import 'katex/contrib/mhchem';

const md = new MarkdownIt();
md.use(mk);

md.use(mk, {
  throwOnError: false,
  errorColor: '#cc0000',
});

function getMarkdownImageSrc(inputString: string) {
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
  const match = inputString.match(markdownImageRegex);
  return match ? match[1] : null;
}

function fixHtmlBeforeRendering(htmlString: string): string {
  let fixedHtml = htmlString
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');

  fixedHtml = fixedHtml.replace(/height="([^"]*)’"/g, 'height="$1"');

  return fixedHtml;
}

function getForceLatexState() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('forceKatex', (items) => {
      resolve(items.forceKatex);
    });
  });
}

async function getAnswer() {
  const scriptElement = document.getElementById('__NEXT_DATA__');
  const jsonData = scriptElement?.textContent
    ? JSON.parse(scriptElement.textContent)
    : null;

    const forceLatex = await getForceLatexState();
    console.log(forceLatex)

  if (jsonData) {
    // itterates over number of solutions
    const elementCount = jsonData.props?.pageProps?.exercise?.solutions?.length;
    const bookName = jsonData.props?.pageProps?.textbook?.title;
    const bookEdition = jsonData.props?.pageProps?.textbook?.edition;
    const pageURL = window.location.toString();
    for (let i = 0; i < elementCount; i++) {
      const pageTitle = formatSolutionName(pageURL, elementCount, i);
      let htmlAnswer = '';
      const step = jsonData.props?.pageProps?.exercise?.solutions?.[i]?.steps;
      // itterates through number of steps
      for (let j = 0; j < step?.length; j++) {
        const stepName = j + 1 == step.length ? `Result` : `Step ${j + 1}`;
        htmlAnswer += `
                        <div class="answerContainer">
                            <div class="stepHeader">
                                <h2 class="stepName">${stepName}</h2>
                                <h3 class="stepCounter">${j + 1} of ${step?.length}</h3>
                            </div>
                            <div class="stepContent">
                                <div class="answerElement">`;
        // itterate through number of columns
        for (let k = 0; k < step?.[j]?.columns?.length; k++) {
          const columns = step?.[j]?.columns[k];
          const image = columns?.images?.additional?.regular;
          const imageSrc = image?.srcUrl == undefined ? '' : image?.srcUrl;

          if (columns?.isTextOnly == true) {
            htmlAnswer += `<div class="answerColumn">
                                            ${columns?.text}
                                            <img src="${imageSrc}" width=${image?.width}>
                                        </div>`;
          } else if (
            (columns?.isTextOnly == false &&
            columns?.images?.latex?.large?.srcUrl == undefined) ||
            (forceLatex)
          ) {
            htmlAnswer += `<div class="answerColumn">
                                            ${md.render(columns?.text)}
                                            <img src="${imageSrc}" width=${image?.width}>
                                        </div>`;
          } else {
            htmlAnswer += `<div class="answerColumn">
                                            <div>
                                                <img src="${columns?.images?.latex?.large?.srcUrl}" width="${columns?.images?.latex?.regular?.width * 1.25}">
                                                <br />`;
            const markdownImage = getMarkdownImageSrc(columns?.text);
            if (markdownImage != null) {
              htmlAnswer += `<img src="${markdownImage}"><br />`;
            }

            htmlAnswer += ` <img src="${imageSrc}" width=${image?.width}>
                                            </div>
                                        </div>`;
          }
        }

        htmlAnswer += `
                                </div>
                            </div>
                        </div>
                        <br />
                `;
        htmlAnswer = fixHtmlBeforeRendering(htmlAnswer);
      }
      const port = chrome.runtime.connect({ name: 'answers' });
      port.postMessage({
        html: htmlAnswer,
        name: pageTitle,
        answer: i,
        answers: elementCount,
        book: `${bookName} (${bookEdition})`,
      });
    }
  } else {
    console.log('no answers');
  }
}

function formatSolutionName(
  pageURL: string,
  elementLength: number,
  solutionNumber: number
) {
  const questionNameLocation = -5;
  const textbookURLParts = 7;
  let pageTitle;
  const URLparts = pageURL.split('/');
  if (URLparts.length >= textbookURLParts) {
    let pageName = URLparts[textbookURLParts - 1]
      .split('-')
      .slice(0, questionNameLocation);
    pageName = pageName.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    pageTitle = pageName.join(' ');
    if (elementLength > 1) {
      pageTitle = pageTitle + ' ' + `(${solutionNumber + 1})`;
    }
  }

  return pageTitle;
}

// runs on full page load (document idle)
chrome.storage.sync.get('extensionState', (items) => {
  if (items.extensionState === 'on') {
    console.log('Script injected successfully.');
    getAnswer();
  }
});
