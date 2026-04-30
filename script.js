const hasGsap = window.gsap && window.ScrollTrigger;

if (window.Lenis) {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle?.addEventListener("click", () => {
  const isOpen = !header.classList.contains("is-open");
  header.classList.toggle("is-open", isOpen);
  header.classList.toggle("is-closing", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));

  if (!isOpen) {
    window.setTimeout(() => header.classList.remove("is-closing"), 520);
  }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    header.classList.add("is-closing");
    menuToggle?.setAttribute("aria-expanded", "false");
    window.setTimeout(() => header.classList.remove("is-closing"), 520);
  });
});

const form = document.querySelector(".booking-form");
const status = document.querySelector(".form-status");
const workSection = document.querySelector(".work");
const galleryToggle = document.querySelector(".gallery-toggle");
const galleryExtraItems = document.querySelectorAll(".gallery-extra");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "Request noted. We will reply with consultation times shortly.";
  form.reset();
});

galleryToggle?.addEventListener("click", () => {
  const isOpen = workSection.classList.toggle("show-all");
  galleryToggle.setAttribute("aria-expanded", String(isOpen));
  galleryToggle.textContent = isOpen ? "Show Less" : "View More Tattoos";

  if (hasGsap && isOpen) {
    gsap.fromTo(
      galleryExtraItems,
      { y: 38, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        onComplete: () => ScrollTrigger.refresh(),
      }
    );
  } else if (hasGsap) {
    gsap.set(galleryExtraItems, { opacity: 0, y: 28, scale: 0.98 });
    ScrollTrigger.refresh();
  } else {
    galleryExtraItems.forEach((item) => {
      item.style.opacity = isOpen ? "1" : "0";
      item.style.transform = isOpen ? "none" : "translateY(28px) scale(0.98)";
    });
  }
});

if (hasGsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".hero-line", { y: 46, opacity: 0 });
  gsap.set(".hero-art", { x: 70, opacity: 0, scale: 0.96 });
  gsap.set(".studio-strip span", { y: 18, opacity: 0 });
  gsap.set("[data-animate]", { y: -16, opacity: 0 });

  const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
  intro
    .to("[data-animate]", { y: 0, opacity: 1, duration: 0.9 })
    .to(".hero-line", { y: 0, opacity: 1, duration: 1.05, stagger: 0.11 }, "-=0.45")
    .to(".hero-art", { x: 0, opacity: 1, scale: 1, duration: 1.2 }, "-=0.82")
    .to(".studio-strip span", { y: 0, opacity: 1, duration: 0.75, stagger: 0.06 }, "-=0.7");

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.fromTo(
      element,
      { y: 64, opacity: 0, scale: element.classList.contains("gallery-item") ? 0.96 : 1 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  gsap.to("[data-parallax] img", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },
  });

  gsap.utils.toArray(".gallery-item img").forEach((image) => {
    gsap.fromTo(
      image,
      { scale: 1.16 },
      {
        scale: 1.02,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: image,
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
} else {
  document.querySelectorAll(".reveal, .hero-line, [data-animate]").forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}
