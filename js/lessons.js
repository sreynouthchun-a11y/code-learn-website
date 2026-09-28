// Lesson data
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
      <div class="code-block"><pre>&lt;h1&gt; to &lt;h6&gt;  - Headings
&lt;p&gt;          - Paragraphs
&lt;a&gt;          - Links
&lt;img&gt;        - Images
&lt;ul&gt;/&lt;li&gt;   - Lists
&lt;div&gt;        - Container</pre></div>
    `
  },
  css: {
    title: 'CSS Styling',
    content: `
      <h2>What is CSS?</h2>
      <p>CSS (Cascading Style Sheets) controls the visual presentation of HTML elements — colors, fonts, spacing, and layout.</p>
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
      <h2>Box Model</h2>
      <div class="code-block"><pre>.card {
  margin: 20px;      /* space outside */
  border: 1px solid #ccc;
  padding: 16px;     /* space inside */
  width: 300px;
}</pre></div>
    `
  },
  js: {
    title: 'JavaScript',
    content: `
      <h2>What is JavaScript?</h2>
      <p>JavaScript adds interactivity and dynamic behavior to web pages. It can respond to user actions, manipulate the DOM, and fetch data.</p>
      <h2>Variables</h2>
      <div class="code-block"><pre>let name = "CodeLearn";
const year = 2026;
var old = "avoid this";

console.log(name, year);</pre></div>
      <h2>Functions</h2>
      <div class="code-block"><pre>function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function
const add = (a, b) => a + b;

console.log(greet("World"));
console.log(add(2, 3));</pre></div>
      <h2>DOM Manipulation</h2>
      <div class="code-block"><pre>document.getElementById("myBtn")
  .addEventListener("click", () => {
    alert("Button clicked!");
  });</pre></div>
    `
  },
  python: {
    title: 'Python',
    content: `
      <h2>What is Python?</h2>
      <p>Python is a versatile, beginner-friendly programming language used for web development, data science, AI, and automation.</p>
      <h2>Variables & Types</h2>
      <div class="code-block"><pre>name = "CodeLearn"     # string
age = 2026             # integer
price = 9.99           # float
active = True          # boolean

print(name, age, price, active)</pre></div>
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
    print(i)  # 0, 1, 2, 3, 4

# While loop
count = 0
while count < 3:
    print(count)
    count += 1</pre></div>
      <h2>Lists & Functions</h2>
      <div class="code-block"><pre>fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

def square(n):
    return n ** 2

print(square(4))  # 16</pre></div>
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