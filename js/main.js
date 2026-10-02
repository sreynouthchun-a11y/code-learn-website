// Theme Management
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
}

// Mobile Navigation
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

// Initialize CodeMirror Editors
let htmlEditor, jsEditor;

function initEditors() {
  const htmlTextArea = document.getElementById('html-input');
  const jsTextArea = document.getElementById('js-input');
  
  if (htmlTextArea) {
    htmlEditor = CodeMirror.fromTextArea(htmlTextArea, {
      mode: 'text/html',
      theme: 'dracula',
      lineNumbers: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      tabSize: 2
    });
    htmlEditor.setValue('<h1>Hello World</h1>\n<p>Start coding here!</p>\n<style>\n  h1 { color: #6366f1; }\n</style>');
  }

  if (jsTextArea) {
    jsEditor = CodeMirror.fromTextArea(jsTextArea, {
      mode: 'javascript',
      theme: 'dracula',
      lineNumbers: true,
      autoCloseBrackets: true,
      tabSize: 2
    });
    jsEditor.setValue('console.log("Hello from CodeLearn!");\nconsole.log("Try writing some JS logic here.");');
  }
}

// Handle Practice Tabs
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

// Run Execution Logic
document.getElementById('run-btn').addEventListener('click', () => {
  if (activeTab === 'html') {
    const code = htmlEditor ? htmlEditor.getValue() : document.getElementById('html-input').value;
    document.getElementById('preview').srcdoc = code;
  } else {
    runJS();
  }
});

function runJS() {
  const code = jsEditor ? jsEditor.getValue() : document.getElementById('js-input').value;
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
    output.textContent = logs.length ? logs.join('\\n') : '// No output';
  } catch (e) {
    output.textContent = '❌ Error: ' + e.message;
  }
}

// Code Snippets Implementation
const snippets = [
  { title: 'HTML: Responsive Grid', code: '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">\n  <div style="background: #eee; padding: 20px;">Item 1</div>\n  <div style="background: #eee; padding: 20px;">Item 2</div>\n</div>' },
  { title: 'CSS: Glassmorphism', code: '.glass {\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 15px;\n}' },
  { title: 'JS: Async Fetch', code: 'async function getData() {\n  const res = await fetch("https://api.example.com");\n  const data = await res.json();\n  console.log(data);\n}' },
  { title: 'Python: List Comprehension', code: 'squares = [x**2 for x in range(10) if x % 2 == 0]\nprint(squares)' }
];

const snippetsGrid = document.getElementById('snippets-grid');
if (snippetsGrid) {
  snippets.forEach(s => {
    const div = document.createElement('div');
    div.className = 'snippet';
    div.innerHTML = `
      <div class="snippet-header">
        <h4>${s.title}</h4>
        <button class="copy-btn">Copy</button>
      </div>
      <pre><code style="color: #7bed9f; background: #1e1e2e; padding: 10px; border-radius: 8px; display: block;">${s.code.replace(/</g, '&lt;')}</code></pre>
    `;
    div.querySelector('.copy-btn').addEventListener('click', (e) => {
      navigator.clipboard.writeText(s.code).then(() => {
        e.target.textContent = 'Copied!';
        e.target.classList.add('copied');
        setTimeout(() => {
          e.target.textContent = 'Copy';
          e.target.classList.remove('copied');
        }, 2000);
      });
    });
    snippetsGrid.appendChild(div);
  });
}

// Progress Tracking
const lessonsList = ['html', 'css', 'js', 'python'];
let completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');

function updateProgress() {
  const total = lessonsList.length;
  const done = completed.length;
  const pct = Math.round((done / total) * 100);
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const completedSpan = document.getElementById('lessons-completed');
  const totalSpan = document.getElementById('lessons-total');

  if (progressBar) progressBar.style.width = pct + '%';
  if (progressText) progressText.textContent = pct + '%';
  if (completedSpan) completedSpan.textContent = done;
  if (totalSpan) totalSpan.textContent = total;
  
  const certCta = document.getElementById('cert-cta');
  if (certCta) {
    certCta.style.display = (done === total) ? 'flex' : 'none';
  }
}

// Quiz System
const quizData = [
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Markup Language", "Home Tool Markup Language"], correct: 0 },
  { q: "Which CSS property is used for layout alignment?", options: ["display: flex", "position: absolute", "float: left", "align: center"], correct: 0 },
  { q: "Which JS keyword is used for block-scoped variables?", options: ["var", "let", "const", "Both let and const"], correct: 3 },
  { q: "What is the correct way to start a Python function?", options: ["function myFunc():", "def myFunc():", "void myFunc()", "func myFunc()"], correct: 1 },
  { q: "Which HTML tag is used for the largest heading?", options: ["<head>", "<h6>", "<h1>", "<header>"], correct: 2 }
];

let score = 0;
let answered = 0;

function initQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  
  container.innerHTML = '';
  quizData.forEach((item, index) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    qDiv.innerHTML = `
      <h3>Question ${index + 1}: ${item.q}</h3>
      <div class="quiz-options">
        ${item.options.map((opt, i) => `<button class="quiz-option" data-correct="${i === item.correct}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-feedback"></div>
    `;
    
    qDiv.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (qDiv.dataset.answered) return;
        qDiv.dataset.answered = 'true';
        const isCorrect = btn.dataset.correct === 'true';
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        const feedback = qDiv.querySelector('.quiz-feedback');
        feedback.textContent = isCorrect ? '✅ Correct!' : '❌ Incorrect';
        feedback.style.color = isCorrect ? '#10b981' : '#ef4444';
        
        if (isCorrect) score++;
        answered++;
        
        if (answered === quizData.length) {
          const scoreDiv = document.getElementById('quiz-score');
          if (scoreDiv) scoreDiv.textContent = `Final Score: ${score} / ${quizData.length}`;
        }
      });
    });
    container.appendChild(qDiv);
  });
}

document.getElementById('reset-quiz')?.addEventListener('click', () => {
  score = 0;
  answered = 0;
  initQuiz();
  const scoreDiv = document.getElementById('quiz-score');
  if (scoreDiv) scoreDiv.textContent = '';
});

// Back to top
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Initialization
window.addEventListener('DOMContentLoaded', () => {
  initEditors();
  initQuiz();
  updateProgress();
});
