const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const cursorGlow = document.querySelector(".cursor-glow");
const yearNode = document.getElementById("year");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (menuToggle && siteNav && siteHeader) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    siteHeader.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      siteHeader.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (cursorGlow) {
  if (window.matchMedia("(pointer:fine)").matches && typeof gsap !== "undefined") {
    gsap.set(cursorGlow, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    const xTo = gsap.quickTo(cursorGlow, "x", { duration: 0.24, ease: "power2.out" });
    const yTo = gsap.quickTo(cursorGlow, "y", { duration: 0.24, ease: "power2.out" });

    window.addEventListener("pointermove", (event) => {
      xTo(event.clientX);
      yTo(event.clientY);
    });

    window.addEventListener("pointerdown", () => {
      gsap.to(cursorGlow, { scale: 0.82, duration: 0.16, ease: "power2.out" });
    });

    window.addEventListener("pointerup", () => {
      gsap.to(cursorGlow, { scale: 1, duration: 0.24, ease: "power2.out" });
    });
  } else {
    cursorGlow.style.display = "none";
  }
}

function splitWords() {
  const splitNodes = document.querySelectorAll(".split-text");

  splitNodes.forEach((node) => {
    const text = node.textContent.trim();
    const words = text.split(/\s+/);

    node.textContent = "";

    words.forEach((word, index) => {
      const wrapper = document.createElement("span");
      wrapper.className = "word-wrap";

      const inner = document.createElement("span");
      inner.className = "word";
      inner.textContent = word;

      wrapper.appendChild(inner);
      node.appendChild(wrapper);

      if (index < words.length - 1) {
        node.appendChild(document.createTextNode(" "));
      }
    });
  });
}

splitWords();

if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  introTimeline
    .from(".site-header", { y: -40, opacity: 0, duration: 0.7 })
    .from(".eyebrow .word", { yPercent: 120, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.35")
    .from(".hero-title .word", { yPercent: 120, opacity: 0, duration: 0.92, stagger: 0.09 }, "-=0.4")
    .from(".hero-sub", { y: 20, opacity: 0, duration: 0.65 }, "-=0.45")
    .from(".hero-actions .btn", { y: 18, opacity: 0, duration: 0.54, stagger: 0.1 }, "-=0.45")
    .from(".facts li", { y: 18, opacity: 0, duration: 0.48, stagger: 0.08 }, "-=0.45")
    .from(".photo-shell", { y: 32, opacity: 0, scale: 0.95, duration: 0.85 }, "-=0.65")
    .from(".status-panel", { y: 24, opacity: 0, duration: 0.55 }, "-=0.45");

  gsap.utils.toArray(".section-head").forEach((heading) => {
    gsap.from(heading, {
      y: 34,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 85%"
      }
    });
  });

  gsap.utils.toArray(".reveal-card").forEach((card, index) => {
    gsap.from(card, {
      y: 35,
      opacity: 0,
      duration: 0.78,
      ease: "power3.out",
      delay: index % 3 === 0 ? 0 : 0.04,
      scrollTrigger: {
        trigger: card,
        start: "top 87%"
      }
    });
  });

  gsap.to(".photo-shell img", {
    scale: 1.12,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.utils.toArray(".chip").forEach((chip, index) => {
    gsap.to(chip, {
      y: gsap.utils.random(-9, 9),
      x: gsap.utils.random(-6, 6),
      rotate: gsap.utils.random(-3, 3),
      duration: gsap.utils.random(2.3, 4.8),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.06
    });
  });
}

const magneticButtons = document.querySelectorAll(".magnetic");

if (window.matchMedia("(pointer:fine)").matches) {
  magneticButtons.forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const bounds = button.getBoundingClientRect();
      const offsetX = event.clientX - (bounds.left + bounds.width / 2);
      const offsetY = event.clientY - (bounds.top + bounds.height / 2);
      const moveX = Math.max(-10, Math.min(10, offsetX * 0.12));
      const moveY = Math.max(-8, Math.min(8, offsetY * 0.16));

      if (typeof gsap !== "undefined") {
        gsap.to(button, {
          x: moveX,
          y: moveY,
          duration: 0.25,
          ease: "power2.out"
        });
      }
    });

    button.addEventListener("pointerleave", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.35,
          ease: "elastic.out(1, 0.4)"
        });
      }
    });
  });
}
