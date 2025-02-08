// Save options to Chrome storage
var saveOptions = function () {
    var _a;
    console.log('Save button clicked!');
    var extensionState = (_a = document.querySelector('input[name="answer"]:checked')) === null || _a === void 0 ? void 0 : _a.id;
    console.log('Saving extension state:', extensionState);
    chrome.storage.sync.set({
        extensionState: extensionState,
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
    chrome.storage.sync.get({ extensionState: 'on' }, function (items) {
        console.log('Retrieved extension state:', items.extensionState);
        var onRadio = document.getElementById('on');
        var offRadio = document.getElementById('off');
        if (items.extensionState === 'on') {
            if (onRadio)
                onRadio.checked = true;
        }
        else {
            if (offRadio)
                offRadio.checked = true;
        }
    });
};

// // Add event listeners when the DOM is fully loaded
var initializeOptionsPage = function () {
    console.log('Initializing options page...');
    // Check if the save button exists
    var saveButton = document.getElementById('save');
    if (saveButton) {
        console.log('Save button found.');
        saveButton.addEventListener('click', saveOptions);
    }
    else {
        console.error('Save button not found!');
    }
    restoreOptions();
};

// Run the initialization function when the script loads
initializeOptionsPage();
