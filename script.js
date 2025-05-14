const inputRadios = document.querySelectorAll('.input-radio');
const inputGroups= document.querySelectorAll('.input-group');
const form = document.querySelector('.form');
const success = document.querySelector('.success-content');


function toggleRadio(event) {
    const target = event.target;
    console.log(target);
}

function displayError(input) {
    const errorMessage = input.dataset.error;
    const errorElement = document.createElement('span');
    errorElement.classList.add('form-error-message');
    errorElement.textContent = errorMessage;
    input.parentNode.appendChild(errorElement);
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
        const input = inputGroup.querySelector('.form-input');
        if (input && (input.value === '' || input.value === undefined)) {
            errorCount += displayError(input);
        }
    });

    console.log('Form submitted');
    if (errorCount > 0) {
        console.log(`Form has ${errorCount} errors`);
    } else {
        success.classList.add('active');
        setTimeout(() => {
            success.classList.remove('active');
        }, 3000);
    }
    console.log(data);
}


inputRadios.forEach(inputRadio => inputRadio.addEventListener('click', toggleRadio));
form.addEventListener('submit', submitForm);