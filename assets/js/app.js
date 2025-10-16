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
