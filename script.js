const inputRadios = document.querySelectorAll('.input-radio');
const inputGroups= document.querySelectorAll('.input-group');
const form = document.querySelector('.form');
const success = document.querySelector('.success-content');


function toggleRadio(event) {
    const target = event.target;
    console.log(target);
}

function displayError(parent, input) {
    const errorMessage = input.dataset.error;
    const errorElement = document.createElement('span');
    errorElement.classList.add('form-error-message');
    errorElement.textContent = errorMessage;
    parent.appendChild(errorElement);
    return 1;
}

function clearError() {
    inputGroups.forEach(inputGroup => {
        const errorElement = inputGroup.querySelector('.form-error-message');
        if (errorElement) {
            errorElement.remove();
        }
    })
}

function submitForm(event) {
    event.preventDefault();
    clearError();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    let errorCount = 0;

    inputGroups.forEach(inputGroup => {
        const input = inputGroup.querySelector('input:not([type="radio"])');
        const textarea = inputGroup.querySelector('textarea');
        const radios = inputGroup.querySelectorAll('input[type="radio"]');

        // Input validation
        if (input && input.required && (input.value === '' || input.value === undefined || (input.type === "checkbox" && !input.checked))) {
            errorCount += displayError(inputGroup, input);
        }
        // Textarea validation
        if (textarea && textarea.required && (textarea.value === '' || textarea.value === undefined)) {
            errorCount += displayError(inputGroup, textarea);
        }
        // Radio validation
        if (radios.length > 0) {
            const checkedRadio = Array.from(radios).some(radio => radio.checked);
            if (!checkedRadio) {
                errorCount += displayError(inputGroup, inputGroup.querySelector(".form-input-radio"));
            }
        }
    });

    if (errorCount > 0) {
        console.log(`Form has ${errorCount} errors`);
    } else {
        success.classList.add('active');
        setTimeout(() => {
            success.classList.remove('active');
        }, 3000);
        console.log('Form submitted');
    }

    console.log(data);
}


inputRadios.forEach(inputRadio => inputRadio.addEventListener('click', toggleRadio));
form.addEventListener('submit', submitForm);