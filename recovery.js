const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

document.getElementById('recoveryForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const newPassword = document.getElementById('newPassword').value;

  const errorSpan = document.getElementById('recoveryError');
  const successDiv = document.getElementById('successMessage');
  errorSpan.textContent = '';
  successDiv.style.display = 'none';

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    errorSpan.textContent = 'Correo no registrado.';
    return;
  }

  if (!passwordRegex.test(newPassword)) {
    errorSpan.textContent = 'La nueva contraseña no cumple los requisitos.';
    return;
  }

  // Actualizar contraseña y desbloquear
  users[userIndex].password = newPassword;
  users[userIndex].blocked = false;
  users[userIndex].failedAttempts = 0;

  localStorage.setItem('users', JSON.stringify(users));
  successDiv.textContent = 'Contraseña actualizada. Ahora puede iniciar sesión.';
  successDiv.style.display = 'block';
  document.getElementById('recoveryForm').reset();
});

// Mostrar/ocultar contraseña
document.getElementById('togglePassword').addEventListener('click', function() {
  const pwd = document.getElementById('newPassword');
  pwd.type = pwd.type === 'password' ? 'text' : 'password';
  this.textContent = pwd.type === 'password' ? '👁' : '🔒';
});