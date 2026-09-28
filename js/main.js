document.getElementById('run-btn').addEventListener('click', function() {
  const code = document.getElementById('html-input').value;
  const preview = document.getElementById('preview');
  preview.srcdoc = code;
});