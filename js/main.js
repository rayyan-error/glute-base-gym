/**
 * Glute Base Gym & Fitness Centre - Main JavaScript
 * Handles Mobile Menu, WhatsApp Form Handoff, Active Nav Highlighting
 * Constraint: Simple, zero animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightCurrentPage();
  initPassForm();
});

function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('show');
      btn.innerHTML = nav.classList.contains('show') ? '✕' : '☰';
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('show')) {
        nav.classList.remove('show');
        btn.innerHTML = '☰';
      }
    });
  }
}

function highlightCurrentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initPassForm() {
  const form = document.getElementById('free-pass-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('pass-name')?.value.trim();
    const phone = document.getElementById('pass-phone')?.value.trim();
    const plan = document.getElementById('pass-interest')?.value || 'Free 1-Day Trial Pass';
    const goal = document.getElementById('pass-goal')?.value || 'Strength & Muscle Building';

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const text = `*Inquiry: Glute Base Gym & Fitness Centre*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Interest / Plan:* ${encodeURIComponent(plan)}%0A` +
      `*Primary Fitness Goal:* ${encodeURIComponent(goal)}%0A%0A` +
      `_Sent via Glute Base Gym Website_`;

    const url = `https://wa.me/918050184577?text=${text}`;
    window.open(url, '_blank');
    form.reset();
  });
}
