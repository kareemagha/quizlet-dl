<p align="center">
  <img src="docs/icon.png" alt="extension icon" width="20%">
</p>

# QUIZLET-DL
Download Quizlet textbook solutions as a PDF.

## Features
* Ability to download solutions without restrictions.
* $\LaTeX$ rendering when possible using [Katex](https://github.com/KaTeX/KaTeX).
* Markdown rendering using [markdown-it](https://github.com/waylonflinn/markdown-it-katex).
* Ability to add delays when scraping solutions (useful for slower connections).

## Demonstrations
### Scraping without restriction
https://github.com/user-attachments/assets/87adb5d4-f5a5-4518-b9f6-de1e4d0b041e

### Scraping with restrictions (it still works 😁)
https://github.com/user-attachments/assets/d1223458-7dbd-48aa-b40e-5a54ffc1803e

## Extension Workflow
<p align="center">
  <img src="docs/extension-workflow.drawio.png" alt="extension workflow" width="80%">
</p>

n.b. this extension requires you to actively have Quizlet open in a browser window, as it directly manipulates the DOM.

## Making Changes
This extension is written in typescript and is compiled to JS when run. Compilation is done by:

```bash
tsc src
```

This extension uses [roll-up](https://www.extend-chrome.dev/rollup-plugin), to allow for importing / exporting functions in the content scripts. The usable code is found in [dist](dist/), and can be compiled via:

```bash
npm run build
```
