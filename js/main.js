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

// Mobile menu
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});

// Practice tabs
let activeTab = 'html';
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTab = btn.dataset.tab;
    document.getElementById('editor-html').style.display = activeTab === 'html' ? 'grid' : 'none';
    document.getElementById('editor-js').style.display = activeTab === 'js' ? 'grid' : 'none';
  });
});

// Run code
document.getElementById('run-btn').addEventListener('click', function() {
  if (activeTab === 'html') {
    const code = document.getElementById('html-input').value;
    document.getElementById('preview').srcdoc = code;
  } else {
    runJS();
  }
});

function runJS() {
  const code = document.getElementById('js-input').value;
  const output = document.getElementById('js-output');
  output.textContent = '';
  const logs = [];
  const fakeConsole = {
    log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
    error: (...args) => logs.push('❌ ' + args.join(' ')),
    warn: (...args) => logs.push('⚠️ ' + args.join(' '))
  };
  try {
    const fn = new Function('console', code);
    fn(fakeConsole);
    output.textContent = logs.length ? logs.join('\n') : '// No output';
  } catch (e) {
    output.textContent = '❌ Error: ' + e.message;
  }
}

// Code snippets
const snippets = [
  { title: 'HTML: Responsive Image', code: '<img src="photo.jpg"\n     alt="A description"\n     style="max-width:100%;\n            height:auto;">' },
  { title: 'HTML: Navigation Bar', code: '<nav>\n  <a href="#home">Home</a>\n  <a href="#about">About</a>\n  <a href="#contact">Contact</a>\n</nav>' },
  { title: 'CSS: Center with Flexbox', code: '.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}' },
  { title: 'CSS: Gradient Button', code: '.btn {\n  background: linear-gradient(\n    135deg, #6c5ce7, #a29bfe);\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 30px;\n}' },
  { title: 'JS: Select & Click Element', code: 'const btn =\n  document.getElementById("myBtn");\n\nbtn.addEventListener("click", () => {\n  alert("Clicked!");\n});' },
  { title: 'JS: Fetch Data', code: 'fetch("https://api.example.com/data")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));' },
  { title: 'Python: List Comprehension', code: 'squares = [x**2 for x in range(10)]\nprint(squares)\n# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]' },
  { title: 'Python: Read a File', code: 'with open("data.txt") as f:\n    content = f.read()\n    print(content)' }
];

const snippetsGrid = document.getElementById('snippets-grid');
snippets.forEach(s => {
  const div = document.createElement('div');
  div.className = 'snippet';
  div.innerHTML = `
    <div class="snippet-header">
      <h4>${s.title}</h4>
      <button class="copy-btn">Copy</button>
    </div>
    <pre>${s.code.replace(/</g, '&lt;')}</pre>
  `;
  const copyBtn = div.querySelector('.copy-btn');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(s.code).then(() => {
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  });
  snippetsGrid.appendChild(div);
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
  if (done === total) {
    document.getElementById('cert-cta').style.display = 'block';
  }
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

// Reset quiz
const resetBtn = document.getElementById('reset-quiz');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    score = 0;
    answered = 0;
    document.querySelectorAll('.quiz-question').forEach(q => {
      delete q.dataset.answered;
      q.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.remove('correct', 'incorrect');
      });
      const fb = q.querySelector('.quiz-feedback');
      fb.textContent = '';
    });
    document.getElementById('quiz-score').textContent = '';
  });
}

// Back to top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});