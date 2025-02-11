const observer = new MutationObserver(function(mutationsList, observer) {
    mutationsList.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    renderMathInElement(node, {
                        delimiters: [
                            {left: "$$", right: "$$", display: true},
                            {left: "\\[", right: "\\]", display: true},
                            {left: "$", right: "$", display: false},
                            {left: "\\(", right: "\\)", display: false}
                        ],
                        ignoredTags: ["script", "noscript", "style"]
                    });

                    const previousSibling = node.previousElementSibling;
                    if (previousSibling) {
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

const config = { childList: true, subtree: true };

observer.observe(document.body, config);