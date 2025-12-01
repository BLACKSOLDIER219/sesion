document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email);

  const errorSpan = document.getElementById('loginError');
  errorSpan.textContent = '';

  if (!user) {
    errorSpan.textContent = 'Usuario o contraseña incorrectos.';
    return;
  }

  if (user.blocked) {
    errorSpan.textContent = 'Cuenta bloqueada por intentos fallidos.';
    document.querySelector('a').style.display = 'block';
    return;
  }

  if (user.password !== password) {
    user.failedAttempts = (user.failedAttempts || 0) + 1;
    if (user.failedAttempts >= 3) {
      user.blocked = true;
      errorSpan.textContent = 'Cuenta bloqueada por intentos fallidos.';
    } else {
      errorSpan.textContent = 'Usuario o contraseña incorrectos.';
    }
    localStorage.setItem('users', JSON.stringify(users));
    return;
  }

  // Éxito
  document.getElementById('welcomeMessage').textContent = `Bienvenido al sistema, ${user.fullName}`;
  document.getElementById('welcomeMessage').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
});

// Mostrar/ocultar contraseña
document.getElementById('togglePassword').addEventListener('click', function() {
  const pwd = document.getElementById('password');
  pwd.type = pwd.type === 'password' ? 'text' : 'password';
  this.textContent = pwd.type === 'password' ? '👁' : '🔒';
});