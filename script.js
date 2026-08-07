document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // SUPABASE - PUBLIC REPAIR REQUESTS
  // ========================================

  const SUPABASE_URL =
    "https://ykqbjqiujnqljwwyxrre.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_CmCfIvZJJwMNV0QzQwrEsw_W0X8XOvj";

  const supabaseClient =
    window.supabase
      ? window.supabase.createClient(
          SUPABASE_URL,
          SUPABASE_KEY
        )
      : null;


  // ========================================
  // MOBILE HAMBURGER MENU
  // ========================================

  const menuButton =
    document.querySelector(".menu-toggle");

  const navLinks =
    document.querySelector(".nav-links");


  if (menuButton && navLinks) {

    menuButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();

        navLinks.classList.toggle("open");

        const isOpen =
          navLinks.classList.contains("open");

        menuButton.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );

      }
    );


    navLinks
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });


    document.addEventListener(
      "click",
      function (event) {

        if (
          navLinks.classList.contains("open") &&
          !navLinks.contains(event.target) &&
          !menuButton.contains(event.target)
        ) {

          navLinks.classList.remove("open");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );

  }


  // ========================================
  // COPYRIGHT YEAR
  // ========================================

  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  // ========================================
  // BUSINESS INFORMATION
  // ========================================

  const businessPhone =
    "13373268324";

  const businessEmail =
    "flores.smallenginerepair@gmail.com";


  // WEB3FORMS - OWNER EMAIL NOTIFICATIONS
  const WEB3FORMS_ACCESS_KEY =
    "671bb045-cad7-4505-988d-53451853ea59";


  async function sendOwnerNotification(request) {
    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New Repair Request - ${request.equipment || "Equipment"}`,
            from_name: "Flores Small Engine Repair Website",
            name: request.name,
            phone: request.phone,
            email: request.email || "Not provided",
            equipment: request.equipment,
            model: request.model || "Not provided",
            service_type: request.serviceType || "Not selected",
            location: request.location || "Not provided",
            message: request.problem
          })
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Email notification failed:", result);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Email notification error:", error);
      return false;
    }
  }


  // ========================================
  // REPAIR REQUEST FORM
  // ========================================

  const quoteForm =
    document.getElementById("quoteForm");

  const textRequest =
    document.getElementById("textRequest");

  const emailRequest =
    document.getElementById("emailRequest");

  const formMessage =
    document.getElementById("formMessage");


  function getRepairRequest() {

    const data =
      new FormData(quoteForm);


    return {

      name:
        data.get("name") || "",

      phone:
        data.get("phone") || "",

      email:
        data.get("email") || "",

      equipment:
        data.get("equipment") || "",

      model:
        data.get("model") || "",

      serviceType:
        data.get("serviceType") || "",

      location:
        data.get("location") || "",

      problem:
        data.get("problem") || ""

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


  async function saveWebsiteRequest(request) {

    if (!supabaseClient) {

      console.error(
        "Supabase library did not load."
      );

      return {
        ok: false,
        error:
          "Request system did not load."
      };

    }


    const {
      error
    } =
      await supabaseClient
        .from("service_requests")
        .insert({

          name:
            request.name,

          phone:
            request.phone,

          email:
            request.email,

          equipment:
            request.equipment,

          model:
            request.model,

          service_type:
            request.serviceType,

          location:
            request.location,

          problem:
            request.problem

        });


    if (error) {

      console.error(error);

      return {
        ok: false,
        error:
          error.message
      };

    }


    return {
      ok: true
    };

  }


  // ========================================
  // TEXT REPAIR REQUEST
  // ========================================

  if (
    quoteForm &&
    textRequest
  ) {

    textRequest.addEventListener(
      "click",
      async function () {

        if (!quoteForm.reportValidity()) {
          return;
        }


        textRequest.disabled = true;


        if (formMessage) {

          formMessage.textContent =
            "Saving your request...";

        }


        const request =
          getRepairRequest();


        const saved =
          await saveWebsiteRequest(
            request
          );


        if (!saved.ok) {

          if (formMessage) {

            formMessage.textContent =
              "We couldn't save the request online, but you can still send the text.";

          }

        } else {

          await sendOwnerNotification(request);

          if (formMessage) {
            formMessage.textContent =
              "Request saved. Opening your text message...";
          }

        }


        const message =
          encodeURIComponent(
            buildMessage(request)
          );


        textRequest.disabled = false;


        window.location.href =
          `sms:${businessPhone}?body=${message}`;

      }
    );

  }


  // ========================================
  // EMAIL REPAIR REQUEST
  // ========================================

  if (
    quoteForm &&
    emailRequest
  ) {

    emailRequest.addEventListener(
      "click",
      async function () {

        if (!quoteForm.reportValidity()) {
          return;
        }


        emailRequest.disabled = true;


        if (formMessage) {

          formMessage.textContent =
            "Saving your request...";

        }


        const request =
          getRepairRequest();


        const saved =
          await saveWebsiteRequest(
            request
          );


        if (!saved.ok) {

          if (formMessage) {

            formMessage.textContent =
              "We couldn't save the request online, but you can still send the email.";

          }

        } else {

          await sendOwnerNotification(request);

          if (formMessage) {
            formMessage.textContent =
              "Request saved. Opening your email app...";
          }

        }


        const subject =
          encodeURIComponent(
            `Repair Request - ${request.equipment}`
          );


        const body =
          encodeURIComponent(
            buildMessage(request)
          );


        emailRequest.disabled = false;


        window.location.href =
          `mailto:${businessEmail}?subject=${subject}&body=${body}`;

      }
    );

  }


  // ========================================
  // GALLERY PHOTO VIEWER
  // ========================================

  const galleryPhotos =
    document.querySelectorAll(
      ".simple-gallery img"
    );

  const photoViewer =
    document.getElementById(
      "photoViewer"
    );

  const largePhoto =
    document.getElementById(
      "largePhoto"
    );

  const closePhoto =
    document.getElementById(
      "closePhoto"
    );


  galleryPhotos.forEach(
    function (photo) {

      photo.addEventListener(
        "click",
        function () {

          if (
            !photoViewer ||
            !largePhoto
          ) {
            return;
          }

          largePhoto.src =
            photo.src;

          photoViewer
            .classList
            .add("open");

        }
      );

    }
  );


  if (
    closePhoto &&
    photoViewer
  ) {

    closePhoto.addEventListener(
      "click",
      function () {

        photoViewer
          .classList
          .remove("open");

      }
    );

  }


  if (photoViewer) {

    photoViewer.addEventListener(
      "click",
      function (event) {

        if (
          event.target ===
          photoViewer
        ) {

          photoViewer
            .classList
            .remove("open");

        }

      }
    );

  }

});
