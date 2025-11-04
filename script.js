
// Popup Gallery
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('click', () => {
            popup.style.display = 'block';
            popupImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// To highlight Active page
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".navbar ul li a");
  const currentPath = window.location.pathname.split("/").pop(); // e.g., "architecture.html" or "index.html"

  // Remove all active classes first
  links.forEach(link => link.classList.remove("active"));

  // Highlight the correct page link
  links.forEach(link => {
    const href = link.getAttribute("href");

    // Case 1: Direct HTML page links (architecture, interior, etc.)
    if (href === currentPath) {
      link.classList.add("active");
    }

    // Case 2: Home (index.html or root "/")
    if ((currentPath === "" || currentPath === "index.html") && href === "index.html") {
      link.classList.add("active");
    }
  });
});

// Theme Change
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
