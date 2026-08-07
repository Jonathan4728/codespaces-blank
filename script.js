document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // MOBILE HAMBURGER MENU
  // ========================================

  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {

    menuButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });


    navLinks.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });

    });


    document.addEventListener("click", function (event) {

      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }

    });

  }


  // ========================================
  // COPYRIGHT YEAR
  // ========================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // ========================================
  // REPAIR REQUEST FORM
  // ========================================

  const businessPhone = "13373268324";
  const businessEmail = "floressenginerepair@gmail.com";

  const quoteForm = document.getElementById("quoteForm");
  const textRequest = document.getElementById("textRequest");
  const emailRequest = document.getElementById("emailRequest");
  const formMessage = document.getElementById("formMessage");


  function getRepairRequest() {

    const data = new FormData(quoteForm);

    return {
      name: data.get("name"),
      phone: data.get("phone"),
      equipment: data.get("equipment"),
      model: data.get("model"),
      serviceType: data.get("serviceType"),
      location: data.get("location"),
      problem: data.get("problem")
    };

  }


  function buildMessage(request) {

    return `NEW REPAIR REQUEST

Name: ${request.name}
Phone: ${request.phone}

Equipment:
${request.equipment}

Brand / Model:
${request.model || "Not provided"}

Service Type:
${request.serviceType || "Not selected"}

Equipment Location:
${request.location || "Not provided"}

Problem:
${request.problem}

PHOTOS:
Photos are welcome. Please attach any equipment pictures before sending this message.`;

  }


  // ========================================
  // TEXT BUTTON
  // ========================================

  if (quoteForm && textRequest) {

    textRequest.addEventListener("click", function () {

      if (!quoteForm.reportValidity()) {
        return;
      }

      const request = getRepairRequest();

      const message = encodeURIComponent(
        buildMessage(request)
      );

      if (formMessage) {
        formMessage.textContent = "Opening your text message...";
      }

      window.location.href =
        `sms:${businessPhone}?body=${message}`;

    });

  }


  // ========================================
  // EMAIL BUTTON
  // ========================================

  if (quoteForm && emailRequest) {

    emailRequest.addEventListener("click", function () {

      if (!quoteForm.reportValidity()) {
        return;
      }

      const request = getRepairRequest();

      const subject = encodeURIComponent(
        `Repair Request - ${request.equipment}`
      );

      const body = encodeURIComponent(
        buildMessage(request)
      );

      if (formMessage) {
        formMessage.textContent = "Opening your email app...";
      }

      window.location.href =
        `mailto:${businessEmail}?subject=${subject}&body=${body}`;

    });

  }


  // ========================================
  // GALLERY PHOTO VIEWER
  // ========================================

  const galleryPhotos =
    document.querySelectorAll(".simple-gallery img");

  const photoViewer =
    document.getElementById("photoViewer");

  const largePhoto =
    document.getElementById("largePhoto");

  const closePhoto =
    document.getElementById("closePhoto");


  galleryPhotos.forEach(function (photo) {

    photo.addEventListener("click", function () {

      if (!photoViewer || !largePhoto) {
        return;
      }

      largePhoto.src = photo.src;
      photoViewer.classList.add("open");

    });

  });


  if (closePhoto && photoViewer) {

    closePhoto.addEventListener("click", function () {
      photoViewer.classList.remove("open");
    });

  }


  if (photoViewer) {

    photoViewer.addEventListener("click", function (event) {

      if (event.target === photoViewer) {
        photoViewer.classList.remove("open");
      }

    });

  }

});