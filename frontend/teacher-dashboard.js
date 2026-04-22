const token = localStorage.getItem('schoolTeacherToken');
const teacherId = localStorage.getItem('schoolTeacherId');
const teacherInfo = document.getElementById('teacherInfo');
const logoutButton = document.getElementById('teacherLogoutButton');
const studentsList = document.getElementById('studentsList');
const attendanceForm = document.getElementById('attendanceForm');
const attendanceMessage = document.getElementById('attendanceMessage');
const examForm = document.getElementById('examForm');
const examMessage = document.getElementById('examMessage');

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

if (!token || !teacherId) {
  window.location.href = 'teacher-login.html';
}

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('schoolTeacherToken');
  localStorage.removeItem('schoolTeacherId');
  window.location.href = '/';
});

async function loadTeacher() {
  try {
    const response = await fetch('/api/auth/teacher/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const teacher = await response.json();

    if (!response.ok) {
      throw new Error(teacher.message || 'Could not load teacher.');
    }

    teacherInfo.innerHTML = `
      <div class="student-card">
        <p><strong>ID:</strong> ${teacher.id}</p>
        <p><strong>Name:</strong> ${teacher.name}</p>
        <p><strong>Email:</strong> ${teacher.email}</p>
        <p><strong>Subject:</strong> ${teacher.subject}</p>
        <p><strong>Phone:</strong> ${teacher.phone || 'Not set'}</p>
        <p><strong>Joined School:</strong> ${formatDate(teacher.joinedAt)}</p>
      </div>
    `;
  } catch (error) {
    teacherInfo.innerHTML = '<p>Could not load teacher information.</p>';
  }
}

async function loadStudents() {
  try {
    const response = await fetch('/api/teacher/students', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const students = await response.json();

    if (!response.ok) {
      throw new Error(students.message || 'Could not load students.');
    }

    studentsList.innerHTML = students.length
      ? students
          .map(
            (student) => `
              <div class="student-card">
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Email:</strong> ${student.email || 'No email saved'}</p>
                <p><strong>Date of Birth:</strong> ${formatDate(student.birthDate)}</p>
                <p><strong>Class:</strong> ${student.class}</p>
                <p><strong>Present:</strong> ${student.presentDays || 0}</p>
                <p><strong>Absent:</strong> ${student.absentDays || 0}</p>
                <p><strong>Exam Results:</strong></p>
                ${
                  student.examResults && student.examResults.length
                    ? student.examResults
                        .map((result) => `<p>${result.grade} - ${result.subject}: ${result.score}/${result.total}</p>`)
                        .join('')
                    : '<p>No exam results yet.</p>'
                }
                <div class="actions">
                  <button onclick="deleteStudent('${student._id}')">Delete</button>
                </div>
              </div>
            `
          )
          .join('')
      : '<p>No students found.</p>';
  } catch (error) {
    studentsList.innerHTML = '<p>Could not load students.</p>';
  }
}

attendanceForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const search = document.getElementById('attendanceSearch').value.trim();
  const attendance = document.getElementById('attendanceStatus').value;

  try {
    const response = await fetch(`/api/teacher/students/${encodeURIComponent(search)}/attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ attendance })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not save attendance.');
    }

    attendanceMessage.textContent = 'Attendance saved successfully.';
    attendanceForm.reset();
    loadStudents();
  } catch (error) {
    attendanceMessage.textContent = error.message;
  }
});

examForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const search = document.getElementById('examSearch').value.trim();
  const grade = document.getElementById('grade').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const score = document.getElementById('score').value;
  const total = document.getElementById('total').value;

  try {
    const response = await fetch(`/api/teacher/students/${encodeURIComponent(search)}/exam`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ grade, subject, score, total })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not save exam result.');
    }

    examMessage.textContent = 'Exam result saved successfully.';
    examForm.reset();
    loadStudents();
  } catch (error) {
    examMessage.textContent = error.message;
  }
});

async function deleteStudent(studentId) {
  const confirmDelete = confirm('Are you sure you want to delete this student?');

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`/api/teacher/students/${encodeURIComponent(studentId)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not delete student.');
    }

    loadStudents();
  } catch (error) {
    studentsList.innerHTML = `<p>${error.message}</p>`;
  }
}

loadTeacher();
loadStudents();
