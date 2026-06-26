const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.';
  contactForm.reset();
});
