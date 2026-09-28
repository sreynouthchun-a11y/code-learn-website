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

// Generate certificate
const nameInput = document.getElementById('cert-name');
const generateBtn = document.getElementById('generate-cert');
const certForm = document.getElementById('cert-form');
const certificate = document.getElementById('certificate');

// Pre-fill with saved name
const savedName = localStorage.getItem('certName');
if (savedName) nameInput.value = savedName;

function showCertificate(name) {
  document.getElementById('cert-display-name').textContent = name;
  const now = new Date();
  document.getElementById('cert-date').textContent = now.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  certForm.style.display = 'none';
  certificate.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

generateBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  localStorage.setItem('certName', name);
  showCertificate(name);
});

// Allow Enter key
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') generateBtn.click();
});

// Print
 document.getElementById('print-cert').addEventListener('click', () => {
  window.print();
});

// Edit name
document.getElementById('reset-cert').addEventListener('click', () => {
  certificate.style.display = 'none';
  certForm.style.display = 'block';
});