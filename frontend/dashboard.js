const STUDENT_API_URL = '/api/students';
const TEACHER_API_URL = '/api/teachers';
const loginToken = localStorage.getItem('schoolLoginToken');

const studentForm = document.getElementById('studentForm');
const teacherForm = document.getElementById('teacherForm');
const teachersList = document.getElementById('teachersList');
const message = document.getElementById('message');
const logoutButton = document.getElementById('logoutButton');

function formatDate(value) {
  if (!value) {
    return 'Not set';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Not set';
  }

  return date.toLocaleDateString('en-GB');
}

if (!loginToken) {
  window.location.href = 'admin.html';
}

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${loginToken}`
  };
}

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('schoolLoginToken');
  window.location.href = '/';
});

studentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const student = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    birthDate: document.getElementById('birthDate').value,
    age: Number(document.getElementById('age').value),
    class: document.getElementById('studentClass').value
  };

  try {
    const response = await fetch(STUDENT_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(student)
    });

    if (!response.ok) {
      throw new Error('Failed to add student.');
    }

    studentForm.reset();
    showMessage('Student added successfully.');
  } catch (error) {
    showMessage('Could not add student.');
  }
});

async function deleteStudent(id) {
  try {
    await fetch(`${STUDENT_API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    showMessage('Student deleted successfully.');
  } catch (error) {
    showMessage('Could not delete student.');
  }
}

async function fetchTeachers() {
  try {
    const response = await fetch(TEACHER_API_URL, {
      headers: getAuthHeaders()
    });
    const teachers = await response.json();

    if (!response.ok) {
      throw new Error(teachers.message || 'Could not load teachers.');
    }

    teachersList.innerHTML = '';

    if (teachers.length === 0) {
      teachersList.innerHTML = '<p>No teachers found.</p>';
      return;
    }

    teachers.forEach((teacher) => {
      const card = document.createElement('div');
      card.className = 'student-card';
      card.innerHTML = `
        <p><strong>Name:</strong> ${teacher.name}</p>
        <p><strong>Email:</strong> ${teacher.email}</p>
        <p><strong>Subject:</strong> ${teacher.subject}</p>
        <p><strong>Phone:</strong> ${teacher.phone || 'Not set'}</p>
        <div class="actions">
          <button onclick="editTeacher('${teacher._id}', '${teacher.name}', '${teacher.email}', '${teacher.subject}', '${teacher.phone || ''}')">Edit</button>
          <button onclick="deleteTeacher('${teacher._id}')">Delete</button>
        </div>
      `;
      teachersList.appendChild(card);
    });
  } catch (error) {
    showMessage('Could not load teachers. Please login again.');
  }
}

teacherForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const teacher = {
    name: document.getElementById('teacherName').value,
    email: document.getElementById('teacherEmail').value,
    password: document.getElementById('teacherPassword').value,
    subject: document.getElementById('teacherSubject').value,
    phone: document.getElementById('teacherPhone').value
  };

  try {
    const response = await fetch(TEACHER_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(teacher)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add teacher.');
    }

    teacherForm.reset();
    showMessage('Teacher added successfully.');
    fetchTeachers();
  } catch (error) {
    showMessage(error.message);
  }
});

async function deleteTeacher(id) {
  try {
    const response = await fetch(`${TEACHER_API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Could not delete teacher.');
    }

    showMessage('Teacher deleted successfully.');
    fetchTeachers();
  } catch (error) {
    showMessage(error.message);
  }
}

async function editTeacher(id, currentName, currentEmail, currentSubject, currentPhone) {
  const name = prompt('Enter teacher name:', currentName);
  const email = prompt('Enter teacher email:', currentEmail);
  const subject = prompt('Enter subject:', currentSubject);
  const phone = prompt('Enter phone:', currentPhone);

  if (!name || !email || !subject || phone === null) {
    showMessage('Update cancelled.');
    return;
  }

  try {
    const response = await fetch(`${TEACHER_API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name,
        email,
        subject,
        phone
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not update teacher.');
    }

    showMessage('Teacher updated successfully.');
    fetchTeachers();
  } catch (error) {
    showMessage(error.message);
  }
}

function showMessage(text) {
  message.textContent = text;
}

fetchTeachers();
