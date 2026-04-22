const LOGIN_URL = '/api/auth/login';
const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

if (localStorage.getItem('schoolLoginToken')) {
  window.location.href = 'dashboard.html';
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const loginData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed.');
    }

    localStorage.setItem('schoolLoginToken', data.token);
    window.location.href = 'dashboard.html';
  } catch (error) {
    loginStatus.textContent = 'Login failed. Check email and password.';
  }
});
