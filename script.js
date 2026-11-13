
/* ==========================================
   SAMANTH REDDY MORAPALLY
   JUNIOR AI ENGINEER PORTFOLIO
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     1. MOBILE NAVIGATION
     ======================================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen =
        navLinks.classList.toggle("open");

      menuToggle.classList.toggle(
        "open",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );
    });

    // Close menu after selecting a link
    navLinks.querySelectorAll("a").forEach(
      link => {
        link.addEventListener(
          "click",
          closeMenu
        );
      }
    );

    // Close menu using Escape key
    document.addEventListener(
      "keydown",
      event => {
        if (event.key === "Escape") {
          closeMenu();
        }
      }
    );

    // Close menu when clicking outside
    document.addEventListener(
      "click",
      event => {
        if (
          !navLinks.contains(event.target) &&
          !menuToggle.contains(event.target)
        ) {
          closeMenu();
        }
      }
    );

    // Reset menu when switching to desktop
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 768) {
          closeMenu();
        }
      }
    );
  }


  /* ========================================
     2. PROJECT FILTERING
     ======================================== */

  const filterButtons =
    document.querySelectorAll(
      ".filter-btn"
    );

  const projectCards =
    document.querySelectorAll(
      ".project-card"
    );

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const selectedFilter =
        button.dataset.filter;

      // Update active filter button
      filterButtons.forEach(btn => {
        const isActive =
          btn === button;

        btn.classList.toggle(
          "active",
          isActive
        );

        btn.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });

      // Show matching projects
      projectCards.forEach(card => {

        const category =
          card.dataset.category;

        const shouldShow =
          selectedFilter === "all" ||
          category === selectedFilter;

        card.hidden = !shouldShow;

      });

    });

  });


  /* ========================================
     3. CONTACT FORM
     ======================================== */

  const contactForm =
    document.getElementById(
      "contactForm"
    );

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        // Validate required fields
        if (!contactForm.reportValidity()) {
          return;
        }

        const name =
          document.getElementById(
            "contactName"
          ).value.trim();

        const email =
          document.getElementById(
            "contactEmail"
          ).value.trim();

        const message =
          document.getElementById(
            "contactMessage"
          ).value.trim();

        if (!name || !email || !message) {
          return;
        }

        const recipient =
          "Morapally.9502@gmail.com";

        const subject =
          encodeURIComponent(
            `Portfolio Enquiry from ${name}`
          );

        const body =
          encodeURIComponent(
            `Hello Samanth,

My name is ${name}.

Email: ${email}

Message:
${message}

Best regards,
${name}`
          );

        const mailtoURL =
          `mailto:${recipient}` +
          `?subject=${subject}` +
          `&body=${body}`;

        // Opens visitor's email application.
        // It does not send the email automatically.
        window.location.href = mailtoURL;

      }
    );

  }


  /* ========================================
     4. AUTOMATIC COPYRIGHT YEAR
     ======================================== */

  const currentYear =
    document.getElementById(
      "currentYear"
    );

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* ========================================
     5. ACTIVE NAVIGATION ON SCROLL
     ======================================== */

  const navigationLinks =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition =
      window.scrollY + 150;

    sections.forEach(section => {

      if (
        scrollPosition >=
        section.offsetTop
      ) {
        currentSection = section.id;
      }

    });

    navigationLinks.forEach(link => {

      const target =
        link.getAttribute("href");

      const isActive =
        target === `#${currentSection}`;

      link.classList.toggle(
        "active",
        isActive
      );

      if (isActive) {
        link.setAttribute(
          "aria-current",
          "location"
        );
      } else {
        link.removeAttribute(
          "aria-current"
        );
      }

    });

  }

  let scrollScheduled = false;

  window.addEventListener(
    "scroll",
    () => {

      if (!scrollScheduled) {

        scrollScheduled = true;

        window.requestAnimationFrame(() => {
          updateActiveNavigation();
          scrollScheduled = false;
        });

      }

    },
    { passive: true }
  );

  updateActiveNavigation();


  /* ========================================
     6. KEYBOARD ACCESSIBILITY
     ======================================== */

  // Ensure project filters can be operated
  // using their native button keyboard controls.

  filterButtons.forEach(button => {

    button.setAttribute(
      "type",
      "button"
    );

  });


  /* ========================================
     7. INITIALISATION COMPLETE
     ======================================== */

  console.info(
    "Samanth Reddy Portfolio loaded."
  );

});
