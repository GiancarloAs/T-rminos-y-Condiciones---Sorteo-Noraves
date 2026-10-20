(function () {
  "use strict";

  /* 1) Portada: muestra el recuadro guía solo si la imagen aún no existe */
  var cover = document.getElementById("portada");
  if (cover) {
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var src = isMobile ? "img/portada-movil.jpg" : "img/portada-pc.jpg";
    var probe = new Image();
    probe.onerror = function () { cover.classList.add("no-img"); };
    probe.src = src;
  }

  /* 2) Índice: resalta la sección que se está leyendo */
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  function setActive(id) {
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-active", on);
      if (on) {
        a.setAttribute("aria-current", "true");
        // En celular, mantiene visible el enlace activo dentro de la barra horizontal
        var bar = a.closest(".toc");
        if (bar && bar.scrollWidth > bar.clientWidth) {
          bar.scrollLeft = a.offsetLeft - 24;
        }
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-20% 0px -65% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
})();
