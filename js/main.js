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

// Practice zone
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
  const percent = Math.round((done / total) * 100);
  document.getElementById('progress-bar').style.width = percent + '%';
  document.getElementById('progress-text').textContent = percent + '% complete';
  document.getElementById('lessons-completed').textContent = done;
  document.getElementById('lessons-total').textContent = total;
}
updateProgress();

// Quiz logic
document.querySelectorAll('.quiz-option').forEach(btn => {
  btn.addEventListener('click', function() {
    const question = this.closest('.quiz-question');
    const feedback = question.querySelector('.quiz-feedback');
    const options = question.querySelectorAll('.quiz-option');
    options.forEach(o => o.disabled = true);
    
    if (this.dataset.correct === 'true') {
      this.classList.add('correct');
      feedback.textContent = '✅ Correct!';
      feedback.style.color = '#2ecc71';
    } else {
      this.classList.add('incorrect');
      const correct = question.querySelector('[data-correct="true"]');
      if (correct) correct.classList.add('correct');
      feedback.textContent = '❌ Incorrect';
      feedback.style.color = '#e74c3c';
    }
    
    // Update score
    const answered = document.querySelectorAll('.quiz-feedback:not(:empty)').length;
    const correctCount = document.querySelectorAll('.quiz-option.correct').length;
    document.getElementById('quiz-score').textContent = `Score: ${correctCount} / ${answered}`;
  });
});