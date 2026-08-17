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
    "floressenginerepair@gmail.com";


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


  const repairRequestPhone =
    document.getElementById(
      "repairRequestPhone"
    );

  const repairEquipment =
    document.getElementById(
      "repairEquipment"
    );

  const repairProblem =
    document.getElementById(
      "repairProblem"
    );

  const equipmentQuickPicks =
    document.querySelectorAll(
      ".equipment-quick-picks button"
    );

  const problemQuickPicks =
    document.querySelectorAll(
      ".problem-quick-picks button"
    );


  function formatRepairPhone(value) {

    const digits =
      String(value || "")
        .replace(/\D/g, "")
        .slice(0, 10);


    if (digits.length <= 3) {
      return digits;
    }


    if (digits.length <= 6) {

      return `(${
        digits.slice(0, 3)
      }) ${
        digits.slice(3)
      }`;

    }


    return `(${
      digits.slice(0, 3)
    }) ${
      digits.slice(3, 6)
    }-${
      digits.slice(6)
    }`;

  }


  repairRequestPhone
    ?.addEventListener(
      "input",
      function () {

        repairRequestPhone.value =
          formatRepairPhone(
            repairRequestPhone.value
          );

      }
    );


  equipmentQuickPicks
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            if (!repairEquipment) {
              return;
            }


            repairEquipment.value =
              button.dataset.equipment || "";


            equipmentQuickPicks
              .forEach(
                item =>
                  item.classList.remove(
                    "selected"
                  )
              );


            button.classList.add(
              "selected"
            );


            repairEquipment.focus();

          }
        );

      }
    );


  problemQuickPicks
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            if (!repairProblem) {
              return;
            }


            const problem =
              button.dataset.problem || "";


            if (!problem) {
              return;
            }


            const current =
              repairProblem.value.trim();


            if (
              current
                .toLowerCase()
                .includes(
                  problem.toLowerCase()
                )
            ) {
              return;
            }


            repairProblem.value =
              current
                ? `${
                    current
                  }${
                    /[.!?]$/.test(current)
                      ? ""
                      : "."
                  } ${problem}.`
                : `${problem}.`;


            button.classList.add(
              "selected"
            );


            repairProblem.focus();

          }
        );

      }
    );


  function repairRequestFingerprint(
    request
  ) {

    const normalizedPhone =
      String(request.phone || "")
        .replace(/\D/g, "")
        .replace(/^1(?=\d{10}$)/, "");


    return JSON.stringify({

      name:
        String(request.name || "")
          .trim()
          .toLowerCase(),

      phone:
        normalizedPhone,

      email:
        String(request.email || "")
          .trim()
          .toLowerCase(),

      equipment:
        String(request.equipment || "")
          .trim()
          .toLowerCase(),

      model:
        String(request.model || "")
          .trim()
          .toLowerCase(),

      serviceType:
        String(request.serviceType || "")
          .trim()
          .toLowerCase(),

      location:
        String(request.location || "")
          .trim()
          .toLowerCase(),

      problem:
        String(request.problem || "")
          .trim()
          .toLowerCase()

    });

  }


  function websiteRequestWasJustSaved(
    request
  ) {

    try {

      const saved =
        JSON.parse(
          sessionStorage.getItem(
            "fserLastWebsiteRequest"
          ) || "null"
        );


      if (!saved) {
        return false;
      }


      return (
        saved.fingerprint ===
          repairRequestFingerprint(
            request
          ) &&
        Date.now() -
          Number(saved.savedAt || 0) <
          15 * 60 * 1000
      );

    } catch {

      return false;

    }

  }


  function rememberWebsiteRequest(
    request
  ) {

    try {

      sessionStorage.setItem(
        "fserLastWebsiteRequest",
        JSON.stringify({

          fingerprint:
            repairRequestFingerprint(
              request
            ),

          savedAt:
            Date.now()

        })
      );

    } catch {
      // Request can still work if browser storage is unavailable.
    }

  }


  function disableRequestButtons(
    disabled
  ) {

    if (textRequest) {
      textRequest.disabled =
        disabled;
    }


    if (emailRequest) {
      emailRequest.disabled =
        disabled;
    }

  }



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

    if (
      websiteRequestWasJustSaved(
        request
      )
    ) {

      return {
        ok: true,
        duplicateSkipped: true
      };

    }


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


    rememberWebsiteRequest(
      request
    );


    return {
      ok: true,
      duplicateSkipped: false
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


        disableRequestButtons(true);


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

        } else if (formMessage) {

          formMessage.textContent =
            saved.duplicateSkipped
              ? "This request is already saved. Opening your text message..."
              : "Request saved. Opening your text message...";

        }


        const message =
          encodeURIComponent(
            buildMessage(request)
          );


        disableRequestButtons(false);


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


        disableRequestButtons(true);


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

        } else if (formMessage) {

          formMessage.textContent =
            saved.duplicateSkipped
              ? "This request is already saved. Opening your email app..."
              : "Request saved. Opening your email app...";

        }


        const subject =
          encodeURIComponent(
            `Repair Request - ${request.equipment}`
          );


        const body =
          encodeURIComponent(
            buildMessage(request)
          );


        disableRequestButtons(false);


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
