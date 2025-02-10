// Create a MutationObserver to detect changes to the DOM
const observer = new MutationObserver(function(mutationsList, observer) {
    mutationsList.forEach(function(mutation) {
        // Check if new nodes are added
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Iterate over the newly added nodes
            mutation.addedNodes.forEach(function(node) {
                // Ensure the node is an element (not text or other types)
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Render LaTeX in the newly added element
                    renderMathInElement(node, {
                        delimiters: [
                            {left: "$$", right: "$$", display: true},
                            {left: "\\[", right: "\\]", display: true},
                            {left: "$", right: "$", display: false},
                            {left: "\\(", right: "\\)", display: false}
                        ],
                        ignoredTags: ["script", "noscript", "style"]
                    });

                    // Check if the newly added node has a previous sibling
                    const previousSibling = node.previousElementSibling;
                    if (previousSibling) {
                        // Render LaTeX in the previous sibling element
                        renderMathInElement(previousSibling, {
                            delimiters: [
                                {left: "$$", right: "$$", display: true},
                                {left: "\\[", right: "\\]", display: true},
                                {left: "$", right: "$", display: false},
                                {left: "\\(", right: "\\)", display: false}
                            ],
                            ignoredTags: ["script", "noscript", "style"]
                        });
                    }
                }
            });
        }
    });
});

// Configuration of the observer
const config = { childList: true, subtree: true };

// Start observing the document body
observer.observe(document.body, config);