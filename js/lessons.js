// Lesson content
const lessonData = {
  html: {
    title: 'HTML Basics',
    content: `
      <h2>What is HTML?</h2>
      <p>HTML (HyperText Markup Language) is the standard language for creating web pages. It describes the structure of a page using elements represented by tags.</p>
      <h2>Basic Structure</h2>
      <div class="code-block"><pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;p&gt;This is my first page.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre></div>
      <h2>Common Tags</h2>
      <p><strong>&lt;h1&gt; to &lt;h6&gt;</strong> — Headings<br>
         <strong>&lt;p&gt;</strong> — Paragraphs<br>
         <strong>&lt;a&gt;</strong> — Links<br>
         <strong>&lt;img&gt;</strong> — Images<br>
         <strong>&lt;ul&gt; / &lt;ol&gt;</strong> — Lists</p>
    `
  },
  css: {
    title: 'CSS Styling',
    content: `
      <h2>What is CSS?</h2>
      <p>CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and responsive design.</p>
      <h2>Basic Syntax</h2>
      <div class="code-block"><pre>selector {
  property: value;
}

/* Example */
body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #6c5ce7;
  text-align: center;
}</pre></div>
      <h2>Key Properties</h2>
      <p><strong>color</strong> — text color<br>
         <strong>background-color</strong> — background<br>
         <strong>font-size</strong> — text size<br>
         <strong>margin / padding</strong> — spacing<br>
         <strong>display</strong> — layout mode</p>
    `
  },
  js: {
    title: 'JavaScript',
    content: `
      <h2>What is JavaScript?</h2>
      <p>JavaScript is a programming language that adds interactivity to web pages. It can respond to user actions, manipulate the DOM, and make network requests.</p>
      <h2>Variables</h2>
      <div class="code-block"><pre>let name = "World";
const age = 25;
var old = "deprecated";

console.log("Hello, " + name);</pre></div>
      <h2>Functions</h2>
      <div class="code-block"><pre>function greet(name) {
  return "Hello, " + name + "!";
}

greet("CodeLearn");</pre></div>
      <h2>DOM Manipulation</h2>
      <div class="code-block"><pre>document.getElementById("myBtn").addEventListener("click", () => {
  alert("Button clicked!");
});</pre></div>
    `
  },
  python: {
    title: 'Python',
    content: `
      <h2>What is Python?</h2>
      <p>Python is a popular, beginner-friendly programming language used for web development, data science, AI, and automation.</p>
      <h2>Basic Syntax</h2>
      <div class="code-block"><pre>print("Hello, World!")

name = "CodeLearn"
age = 2026

print(f"Welcome to {name}")</pre></div>
      <h2>Control Flow</h2>
      <div class="code-block"><pre>score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("Keep trying!")</pre></div>
      <h2>Loops</h2>
      <div class="code-block"><pre>for i in range(5):
    print(i)  # 0, 1, 2, 3, 4</pre></div>
    `
  }
};

// Get lesson ID from URL
const params = new URLSearchParams(window.location.search);
const lessonId = params.get('id') || 'html';

// Render lesson
const lesson = lessonData[lessonId];
if (lesson) {
  document.getElementById('lesson-content').innerHTML = lesson.content;
  document.title = lesson.title + ' - CodeLearn';
}

// Mark as complete
const lessons = ['html', 'css', 'js', 'python'];
let completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');

document.getElementById('mark-complete').addEventListener('click', () => {
  if (!completed.includes(lessonId)) {
    completed.push(lessonId);
    localStorage.setItem('completedLessons', JSON.stringify(completed));
    alert('Lesson marked as complete! 🎉');
  }
});

// Navigation
const currentIndex = lessons.indexOf(lessonId);
document.getElementById('prev-lesson').addEventListener('click', () => {
  const prev = lessons[(currentIndex - 1 + lessons.length) % lessons.length];
  window.location.href = 'lessons.html?id=' + prev;
});
document.getElementById('next-lesson').addEventListener('click', () => {
  const next = lessons[(currentIndex + 1) % lessons.length];
  window.location.href = 'lessons.html?id=' + next;
});

// Theme toggle on lesson page
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