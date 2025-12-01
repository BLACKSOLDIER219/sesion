// Validaciones con expresiones regulares
const nameRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
const phoneRegex = /^[0-9]{7,12}$/;

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let valid = true;
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;

  // Limpiar errores previos
  ['nameError', 'emailError', 'phoneError', 'passwordError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });

  // Validar nombre
  if (!nameRegex.test(fullName)) {
    document.getElementById('nameError').textContent = 'Nombre inválido';
    valid = false;
  }

  // Validar email
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Correo inválido';
    valid = false;
  }

  // Validar teléfono
  if (!phoneRegex.test(phone)) {
    document.getElementById('phoneError').textContent = 'Teléfono debe tener 7-12 dígitos';
    valid = false;
  }

  // Validar contraseña
  if (!passwordRegex.test(password)) {
    document.getElementById('passwordError').textContent = 'Contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial';
    valid = false;
  }

  if (valid) {
    // Simular almacenamiento en localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.some(u => u.email === email);
    if (exists) {
      alert('El correo ya está registrado.');
      return;
    }

    users.push({
      fullName,
      email,
      phone,
      password,
      blocked: false,
      failedAttempts: 0
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
  }
});

// Mostrar/ocultar contraseña
document.getElementById('togglePassword').addEventListener('click', function() {
  const pwd = document.getElementById('password');
  pwd.type = pwd.type === 'password' ? 'text' : 'password';
  this.textContent = pwd.type === 'password' ? '👁' : '🔒';
});