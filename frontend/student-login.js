const form = document.getElementById('studentLoginForm');
const status = document.getElementById('studentLoginStatus');

if (localStorage.getItem('schoolStudentToken')) {
  window.location.href = 'student-dashboard.html';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    email: document.getElementById('studentEmail').value,
    password: document.getElementById('studentPassword').value
  };

  try {
    const response = await fetch('/api/auth/student-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed.');
    }

    localStorage.setItem('schoolStudentToken', data.token);
    localStorage.setItem('schoolStudentId', data.student.id);
    window.location.href = 'student-dashboard.html';
  } catch (error) {
    status.textContent = 'Login failed. Check email and password.';
  }
});
