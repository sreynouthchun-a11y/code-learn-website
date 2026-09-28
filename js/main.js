// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
}

// Run code in practice zone
document.getElementById('run-btn').addEventListener('click', function() {
  const code = document.getElementById('html-input').value;
  const preview = document.getElementById('preview');
  preview.srcdoc = code;
});

// Progress tracking
const lessons = ['html', 'css', 'js', 'python'];
let completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');

function updateProgress() {
  const total = lessons.length;
  const done = completed.length;
  const pct = Math.round((done / total) * 100);
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-text').textContent = pct + '% complete';
  document.getElementById('lessons-completed').textContent = done;
  document.getElementById('lessons-total').textContent = total;
}
updateProgress();

// Quiz logic
let score = 0;
let answered = 0;
const totalQuestions = document.querySelectorAll('.quiz-question').length;

document.querySelectorAll('.quiz-question').forEach(q => {
  const options = q.querySelectorAll('.quiz-option');
  const feedback = q.querySelector('.quiz-feedback');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if (q.dataset.answered) return;
      q.dataset.answered = 'true';
      answered++;
      const isCorrect = opt.dataset.correct === 'true';
      if (isCorrect) {
        opt.classList.add('correct');
        feedback.textContent = '✅ Correct!';
        feedback.style.color = '#2ecc71';
        score++;
      } else {
        opt.classList.add('incorrect');
        options.forEach(o => { if (o.dataset.correct === 'true') o.classList.add('correct'); });
        feedback.textContent = '❌ Incorrect';
        feedback.style.color = '#e74c3c';
      }
      if (answered === totalQuestions) {
        document.getElementById('quiz-score').textContent = `Your score: ${score} / ${totalQuestions}`;
      }
    });
  });
});