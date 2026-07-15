'use strict';

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
const tabBtns = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const pageNames = new Set(Array.from(pages, (page) => page.dataset.page));

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarBtn.setAttribute('aria-expanded', sidebar.classList.contains('active'));
  });
}

function showPage(target, updateHistory = true) {
  if (!pageNames.has(target)) return;

  tabBtns.forEach((button) => {
    const isActive = button.dataset.navLink === target;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  pages.forEach((page) => page.classList.toggle('active', page.dataset.page === target));

  if (updateHistory) history.replaceState(null, '', `#${target}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabBtns.forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.navLink));
});

document.querySelectorAll('[data-nav-target]').forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.navTarget));
});

const initialPage = window.location.hash.slice(1);
if (pageNames.has(initialPage)) showPage(initialPage, false);

window.addEventListener('hashchange', () => {
  const target = window.location.hash.slice(1);
  if (pageNames.has(target)) showPage(target, false);
});

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formBtn) {
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      formBtn.disabled = !form.checkValidity();
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for your message! This is a demo form, so no message was actually sent.');
    form.reset();
    formBtn.disabled = true;
  });
}
