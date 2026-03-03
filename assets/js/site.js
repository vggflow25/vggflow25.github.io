document.documentElement.classList.add("js");

const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("in-view"));
}

const sectionIds = ["overview", "abstract", "method", "results", "citation"];
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function setActiveLink() {
  const pivot = window.scrollY + window.innerHeight * 0.28;

  let activeId = sectionIds[0];
  for (const section of sections) {
    if (section.offsetTop <= pivot) {
      activeId = section.id;
    }
  }

  navAnchors.forEach((anchor) => {
    const isActive = anchor.getAttribute("href") === `#${activeId}`;
    anchor.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", setActiveLink);
setActiveLink();
