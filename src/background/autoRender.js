let debounceTimeout;

const observer = new MutationObserver(function(mutationsList, observer) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        renderMathInElement(document.body, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\[", right: "\\]", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false}
            ],
            ignoredTags: ["script", "noscript", "style", "textarea", "pre"]
        });
    }, 100);
});

const config = { childList: true, subtree: true };
observer.observe(document.body, config);
