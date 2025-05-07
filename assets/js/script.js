'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Tab variables
const tabBtns = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Tab functionality
for (let i = 0; i < tabBtns.length; i++) {
  tabBtns[i].addEventListener("click", function () {
    // Remove active class from all tab buttons
    for (let j = 0; j < tabBtns.length; j++) {
      if (tabBtns[j].classList.contains("active")) tabBtns[j].classList.remove("active");
    }

    // Add active class to clicked button
    this.classList.add("active");

    // Get the target page from data attribute
    const target = this.getAttribute("data-nav-link");
    console.log("Clicked on tab:", target);

    // Toggle pages
    for (let k = 0; k < pages.length; k++) {
      // Hide all pages
      if (pages[k].classList.contains("active")) pages[k].classList.remove("active");
      
      // Show the target page
      if (pages[k].dataset.page === target) {
        console.log("Showing page:", target);
        pages[k].classList.add("active");
      }
    }
  });
}

// Project filtering functionality
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");

let lastClickedBtn = filterBtns[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (this.innerHTML.toLowerCase() === "all") {
      filterItems[i].classList.add("active");
    } else if (this.innerHTML.toLowerCase() === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Add click event to all filter button
for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", filter);
}

// Contact form functionality
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event listener to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Form submission (for demonstration purposes)
form.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message! This is a demo form, so no message was actually sent.");
  form.reset();
  formBtn.setAttribute("disabled", "");
});
