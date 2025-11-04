
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