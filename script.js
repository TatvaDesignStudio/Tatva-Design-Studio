
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