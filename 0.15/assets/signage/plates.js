// Mailbox plate page (docs/16-mailbox-plate.md): replaces each <img data-plate> with the inline SVG,
// so the plate text uses the brand fonts the docs already load. Without JS the <img> stays.
(function () {
  const base = document.currentScript.src.replace(/[^/]*$/, "");
  function init() {
    document.querySelectorAll("img[data-plate]").forEach(img => {
      fetch(base + "plate-" + img.dataset.plate + ".svg")
        .then(r => r.ok ? r.text() : Promise.reject())
        .then(svg => {
          const box = document.createElement("div");
          box.className = "plate-svg";
          box.innerHTML = svg;
          box.querySelector("svg").setAttribute("role", "img");
          box.querySelector("svg").setAttribute("aria-label", img.alt);
          img.replaceWith(box);
        })
        .catch(() => {});
    });
  }
  if (typeof document$ !== "undefined") document$.subscribe(init); else document.addEventListener("DOMContentLoaded", init);
})();
