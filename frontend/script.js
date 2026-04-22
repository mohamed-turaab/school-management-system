const API_URL = '/api/students';
const LOGIN_URL = '/api/auth/login';

const loginForm = document.getElementById('loginForm');
const studentForm = document.getElementById('studentForm');
const studentsList = document.getElementById('studentsList');
const message = document.getElementById('message');
const loginStatus = document.getElementById('loginStatus');

let loginToken = localStorage.getItem('schoolLoginToken') || '';

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${loginToken}`
  };
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

    loginToken = data.token;
    localStorage.setItem('schoolLoginToken', loginToken);
    loginStatus.textContent = 'Logged in successfully.';
    showMessage('');
    fetchStudents();
  } catch (error) {
    loginStatus.textContent = 'Login failed. Check email and password.';
  }
});

async function fetchStudents() {
  if (!loginToken) {
    studentsList.innerHTML = '<p>Please login first.</p>';
    return;
  }

  try {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders()
    });
    const students = await response.json();

    if (!response.ok) {
      throw new Error(students.message || 'Could not load students.');
    }

    studentsList.innerHTML = '';

    if (students.length === 0) {
      studentsList.innerHTML = '<p>No students found.</p>';
      return;
    }

    students.forEach((student) => {
      const card = document.createElement('div');
      card.className = 'student-card';

      card.innerHTML = `
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Age:</strong> ${student.age}</p>
        <p><strong>Class:</strong> ${student.class}</p>
        <div class="actions">
          <button onclick="editStudent('${student._id}', '${student.name}', ${student.age}, '${student.class}')">Edit</button>
          <button onclick="deleteStudent('${student._id}')">Delete</button>
        </div>
      `;

      studentsList.appendChild(card);
    });
  } catch (error) {
    showMessage('Could not load students.');
  }
}

studentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const student = {
    name: document.getElementById('name').value,
    age: Number(document.getElementById('age').value),
    class: document.getElementById('studentClass').value
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(student)
    });

    if (!response.ok) {
      throw new Error('Failed to add student.');
    }

    studentForm.reset();
    showMessage('Student added successfully.');
    fetchStudents();
  } catch (error) {
    showMessage('Could not add student.');
  }
});

async function deleteStudent(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    showMessage('Student deleted successfully.');
    fetchStudents();
  } catch (error) {
    showMessage('Could not delete student.');
  }
}

async function editStudent(id, currentName, currentAge, currentClass) {
  const name = prompt('Enter student name:', currentName);
  const age = prompt('Enter student age:', currentAge);
  const studentClass = prompt('Enter student class:', currentClass);

  if (!name || !age || !studentClass) {
    showMessage('Update cancelled.');
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name,
        age: Number(age),
        class: studentClass
      })
    });

    showMessage('Student updated successfully.');
    fetchStudents();
  } catch (error) {
    showMessage('Could not update student.');
  }
}

function showMessage(text) {
  message.textContent = text;
}

fetchStudents();
