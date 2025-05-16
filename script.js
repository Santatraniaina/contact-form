const form = document.querySelector('.form');
const success = document.querySelector('.success-content');

function displayError(parent, input) {
    const errorElement = document.createElement('span');
    errorElement.classList.add('form-error-message');
    errorElement.textContent = input.dataset.error;
    parent.appendChild(errorElement);
    return 1;
}

function clearErrors() {
    document.querySelectorAll('.form-error-message').forEach(error => error.remove());
}

function validateInput(inputGroup) {
    const input = inputGroup.querySelector('input:not([type="radio"])');
    const textarea = inputGroup.querySelector('textarea');
    const radios = inputGroup.querySelectorAll('input[type="radio"]');

    if (
        input &&
        input.required &&
        ((input.type === 'checkbox' && !input.checked) ||!input.value.trim())
    ) {
        return displayError(inputGroup, input);
    }
    if (textarea && textarea.required && !textarea.value.trim()) {
        return displayError(inputGroup, textarea);
    }
    if (radios.length && !Array.from(radios).some(radio => radio.checked)) {
        return displayError(inputGroup, inputGroup.querySelector(".form-input-radio"));
    }
    return 0;
}

function submitForm(event) {
    event.preventDefault();
    clearErrors();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    let errorCount = 0;

    document.querySelectorAll('.input-group').forEach(inputGroup => {
        errorCount += validateInput(inputGroup);
    });

    if (errorCount) {
        console.log(`Form has ${errorCount} required fields that are empty`);
    } else {
        form.reset();
        success.classList.add('active');
        setTimeout(() => success.classList.remove('active'), 3000);
        console.log('Form submitted', data);
    }
}

form.addEventListener('submit', submitForm);