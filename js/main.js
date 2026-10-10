// PTLS — shared page behaviour
document.addEventListener("DOMContentLoaded", function () {
  // Navbar shadow once the page scrolls
  var nav = document.querySelector(".site-nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Highlight the nav link for the current page
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav .nav-link").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Fade sections in as they scroll into view
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Preselect a role on get-started.html?role=...
  var role = new URLSearchParams(location.search).get("role");
  if (role) {
    var radio = document.querySelector('input[name="role"][value="' + role + '"]');
    if (radio) radio.checked = true;
  }

  // Client-side validation for demo forms (no backend yet)
  document.querySelectorAll("form.needs-validation").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        var firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      var card = form.closest(".form-card");
      if (card) card.classList.add("sent");
    });
  });
});
