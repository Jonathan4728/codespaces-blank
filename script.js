const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");

// Replace this with your real business email.
const businessEmail = "your@email.com";

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(quoteForm);
  const subject = encodeURIComponent(
    `Repair Request - ${data.get("equipment") || "Equipment"}`
  );

  const body = encodeURIComponent(
`Name: ${data.get("name")}
Phone: ${data.get("phone")}
Email: ${data.get("email")}
Service type: ${data.get("service")}
Equipment: ${data.get("equipment")}
Brand / model: ${data.get("model")}

Problem:
${data.get("problem")}`
  );

  formMessage.textContent = "Opening your email app...";
  window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
});
