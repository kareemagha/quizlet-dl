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

    // Save both the extension state and delay value to Chrome storage
    chrome.storage.sync.set({
        extensionState: extensionState,
        delayValue: delayValue,
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
    chrome.storage.sync.get({ extensionState: 'on', delayValue: 0 }, function (items) {
        console.log('Retrieved extension state:', items.extensionState);
        console.log('Retrieved delay value:', items.delayValue);

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