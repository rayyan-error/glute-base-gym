/**
 * Glute Base Gym & Fuel Base Nutrition Kitchen — Main Interactive Script
 * Handles Dual-Concept Segmented Switcher, ScrollSpy, Mobile Menu, and WhatsApp Trial / Pre-Order Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightCurrentPage();
  initDualConceptSwitcher();
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

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');
        btn.innerHTML = '☰';
      });
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

function initDualConceptSwitcher() {
  const tabs = document.querySelectorAll('.concept-tab[data-target]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetId = tab.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Update active switcher pill on scroll
  const gluteSection = document.getElementById('glute-base');
  const fuelSection = document.getElementById('fuel-base');

  if (gluteSection && fuelSection) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 240;
      const fuelTop = fuelSection.offsetTop;

      if (scrollPos >= fuelTop) {
        tabs.forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-target') === 'fuel-base');
        });
      } else {
        tabs.forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-target') === 'glute-base');
        });
      }
    }, { passive: true });
  }
}

function initPassForm() {
  const form = document.getElementById('free-pass-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('pass-name')?.value.trim();
    const phone = document.getElementById('pass-phone')?.value.trim();
    const plan = document.getElementById('pass-interest')?.value || 'Book 1-Day Trial Session';
    const goal = document.getElementById('pass-goal')?.value || 'Strength & Muscle Building';

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const text = `*Inquiry: Glute Base Gym & Fuel Base Kitchen*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Interest / Concept:* ${encodeURIComponent(plan)}%0A` +
      `*Primary Fitness Goal:* ${encodeURIComponent(goal)}%0A%0A` +
      `_Sent via Glute Base & Fuel Base Official Portal_`;

    const url = `https://wa.me/918050184577?text=${text}`;
    window.open(url, '_blank');
    form.reset();
  });
}
