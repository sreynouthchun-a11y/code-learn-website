# CodeLearn Website

A website for users to learn how to write code, featuring interactive lessons, quizzes, and a live code practice zone.

## Features
- 📚 **Lessons** — Detailed lesson pages for HTML, CSS, JavaScript, and Python
- ⌨️ **Practice Zone** — Live code editor with instant HTML preview
- 📝 **Quiz System** — Test your knowledge with 5 questions and instant feedback
- 📊 **Progress Tracking** — Track completed lessons with a progress bar (saved in localStorage)
- 🌙 **Dark Mode** — Toggle between light and dark themes
- 📱 **Responsive Design** — Works on mobile and desktop

## Tech
- HTML, CSS, JavaScript (no build step, no dependencies)

## Structure
```
├── index.html      # Main page (hero, lessons, practice, quiz, about)
├── lessons.html    # Lesson detail page (dynamic via ?id= parameter)
├── css/style.css   # All styles including dark mode
├── js/main.js      # Main page logic (theme, practice, quiz, progress)
└── js/lessons.js   # Lesson page logic (content, navigation, completion)
```

## Deploy
Deployed via GitHub Pages at: https://sreynouthchun-a11y.github.io/code-learn-website/