const token = localStorage.getItem('schoolStudentToken');
const studentId = localStorage.getItem('schoolStudentId');
const studentInfo = document.getElementById('studentInfo');
const logoutButton = document.getElementById('studentLogoutButton');

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

if (!token || !studentId) {
  window.location.href = 'student-login.html';
}

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('schoolStudentToken');
  localStorage.removeItem('schoolStudentId');
  window.location.href = '/';
});

async function loadStudent() {
  try {
    const response = await fetch('/api/students/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const student = await response.json();

    if (!response.ok) {
      throw new Error(student.message || 'Could not load student.');
    }

    studentInfo.innerHTML = `
      <div class="student-card">
        <p><strong>ID:</strong> ${student._id}</p>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Email:</strong> ${student.email || 'No email saved'}</p>
        <p><strong>Date of Birth:</strong> ${formatDate(student.birthDate)}</p>
        <p><strong>Joined School:</strong> ${formatDate(student.joinedAt || student.createdAt)}</p>
        <p><strong>Age:</strong> ${student.age}</p>
        <p><strong>Class:</strong> ${student.class}</p>
        <p><strong>Present Days:</strong> ${student.presentDays || 0}</p>
        <p><strong>Absent Days:</strong> ${student.absentDays || 0}</p>
    <p><strong>Latest Attendance:</strong> ${
          student.dailyEntries && student.dailyEntries.length
            ? `${student.dailyEntries[student.dailyEntries.length - 1].attendance} (${student.dailyEntries[student.dailyEntries.length - 1].date})`
            : 'No attendance yet'
        }</p>
        <p><strong>Exam Results:</strong></p>
        ${
          student.examResults && student.examResults.length
            ? student.examResults.map((result) => `<p>${result.grade} - ${result.subject}: ${result.score}/${result.total}</p>`).join('')
            : '<p>No exam results yet.</p>'
        }
      </div>
    `;
  } catch (error) {
    studentInfo.innerHTML = '<p>Could not load student information.</p>';
  }
}

loadStudent();
