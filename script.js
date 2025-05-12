const inputRadios = document.querySelectorAll('.input-radio');

function toggleRadio(event) {
    const target = event.target;
    console.log(target);
}

inputRadios.forEach(inputRadio => inputRadio.addEventListener('click', toggleRadio));