// Step 1: Simulate User Behavior
// - Add event listeners for button clicks and form submissions.
// - Use JavaScript to dynamically update the DOM based on user actions.

// Step 2: DOM Manipulation Functions
// - Implement functions to add, update, and remove DOM elements.
// - Ensure all elements are dynamically created with appropriate attributes and content.

// Step 3: Error Handling
// - Display error messages in the DOM for invalid inputs or missing elements.
// - Create reusable functions to handle common error cases.

// Step 4: Reusable Utilities
// - Create modular utility functions, such as createElement(tag, attributes).
// - Ensure all functions follow DRY principles for maintainability.


// make an element with optional attributes and text
function createElement(tag, attributes, textContent) {
    attributes = attributes || {};
    textContent = textContent || "";

    const element = document.createElement(tag);

    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    if (textContent !== "") {
        element.textContent = textContent;
    }

    return element;
}

// add content to a container if it exists
function addElementToDOM(containerId, content) {
    const container = document.getElementById(containerId);

    if (!container) {
        showError("Container with id '" + containerId + "' not found.");
        return;
    }

    const newElement = createElement("div", {}, content);
    container.appendChild(newElement);
    clearError();
}

// remove an element if it's there
function removeElementFromDOM(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
        showError("Element with id '" + elementId + "' not found.");
        return;
    }

    element.remove();
    clearError();
}

// simulate a button click by swapping content
function simulateClick(containerId, message) {
    const container = document.getElementById(containerId);

    if (!container) {
        showError("Container with id '" + containerId + "' not found.");
        return;
    }

    container.textContent = message;
    clearError();
}

// handle form add it to the DOM if it's good
function handleFormSubmit(formId, containerId) {
    const form = document.getElementById(formId);

    if (!form) {
        showError("Form with id '" + formId + "' not found.");
        return;
    }

    const input = form.querySelector("input[type='text']");

    if (!input) {
        showError("Input field not found in the form.");
        return;
    }

    const value = input.value.trim();

    if (value === "") {
        showError("Input cannot be empty");
        return;
    }

    addElementToDOM(containerId, value);
    input.value = "";
    clearError();
}

// show an error message on screen inside error-message
function showError(message) {
    const errorContainer = document.getElementById("error-message");

    if (!errorContainer) {
        return;
    }

    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
}

// clear the error message and hide the container
function clearError() {
    const errorContainer = document.getElementById("error-message");

    if (!errorContainer) {
        return;
    }

    errorContainer.textContent = "";
    errorContainer.classList.add("hidden");
}

// event listeners
document.addEventListener("DOMContentLoaded", function() {
    const simulateBtn = document.getElementById("simulate-click");

    if (simulateBtn) {
        simulateBtn.addEventListener("click", function() {
            simulateClick("dynamic-content", "Button Clicked!");
        });
    }

    const form = document.getElementById("user-form");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            handleFormSubmit("user-form", "dynamic-content");
        });
    }
});

// Export functions for testing
if (typeof module !== "undefined") {
    module.exports = {
        createElement: createElement,
        addElementToDOM: addElementToDOM,
        removeElementFromDOM: removeElementFromDOM,
        simulateClick: simulateClick,
        handleFormSubmit: handleFormSubmit,
        showError: showError,
        clearError: clearError,
    };
}
