const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');

// Objeto para rastrear el estado de validez de cada campo
const formState = {
    nombre: false,
    email: false,
    password: false,
    confirmPassword: false,
    edad: false
};

// Expresiones Regulares
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

// Función para actualizar la interfaz (bordes y mensajes)
const updateUI = (input, isValid, message) => {
    const errorSpan = document.getElementById(`error-${input.id}`);
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorSpan.textContent = '';
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorSpan.textContent = message;
    }
    checkFormValidity();
};

// Validar que TODO el formulario esté correcto
const checkFormValidity = () => {
    const isAllValid = Object.values(formState).every(val => val === true);
    submitBtn.disabled = !isAllValid;
};

// Listeners de validación dinámica
document.getElementById('nombre').addEventListener('input', (e) => {
    formState.nombre = e.target.value.trim().length >= 3;
    updateUI(e.target, formState.nombre, "Mínimo 3 caracteres.");
});

document.getElementById('email').addEventListener('input', (e) => {
    formState.email = regexEmail.test(e.target.value);
    updateUI(e.target, formState.email, "Email inválido.");
});

document.getElementById('password').addEventListener('input', (e) => {
    formState.password = regexPassword.test(e.target.value);
    updateUI(e.target, formState.password, "Mín. 8 caracteres, 1 número y 1 símbolo.");
    
    // Revalidar confirmación si cambia el password
    const confirmInput = document.getElementById('confirmPassword');
    if (confirmInput.value) {
        formState.confirmPassword = confirmInput.value === e.target.value;
        updateUI(confirmInput, formState.confirmPassword, "Las contraseñas no coinciden.");
    }
});

document.getElementById('confirmPassword').addEventListener('input', (e) => {
    const passValue = document.getElementById('password').value;
    formState.confirmPassword = e.target.value === passValue;
    updateUI(e.target, formState.confirmPassword, "Las contraseñas no coinciden.");
});

document.getElementById('edad').addEventListener('input', (e) => {
    const edad = parseInt(e.target.value);
    formState.edad = edad >= 18;
    updateUI(e.target, formState.edad, "Debes ser mayor de 18 años.");
});

// Evento de Envío
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Formulario enviado con éxito! 🎉');
    form.reset();
    // Resetear el estado visual después de limpiar
    document.querySelectorAll('input').forEach(input => input.classList.remove('valid', 'invalid'));
    submitBtn.disabled = true;
});
