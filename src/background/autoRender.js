// Create a MutationObserver to detect changes to the DOM
const observer = new MutationObserver(function(mutationsList, observer) {
    mutationsList.forEach(function(mutation) {
        // Check if new nodes (like LaTeX content) are added
        if (mutation.type === 'childList') {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "\\[", right: "\\]", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\(", right: "\\)", display: false}
                ],
                ignoredTags: ["script", "noscript", "style", "textarea", "pre"]
            });
        }
    });
});

// Configuration of the observer
const config = { childList: true, subtree: true };

// Start observing the document body
observer.observe(document.body, config);
