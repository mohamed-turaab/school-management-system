const studentResult = document.getElementById('studentResult');
const token = localStorage.getItem('schoolStudentToken');
const studentId = localStorage.getItem('schoolStudentId');

async function loadStudent() {
  if (!token || !studentId) {
    window.location.href = 'student-login.html';
    return;
  }

  try {
    const response = await fetch('/api/students/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const student = await response.json();

    if (!response.ok) {
      studentResult.innerHTML = '<p>Student not found.</p>';
      return;
    }

    studentResult.innerHTML = `
      <div class="student-card">
        <p><strong>ID:</strong> ${student._id}</p>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Email:</strong> ${student.email || 'No email saved'}</p>
        <p><strong>Age:</strong> ${student.age}</p>
        <p><strong>Class:</strong> ${student.class}</p>
        <p><strong>Present Days:</strong> ${student.presentDays || 0}</p>
        <p><strong>Absent Days:</strong> ${student.absentDays || 0}</p>
        <p><strong>Latest Attendance:</strong> ${student.dailyEntries && student.dailyEntries.length ? student.dailyEntries[student.dailyEntries.length - 1].attendance : 'No attendance yet'}</p>
        <p><strong>Today's Work:</strong> ${student.dailyEntries && student.dailyEntries.length ? student.dailyEntries[student.dailyEntries.length - 1].workDone || 'No work saved' : 'No work saved'}</p>
      </div>
      <div class="student-card">
        <p><strong>Exam Results</strong></p>
        ${student.examResults && student.examResults.length ? student.examResults.map((result) => `
          <p>${result.grade} - ${result.subject}: ${result.score}/${result.total}</p>
        `).join('') : '<p>No exam results yet.</p>'}
      </div>
    `;
  } catch (error) {
    studentResult.innerHTML = '<p>Could not load student information.</p>';
  }
}

loadStudent();
