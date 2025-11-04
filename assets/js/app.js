// Smooth scroll for in-page nav
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// JS to open/close modal
// const modal = document.getElementById("projectsModal");
// const btn = document.getElementById("viewProjectsBtn");
// const span = document.querySelector(".close");

// btn.onclick = () => modal.style.display = "flex";
// span.onclick = () => modal.style.display = "none";
// window.onclick = e => { if(e.target == modal) modal.style.display = "none"; }

// ===== View Projects Modal =====
const projectsModal = document.getElementById("projectsModal");
const viewProjectsBtn = document.getElementById("viewProjectsBtn");
const projectsClose = projectsModal?.querySelector(".close");

viewProjectsBtn?.addEventListener("click", () => {
  projectsModal.style.display = "flex";
});

projectsClose?.addEventListener("click", () => {
  projectsModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === projectsModal) projectsModal.style.display = "none";
});


// ===== Start Project Form Modal =====
const projectFormModal = document.getElementById("projectFormModal");
const startProjectBtn = document.getElementById("startProjectBtn");
const formClose = projectFormModal?.querySelector(".close");
const projectForm = document.getElementById("projectForm");
const formResponse = document.getElementById("formResponse");

// Open form modal
startProjectBtn?.addEventListener("click", () => {
  projectFormModal.style.display = "flex";
});

// Close form modal
formClose?.addEventListener("click", () => {
  projectFormModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === projectFormModal) projectFormModal.style.display = "none";
});

// Handle form submission
projectForm?.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(projectForm);

  try {
    const response = await fetch(projectForm.action, {
      method: projectForm.method,
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formResponse.textContent =
        "✅ Thank you! Your project request has been sent.";
      projectForm.reset();
      setTimeout(() => (projectFormModal.style.display = "none"), 2000);
    } else {
      formResponse.textContent = "❌ Something went wrong. Please try again.";
    }
  } catch (error) {
    formResponse.textContent = "⚠️ Network error. Please try again later.";
  }
});


// ===== Highlight active nav link on scroll (works with index.html as Home) =====
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navbar ul li a");
  const offset = 150;

  function clearActive() {
    links.forEach(link => link.classList.remove("active"));
  }

  function setActive(href) {
    clearActive();
    const activeLink = Array.from(links).find(link => {
      const linkHref = link.getAttribute("href");
      // Handle index.html, /index.html, or just index.html#...
      return (
        linkHref === href ||
        linkHref.endsWith(href) ||
        (href === "#home" && linkHref.includes("index.html"))
      );
    });
    activeLink?.classList.add("active");
  }

  function handleScroll() {
    const scrollY = window.scrollY + offset;
    const sections = Array.from(document.querySelectorAll("section[id]"));
    let activeFound = false;

    sections.forEach((section, index) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const href = `#${id}`;

      if (scrollY >= top && scrollY < top + height) {
        setActive(href);
        activeFound = true;
      }

      // ✅ Ensure Contact is active near bottom
      if (!activeFound && index === sections.length - 1 && scrollY > top) {
        setActive(href);
        activeFound = true;
      }
    });

    // ✅ Home when near top
    if (!activeFound && window.scrollY < 150) {
      setActive("index.html");
    }
  }

  // ✅ Highlight for standalone pages (like architecture.html)
  const currentPath = window.location.pathname.split("/").pop();
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.endsWith(currentPath) && !href.startsWith("#")) {
      link.classList.add("active");
    }
  });

  // Run after DOM ready and small delay for mobile layout
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  window.addEventListener("load", () => setTimeout(handleScroll, 400));
  handleScroll();
});


// For THEME CHANGE
const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = toggleBtn.querySelector('.theme-icon');

  // Load saved theme from localStorage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    loadLightTheme();
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      unloadLightTheme();
    } else {
      loadLightTheme();
    }
  });

  function loadLightTheme() {
    if (!document.getElementById('light-theme')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/css/light.css';
      link.id = 'light-theme';
      document.head.appendChild(link);
    }
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '🌙'; // Moon for dark mode next
    localStorage.setItem('theme', 'light');
  }

  function unloadLightTheme() {
    const link = document.getElementById('light-theme');
    if (link) link.remove();
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌞'; // Sun for light mode next
    localStorage.setItem('theme', 'dark');
  }