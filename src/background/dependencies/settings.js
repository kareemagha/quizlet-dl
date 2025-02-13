var saveOptions = function () {
    var _a;
    console.log('Save button clicked!');

    // Get the extension state
    var extensionState = (_a = document.querySelector('input[name="answer"]:checked')) === null || _a === void 0 ? void 0 : _a.id;
    console.log('Saving extension state:', extensionState);

    // Get the delay value from the input box
    var delayInput = document.querySelector('input[type="number"]');
    var delayValue = delayInput ? delayInput.value : null;
    console.log('Saving delay value:', delayValue);

    // Get the state of the "Force LaTeX rendering" checkbox
    var forceKatexCheckbox = document.getElementById('force-katex');
    var forceKatexState = forceKatexCheckbox ? forceKatexCheckbox.checked : false;
    console.log('Saving Force LaTeX rendering state:', forceKatexState);

    // Save the extension state, delay value, and checkbox state to Chrome storage
    chrome.storage.sync.set({
        extensionState: extensionState,
        delayValue: delayValue,
        forceKatex: forceKatexState,
    }, function () {
        var status = document.getElementById('status');
        if (status) {
            status.textContent = 'Options saved.';
            setTimeout(function () {
                status.textContent = '';
            }, 750);
        }
    });
};

// Restore options from Chrome storage
var restoreOptions = function () {
    console.log('Restoring options...');
    chrome.storage.sync.get({ extensionState: 'on', delayValue: 0, forceKatex: false }, function (items) {
        console.log('Retrieved extension state:', items.extensionState);
        console.log('Retrieved delay value:', items.delayValue);
        console.log('Retrieved Force LaTeX rendering state:', items.forceKatex);

        // Restore the extension state
        var onRadio = document.getElementById('on');
        var offRadio = document.getElementById('off');
        if (items.extensionState === 'on') {
            if (onRadio) onRadio.checked = true;
        } else {
            if (offRadio) offRadio.checked = true;
        }

        // Restore the delay value
        var delayInput = document.querySelector('input[type="number"]');
        if (delayInput) {
            delayInput.value = items.delayValue;
        }

        // Restore the "Force LaTeX rendering" checkbox state
        var forceKatexCheckbox = document.getElementById('force-katex');
        if (forceKatexCheckbox) {
            forceKatexCheckbox.checked = items.forceKatex;
        }
    });
};

// Add event listeners when the DOM is fully loaded
var initializeOptionsPage = function () {
    console.log('Initializing options page...');

    // Check if the save button exists
    var saveButton = document.getElementById('save');
    if (saveButton) {
        console.log('Save button found.');
        saveButton.addEventListener('click', saveOptions);
    } else {
        console.error('Save button not found!');
    }

    // Restore saved options
    restoreOptions();
};

// Initialize the options page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeOptionsPage);



document.addEventListener('click', function(event) {
    // Check if the clicked element is a toggle button
    if (event.target.classList.contains('toggleButton')) {
        const button = event.target;

        // Find the parent container of the button
        const parentContainer = button.closest('.answerContainer');

        // Find the latexAnswer and imageAnswer sections within the parent container
        const latexAnswer = parentContainer.querySelector('.latexAnswer');
        const imageAnswer = parentContainer.querySelector('.imageAnswer');

        // Toggle visibility
        if (latexAnswer.style.display === 'none') {
            latexAnswer.style.display = 'block';
            imageAnswer.style.display = 'none';
            button.textContent = 'Show Image Answer'; // Update button text
        } else {
            latexAnswer.style.display = 'none';
            imageAnswer.style.display = 'block';
            button.textContent = 'Show Latex Answer'; // Update button text
        }
    }
});