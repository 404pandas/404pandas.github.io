/* ============================================================ *\
*   Mary Elenius Portfolio — GSAP Animations
*   Rule: GSAP runs entrance animations only (fire once, then done).
*         Loops, hovers, and pulses live in CSS.
\* ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════ *\
   1. BOOT SEQUENCE  (fires once)
\* ═══════════════════════════════════════════════════════════ */
function initPageLoad() {
  document.body.classList.remove("js-loading");

  gsap.set(".panel",       { y: 50, opacity: 0 });
  gsap.set(".panel-title", { opacity: 0, x: -10 });
  gsap.set(".sidebar",     { x: -280, opacity: 0 });
  gsap.set(".panda-coding",{ scale: 0, opacity: 0, transformOrigin: "center bottom" });
  gsap.set([".textEffect", ".glow"], { opacity: 0 });
  gsap.set(".sidebar-role",{ opacity: 0 });

  const tl = gsap.timeline({ delay: 0.1 });

  tl.to(".sidebar",      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
  tl.to(".panda-coding", { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.8)" }, "-=0.3");
  tl.to([".textEffect", ".glow"], { opacity: 1, duration: 0.4 }, "-=0.2");

  tl.add(() => {
    const el = document.querySelector(".sidebar-role");
    if (!el) return;
    const text = el.dataset.text || el.textContent.trim();
    el.dataset.text = text;
    el.textContent = "";
    el.style.opacity = "1";
    let i = 0;
    const delay = 900 / text.length;
    const tick = () => {
      if (i < text.length) { el.textContent += text[i++]; setTimeout(tick, delay); }
    };
    tick();
  }, "-=0.1");
}

/* ═══════════════════════════════════════════════════════════ *\
   2. SCROLL-TRIGGERED PANEL ENTRANCES  (each fires once)
\* ═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  document.querySelectorAll(".panel").forEach((panel) => {
    const id    = panel.id;
    const title = panel.querySelector(".panel-title");

    panel.classList.add("gsap-animating");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: panel, start: "top 88%", once: true },
      onComplete: () => panel.classList.remove("gsap-animating"),
    });

    tl.to(panel, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

    if (title)
      tl.to(title, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, "-=0.25");

    if (id === "technologies") {
      tl.fromTo(".tab-btn",
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.22, ease: "power2.out" },
        "-=0.2"
      );
      tl.fromTo("#languages li",
        { opacity: 0, x: 8 },
        { opacity: 1, x: 0, stagger: 0.04, duration: 0.2, ease: "power2.out",
          onComplete: applyTechListHover },
        "-=0.1"
      );
    }

    if (id === "about-me") {
      tl.fromTo(".badge",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.06, duration: 0.3, ease: "back.out(2)" },
        "-=0.2"
      );
      tl.fromTo("#about-nav-list li",
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.2, ease: "power2.out" },
        "-=0.15"
      );
      tl.fromTo("#about-detail > *",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.25, ease: "power2.out" },
        "-=0.1"
      );
    }

    if (id === "work") {
      tl.fromTo("#project-nav-list li",
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, stagger: 0.025, duration: 0.18, ease: "power2.out" },
        "-=0.2"
      );
      tl.fromTo("#project-detail > *",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.22, ease: "power2.out" },
        "-=0.1"
      );
    }

    if (id === "contact") {
      tl.fromTo(".contact-list li",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.28, ease: "power2.out" },
        "-=0.2"
      );
      tl.fromTo(".resume-btn",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" },
        "-=0.1"
      );
    }
  });
}

/* ═══════════════════════════════════════════════════════════ *\
   3. TAB SWITCH  (user-triggered, short-lived)
\* ═══════════════════════════════════════════════════════════ */
function animateTabSwitch(oldPanel, newPanel) {
  gsap.timeline()
    .to(oldPanel, {
      opacity: 0, x: -12, duration: 0.13, ease: "power2.in", overwrite: "auto",
      onComplete: () => {
        oldPanel.classList.remove("active");
        gsap.set(oldPanel, { opacity: 1, x: 0 });
        newPanel.classList.add("active");
        gsap.set(newPanel, { opacity: 0, x: 12 });
      },
    })
    .to(newPanel, { opacity: 1, x: 0, duration: 0.18, ease: "power2.out" })
    .fromTo(newPanel.querySelectorAll("li"),
      { opacity: 0, x: 8 },
      { opacity: 1, x: 0, stagger: 0.04, duration: 0.18, ease: "power2.out",
        onComplete: applyTechListHover },
      "-=0.08"
    );
}

/* ═══════════════════════════════════════════════════════════ *\
   4. DETAIL PANE  (user-triggered, short-lived)
\* ═══════════════════════════════════════════════════════════ */
function animateDetailIn(pane) {
  const kids = Array.from(pane.children);
  if (!kids.length) return;
  gsap.fromTo(kids,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, stagger: 0.07, duration: 0.25, ease: "power2.out", overwrite: "auto" }
  );
}

/* ═══════════════════════════════════════════════════════════ *\
   5. NAV FLASH  (user-triggered, short-lived)
\* ═══════════════════════════════════════════════════════════ */
function flashNavItem(el) {
  gsap.fromTo(el,
    { opacity: 0.3 },
    { opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" }
  );
}

/* ─── Applied once to static list; re-applied after tab switch ─── */
function applyTechListHover() {
  /* Tech list nudge is CSS — nothing to do here.
     Kept as a hook in case future CSS-class toggling is needed. */
}
