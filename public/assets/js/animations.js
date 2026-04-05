/* ============================================================ *\
*        Mary Elenius Portfolio — GSAP Animations               *
\* ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ───── Utilities ───── */
const _rand = (min, max) => Math.random() * (max - min) + min;

/* ─── Simple typewriter ─── */
function _typewrite(el, text, durationMs, onDone) {
  el.textContent = "";
  const delay = durationMs / text.length;
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, delay);
    } else if (onDone) {
      onDone();
    }
  };
  tick();
}

/* ─── Spark burst at page coordinates ─── */
function _sparks(x, y, count = 12) {
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.className = "spark";
    document.body.appendChild(dot);
    const angle = (i / count) * Math.PI * 2;
    const dist = _rand(30, 80);
    gsap.set(dot, { x, y, xPercent: -50, yPercent: -50 });
    gsap.to(dot, {
      x: x + Math.cos(angle) * dist,
      y: y + Math.sin(angle) * dist,
      opacity: 0,
      scale: _rand(0.4, 1.2),
      duration: _rand(0.4, 0.8),
      ease: "power2.out",
      onComplete: () => dot.remove(),
    });
  }
}

/* ─── Scan sweep line through a panel ─── */
function _scanPanel(panel, delay = 0) {
  const line = document.createElement("div");
  line.className = "panel-scan";
  panel.appendChild(line);
  gsap.fromTo(
    line,
    { top: "0%", opacity: 1 },
    {
      top: "100%",
      opacity: 0,
      duration: 0.55,
      delay,
      ease: "power1.in",
      onComplete: () => line.remove(),
    }
  );
}

/* ═══════════════════════════════════════════════════════════ *\
   1. BOOT SEQUENCE  (sidebar + name only — panels via ScrollTrigger)
\* ═══════════════════════════════════════════════════════════ */
function initPageLoad() {
  document.body.classList.remove("js-loading");

  /* ── Set all panels hidden; ScrollTrigger will reveal them ── */
  gsap.set(".panel", { y: 60, opacity: 0, scale: 0.94 });
  gsap.set(".panel-title", { opacity: 0, x: -10 });

  /* ── Sidebar elements hidden for boot sequence ── */
  gsap.set(".sidebar", { x: -300, opacity: 0 });
  gsap.set(".panda-coding", {
    scale: 0,
    opacity: 0,
    transformOrigin: "center bottom",
  });
  gsap.set([".textEffect", ".glow"], { opacity: 0 });
  gsap.set(".sidebar-role", { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.1 });

  /* Sidebar slides in */
  tl.to(".sidebar", { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" });

  /* Panda bounces in */
  tl.to(
    ".panda-coding",
    { scale: 1, opacity: 1, duration: 0.75, ease: "back.out(2)" },
    "-=0.35"
  );

  /* Panda arrival glow burst */
  tl.fromTo(
    ".panda-coding",
    { filter: "drop-shadow(0 0 50px rgba(140,213,207,1))" },
    {
      filter: "drop-shadow(0 0 12px rgba(140,213,207,0.5))",
      duration: 1.1,
      ease: "power2.out",
    },
    "-=0.55"
  );

  /* Name fades in */
  tl.to(
    [".textEffect", ".glow"],
    { opacity: 1, duration: 0.5, ease: "power2.out" },
    "-=0.5"
  );

  /* Role typewriter */
  tl.add(() => {
    const roleEl = document.querySelector(".sidebar-role");
    if (!roleEl) return;
    const text = roleEl.dataset.text || roleEl.textContent.trim();
    roleEl.dataset.text = text;
    gsap.set(roleEl, { opacity: 1 });
    _typewrite(roleEl, text, 1000, () => {
      const cur = document.createElement("span");
      cur.className = "type-cursor";
      roleEl.appendChild(cur);
      gsap.to(cur, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.55,
        ease: "steps(1)",
      });
    });
  }, "-=0.1");
}

/* ═══════════════════════════════════════════════════════════ *\
   2. SCROLL-TRIGGERED PANEL ANIMATIONS
\* ═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  document.querySelectorAll(".panel").forEach((panel) => {
    const title = panel.querySelector(".panel-title");
    const id = panel.id;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top 88%",
        once: true,
      },
    });

    /* Panel slides up */
    tl.to(panel, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.55,
      ease: "power2.out",
    });

    /* Panel scan sweep */
    tl.add(() => _scanPanel(panel), "-=0.3");

    /* Panel title slides in */
    if (title) {
      tl.to(
        title,
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        "-=0.35"
      );
    }

    /* ── Technologies panel ── */
    if (id === "technologies") {
      tl.fromTo(
        ".tab-btn",
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.25, ease: "power2.out" },
        "-=0.25"
      );
      tl.fromTo(
        "#languages li",
        { opacity: 0, x: 10 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.055,
          duration: 0.25,
          ease: "power2.out",
          onComplete: applyTechListHover,
        },
        "-=0.15"
      );
    }

    /* ── About Me panel ── */
    if (id === "about-me") {
      tl.fromTo(
        ".badge",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.07,
          duration: 0.4,
          ease: "back.out(2.8)",
        },
        "-=0.3"
      );
      tl.fromTo(
        "#about-nav-list li",
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, stagger: 0.06, duration: 0.25, ease: "power2.out" },
        "-=0.25"
      );
      tl.fromTo(
        "#about-detail > *",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" },
        "-=0.15"
      );
    }

    /* ── Projects panel ── */
    if (id === "work") {
      tl.fromTo(
        "#project-nav-list li",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.03, duration: 0.2, ease: "power2.out" },
        "-=0.3"
      );
      tl.fromTo(
        "#project-detail > *",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );
    }

    /* ── Contact panel ── */
    if (id === "contact") {
      tl.fromTo(
        ".contact-list li",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.09,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.3"
      );
      tl.fromTo(
        ".resume-btn",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.38, ease: "back.out(1.7)" },
        "-=0.15"
      );
    }

    /* Bracket flicker on each panel after it arrives */
    tl.add(() => {
      const brackets = panel.querySelectorAll(".panel-title-bracket");
      if (brackets.length) {
        gsap.fromTo(
          brackets,
          { opacity: 0.3 },
          {
            opacity: 1,
            stagger: 0.08,
            duration: 0.12,
            ease: "steps(1)",
            repeat: 2,
            yoyo: true,
          }
        );
      }
    }, "-=0.1");
  });
}

/* ═══════════════════════════════════════════════════════════ *\
   3. AMBIENT LOOPING ANIMATIONS
\* ═══════════════════════════════════════════════════════════ */
function initAmbient() {
  /* Panda gentle float */
  gsap.to(".panda-coding", {
    y: -11,
    repeat: -1,
    yoyo: true,
    duration: 2.9,
    ease: "sine.inOut",
  });

  /* Panda random glitch shakes */
  (function pandaGlitch() {
    gsap.timeline()
      .to(".panda-coding", { x: -6, skewX: 5, duration: 0.055, ease: "none" })
      .to(".panda-coding", { x: 7, skewX: -5, duration: 0.055, ease: "none" })
      .to(".panda-coding", { x: -4, skewX: 2, duration: 0.055, ease: "none" })
      .to(".panda-coding", { x: 0, skewX: 0, duration: 0.13, ease: "power2.out" });
    gsap.delayedCall(_rand(6, 16), pandaGlitch);
  })();

  /* Random panel glitch flash */
  (function panelGlitch() {
    const panels = document.querySelectorAll(".panel");
    const target = panels[Math.floor(_rand(0, panels.length))];
    gsap.timeline()
      .to(target, { opacity: 0.55, scaleX: 1.004, skewX: 0.8, duration: 0.04, ease: "none" })
      .to(target, { opacity: 1, scaleX: 1, skewX: 0, duration: 0.04, ease: "none" })
      .to(target, { opacity: 0.75, duration: 0.03, ease: "none" })
      .to(target, { opacity: 1, duration: 0.06, ease: "none" });
    gsap.delayedCall(_rand(5, 13), panelGlitch);
  })();

  /* Panel border glow cycling */
  (function borderGlow() {
    const panels = document.querySelectorAll(".panel");
    const target = panels[Math.floor(_rand(0, panels.length))];
    gsap.timeline()
      .to(target, {
        boxShadow: "0 0 0 1px rgba(140,213,207,0.55), inset 0 0 22px rgba(140,213,207,0.04)",
        duration: 0.45,
        ease: "power2.out",
      })
      .to(target, { boxShadow: "none", duration: 0.65, ease: "power2.in" });
    gsap.delayedCall(_rand(2, 5), borderGlow);
  })();

  /* Resume button glow pulse */
  gsap.to(".resume-btn", {
    boxShadow: "0 0 22px rgba(140,213,207,0.5), inset 0 0 12px rgba(140,213,207,0.07)",
    repeat: -1,
    yoyo: true,
    duration: 2.1,
    ease: "sine.inOut",
  });

  /* Panel-title bracket shimmer */
  gsap.to(".panel-title-bracket", {
    color: "rgba(140,213,207,0.9)",
    stagger: { each: 0.4, repeat: -1, yoyo: true },
    duration: 1.5,
    ease: "sine.inOut",
  });

  /* Name glow intensity pulse */
  gsap.to(".glow", {
    textShadow: "0 0 28px rgba(140,213,207,1), 0 0 55px rgba(140,213,207,0.6)",
    repeat: -1,
    yoyo: true,
    duration: 2.4,
    ease: "sine.inOut",
  });

  /* Contact icon opacity wave */
  gsap.to(".contact-link .material-icons", {
    opacity: 1,
    stagger: { each: 0.35, repeat: -1, yoyo: true },
    duration: 1.2,
    ease: "sine.inOut",
  });

  /* Scanline drift */
  gsap.to(".scanlines", {
    opacity: 0.7,
    repeat: -1,
    yoyo: true,
    duration: 3.5,
    ease: "sine.inOut",
  });
}

/* ═══════════════════════════════════════════════════════════ *\
   4. INTERACTION ANIMATIONS
\* ═══════════════════════════════════════════════════════════ */
function initInteractions() {
  /* Panel hover lift & glow */
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.addEventListener("mouseenter", () => {
      gsap.to(panel, {
        y: -3,
        boxShadow: "0 6px 30px rgba(140,213,207,0.12), 0 0 0 1px rgba(140,213,207,0.35)",
        duration: 0.28,
        ease: "power2.out",
      });
    });
    panel.addEventListener("mouseleave", () => {
      gsap.to(panel, { y: 0, boxShadow: "none", duration: 0.38, ease: "power2.inOut" });
    });
  });

  /* Badge hover bounce */
  document.querySelectorAll(".badge").forEach((badge) => {
    badge.addEventListener("mouseenter", () => {
      gsap.to(badge, { scale: 1.13, duration: 0.2, ease: "back.out(3.5)" });
    });
    badge.addEventListener("mouseleave", () => {
      gsap.to(badge, { scale: 1, duration: 0.28, ease: "power2.out" });
    });
  });

  /* Tech list hover nudge */
  applyTechListHover();

  /* Magnetic contact links */
  document.querySelectorAll(".contact-list li").forEach((li) => {
    const link = li.querySelector(".contact-link");
    li.addEventListener("mousemove", (e) => {
      const r = link.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.3;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
      gsap.to(link, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
    });
    li.addEventListener("mouseleave", () => {
      gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
    });
    link.addEventListener("click", () => {
      const icon = link.querySelector(".material-icons");
      if (icon) {
        gsap.timeline()
          .to(icon, { rotation: 360, scale: 1.4, duration: 0.4, ease: "back.out(2)" })
          .to(icon, { rotation: 360, scale: 1, duration: 0.25, ease: "power2.out" });
      }
    });
  });

  /* Resume button */
  const resumeBtn = document.querySelector(".resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("mouseenter", () => {
      gsap.to(resumeBtn, { scale: 1.06, duration: 0.22, ease: "back.out(2.8)" });
    });
    resumeBtn.addEventListener("mouseleave", () => {
      gsap.to(resumeBtn, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
    resumeBtn.addEventListener("click", (e) => {
      _sparks(e.clientX, e.clientY, 16);
      gsap.timeline()
        .to(resumeBtn, { scale: 0.92, duration: 0.1 })
        .to(resumeBtn, { scale: 1, duration: 0.45, ease: "elastic.out(1.5, 0.5)" });
    });
  }

  /* Panda click spin + sparks */
  const panda = document.querySelector(".panda-coding");
  if (panda) {
    panda.style.cursor = "pointer";
    panda.addEventListener("click", (e) => {
      _sparks(e.clientX, e.clientY, 20);
      gsap.timeline()
        .to(panda, { rotation: 360, scale: 1.15, duration: 0.65, ease: "back.out(1.7)" })
        .to(panda, { scale: 1, duration: 0.35, ease: "power2.out" }, "-=0.1")
        .set(panda, { rotation: 0 });
    });
  }

  /* Tab button hover pulse */
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (!btn.classList.contains("active")) {
        gsap.to(btn, { scale: 1.06, duration: 0.18, ease: "back.out(3)" });
      }
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.22, ease: "power2.out" });
    });
  });

  /* Project link button hover */
  document.body.addEventListener("mouseover", (e) => {
    const btn = e.target.closest(".project-link-btn");
    if (btn) gsap.to(btn, { scale: 1.06, duration: 0.18, ease: "back.out(3)" });
  });
  document.body.addEventListener("mouseout", (e) => {
    const btn = e.target.closest(".project-link-btn");
    if (btn) gsap.to(btn, { scale: 1, duration: 0.22, ease: "power2.out" });
  });
}

/* ─── Re-applies after tab switches ─── */
function applyTechListHover() {
  document.querySelectorAll(".tech-list li").forEach((li) => {
    if (li._gsapHover) return;
    li._gsapHover = true;
    li.addEventListener("mouseenter", () =>
      gsap.to(li, { x: 6, duration: 0.15, ease: "power2.out" })
    );
    li.addEventListener("mouseleave", () =>
      gsap.to(li, { x: 0, duration: 0.2, ease: "power2.inOut" })
    );
  });
}

/* ═══════════════════════════════════════════════════════════ *\
   5. TAB SWITCH  (called from script.js)
\* ═══════════════════════════════════════════════════════════ */
function animateTabSwitch(oldPanel, newPanel) {
  gsap.timeline()
    .to(oldPanel, {
      opacity: 0,
      x: -16,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        oldPanel.classList.remove("active");
        gsap.set(oldPanel, { opacity: 1, x: 0 });
        newPanel.classList.add("active");
        gsap.set(newPanel, { opacity: 0, x: 16 });
      },
    })
    .to(newPanel, { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" })
    .fromTo(
      newPanel.querySelectorAll("li"),
      { opacity: 0, x: 10, y: 4 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.05,
        duration: 0.22,
        ease: "power2.out",
        onComplete: applyTechListHover,
      },
      "-=0.1"
    );
}

/* ═══════════════════════════════════════════════════════════ *\
   6. DETAIL PANE  (called from renderProject / renderAbout)
\* ═══════════════════════════════════════════════════════════ */
function animateDetailIn(pane) {
  const kids = Array.from(pane.children);
  if (!kids.length) return;
  gsap.fromTo(
    kids,
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, stagger: 0.09, duration: 0.32, ease: "power2.out" }
  );
}

/* ═══════════════════════════════════════════════════════════ *\
   7. NAV ITEM FLASH  (called from selectProject / selectAbout)
\* ═══════════════════════════════════════════════════════════ */
function flashNavItem(el) {
  gsap.timeline()
    .to(el, { backgroundColor: "rgba(140,213,207,0.42)", duration: 0.07, ease: "none" })
    .to(el, { backgroundColor: "rgba(140,213,207,0.18)", duration: 0.35, ease: "power2.out" });
}

/* ═══════════════════════════════════════════════════════════ *\
   8. PANEL TITLE SCAN on hover
\* ═══════════════════════════════════════════════════════════ */
function initPanelTitleScans() {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.addEventListener("mouseenter", () => _scanPanel(panel));
  });
}
