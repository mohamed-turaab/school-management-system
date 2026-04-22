const form = document.getElementById('teacherLoginForm');
const status = document.getElementById('teacherLoginStatus');

if (localStorage.getItem('schoolTeacherToken')) {
  window.location.href = 'teacher-dashboard.html';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    email: document.getElementById('teacherEmail').value,
    password: document.getElementById('teacherPassword').value
  };

  try {
    const response = await fetch('/api/auth/teacher-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed.');
    }

    localStorage.setItem('schoolTeacherToken', data.token);
    localStorage.setItem('schoolTeacherId', data.teacher.id);
    window.location.href = 'teacher-dashboard.html';
  } catch (error) {
    status.textContent = 'Login failed. Check email and password.';
  }
});
