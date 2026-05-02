// CONTACT - OPEN EMAIL CLIENT
const openMailBtn = document.getElementById("openMailBtn");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactMessage = document.getElementById("contactMessage");
const mailFeedback = document.getElementById("mailFeedback");

if (openMailBtn) {
  openMailBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const nameVal = contactName.value.trim();
    const emailVal = contactEmail.value.trim();
    const msgVal = contactMessage.value.trim();

    // Validate
    if (!nameVal || !emailVal || !msgVal) {
      mailFeedback.innerHTML = "Please fill in all fields";
      mailFeedback.style.color = "#ffb284";
      setTimeout(() => (mailFeedback.innerHTML = ""), 2500);
      return;
    }

    if (!emailVal.includes("@") || !emailVal.includes(".")) {
      mailFeedback.innerHTML = "Please enter a valid email address";
      mailFeedback.style.color = "#ffb284";
      setTimeout(() => (mailFeedback.innerHTML = ""), 2500);
      return;
    }

    // Create email content
    const subject = `Portfolio Contact from ${nameVal}`;

    const body = `
Name: ${nameVal}

Email: ${emailVal}

Message:
${msgVal}

---
Sent from your portfolio website
`;

    const yourEmail = "cuong.nguyenhuuthien@gmail.com";

    const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    // Show success message
    mailFeedback.innerHTML = `Opening your email client, ${nameVal}! Just click send once it opens`;
    mailFeedback.style.color = "#6ee7b7";

    // Clear form
    contactName.value = "";
    contactEmail.value = "";
    contactMessage.value = "";

    setTimeout(() => {
      mailFeedback.innerHTML = "";
    }, 4000);
  });
}

// SMOOTH SCROLL FOR NAVIGATION
const allNavLinks = document.querySelectorAll(
  ".nav-links a, .btn-primary, .btn-outline, .btn-cv",
);

allNavLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // Handle HOME button (href="#")
    if (targetId === "#" || targetId === "" || targetId === null) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Handle section links (href="#section-id")
    if (targetId && targetId.startsWith("#") && targetId !== "#") {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// LOGO & HOME LINK HANDLER
const homeLinks = document.querySelectorAll(".nav-links a:first-child, .logo");

homeLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// ACTIVE NAV LINK HIGHLIGHT ON SCROLL
const sections = document.querySelectorAll("section, div[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNavLink() {
  let current = "";
  const scrollPosition = window.scrollY + 150; // Offset for earlier activation

  // Find which section is currently in view
  sections.forEach((section) => {
    const sectionId = section.getAttribute("id");
    if (!sectionId) return;

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = sectionId;
    }
  });

  // Map section IDs to nav link hrefs
  const idToHref = {
    home: "#",
    about: "#about",
    skills: "#skills",
    work: "#work",
    projects: "#work",
    contact: "#contact",
  };

  let activeHref = idToHref[current] || "";

  // Handle footer/bottom of page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    activeHref = "#contact";
  }

  // Handle top of page
  if (window.scrollY < 100) {
    activeHref = "#";
  }

  // Update active class on nav links
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    if (linkHref === activeHref) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Listen for scroll, load, and resize events
window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);
window.addEventListener("resize", setActiveNavLink);

// CONSOLE WELCOME MESSAGE
console.log(
  "%cPortfolio loaded successfully.",
  "color: #8bb5e0; font-size: 14px; font-weight: bold;",
);
