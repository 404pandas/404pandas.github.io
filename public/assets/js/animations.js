/* ============================================================ *\
*        Mary Elenius Portfolio — GSAP Animations
\* ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ───── Utilities ───── */
const _rand = (min, max) => Math.random() * (max - min) + min;

/* Pause GSAP ticker when tab is hidden */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    gsap.ticker.sleep();
  } else {
    gsap.ticker.wake();
  }
});

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

/* ─── Spark burst ─── */
function _sparks(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.className = "spark";
    document.body.appendChild(dot);
    const angle = (i / count) * Math.PI * 2;
    const dist = _rand(30, 70);
    gsap.set(dot, { x, y, xPercent: -50, yPercent: -50 });
    gsap.to(dot, {
      x: x + Math.cos(angle) * dist,
      y: y + Math.sin(angle) * dist,
      opacity: 0,
      scale: _rand(0.4, 1.1),
      duration: _rand(0.4, 0.7),
      ease: "power2.out",
      overwrite: true,
      onComplete: () => dot.remove(),
    });
  }
}

/* ─── Panel scan sweep (one-shot, self-removes) ─── */
function _scanPanel(panel, delay = 0) {
  const line = document.createElement("div");
  line.className = "panel-scan";
  panel.appendChild(line);
  gsap.fromTo(line,
    { top: "0%", opacity: 1 },
    {
      top: "100%", opacity: 0, duration: 0.55, delay,
      ease: "power1.in",
      onComplete: () => line.remove(),
    }
  );
}

/* ═══════════════════════════════════════════════════════════ *\
   1. BOOT SEQUENCE
\* ═══════════════════════════════════════════════════════════ */
function initPageLoad() {
  document.body.classList.remove("js-loading");

  gsap.set(".panel", { y: 60, opacity: 0, scale: 0.94 });
  gsap.set(".panel-title", { opacity: 0, x: -10 });
  gsap.set(".sidebar", { x: -300, opacity: 0 });
  gsap.set(".panda-coding", { scale: 0, opacity: 0, transformOrigin: "center bottom" });
  gsap.set([".textEffect", ".glow"], { opacity: 0 });
  gsap.set(".sidebar-role", { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.1 });

  tl.to(".sidebar", { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" });

  tl.to(".panda-coding",
    { scale: 1, opacity: 1, duration: 0.75, ease: "back.out(2)" },
    "-=0.35"
  );

  tl.to([".textEffect", ".glow"],
    { opacity: 1, duration: 0.5, ease: "power2.out" },
    "-=0.3"
  );

  tl.add(() => {
    const roleEl = document.querySelector(".sidebar-role");
    if (!roleEl) return;
    const text = roleEl.dataset.text || roleEl.textContent.trim();
    roleEl.dataset.text = text;
    gsap.set(roleEl, { opacity: 1 });
    _typewrite(roleEl, text, 900, () => {
      const cur = document.createElement("span");
      cur.className = "type-cursor";
      roleEl.appendChild(cur);
      gsap.to(cur, { opacity: 0, repeat: -1, yoyo: true, duration: 0.55, ease: "steps(1)" });
    });
  }, "-=0.1");

  /* Panda float starts after boot */
  tl.add(() => {
    gsap.to(".panda-coding", {
      y: -10, repeat: -1, yoyo: true, duration: 2.9, ease: "sine.inOut",
    });
  });
}

/* ═══════════════════════════════════════════════════════════ *\
   2. SCROLL-TRIGGERED PANEL ANIMATIONS
\* ═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  document.querySelectorAll(".panel").forEach((panel) => {
    const title = panel.querySelector(".panel-title");
    const id = panel.id;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: panel, start: "top 88%", once: true },
    });

    tl.to(panel, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" });
    tl.add(() => _scanPanel(panel), "-=0.3");

    if (title) {
      tl.to(title, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, "-=0.3");
    }

    if (id === "technologies") {
      tl.fromTo(".tab-btn",
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.25, ease: "power2.out" },
        "-=0.2"
      );
      tl.fromTo("#languages li",
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.22, ease: "power2.out", onComplete: applyTechListHover },
        "-=0.1"
      );
    }

    if (id === "about-me") {
      tl.fromTo(".badge",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.07, duration: 0.35, ease: "back.out(2.5)" },
        "-=0.25"
      );
      tl.fromTo("#about-nav-list li",
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, stagger: 0.06, duration: 0.22, ease: "power2.out" },
        "-=0.2"
      );
      tl.fromTo("#about-detail > *",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.28, ease: "power2.out" },
        "-=0.1"
      );
    }

    if (id === "work") {
      tl.fromTo("#project-nav-list li",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.03, duration: 0.18, ease: "power2.out" },
        "-=0.25"
      );
      tl.fromTo("#project-detail > *",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.25, ease: "power2.out" },
        "-=0.15"
      );
    }

    if (id === "contact") {
      tl.fromTo(".contact-list li",
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" },
        "-=0.25"
      );
      tl.fromTo(".resume-btn",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.7)" },
        "-=0.1"
      );
    }
  });
}

/* ═══════════════════════════════════════════════════════════ *\
   3. INTERACTIONS
   Critical: every repeated-trigger tween uses overwrite:"auto"
   so stale tweens are killed before starting a new one.
\* ═══════════════════════════════════════════════════════════ */
function initInteractions() {
  /* Panel hover lift */
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.addEventListener("mouseenter", () =>
      gsap.to(panel, { y: -3, duration: 0.25, ease: "power2.out", overwrite: "auto" })
    );
    panel.addEventListener("mouseleave", () =>
      gsap.to(panel, { y: 0, duration: 0.35, ease: "power2.inOut", overwrite: "auto" })
    );
  });

  /* Badge hover */
  document.querySelectorAll(".badge").forEach((badge) => {
    badge.addEventListener("mouseenter", () =>
      gsap.to(badge, { scale: 1.12, duration: 0.2, ease: "back.out(3)", overwrite: "auto" })
    );
    badge.addEventListener("mouseleave", () =>
      gsap.to(badge, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" })
    );
  });

  applyTechListHover();

  /* Magnetic contact links
     getBoundingClientRect() is cached on mouseenter — NOT called on every mousemove */
  document.querySelectorAll(".contact-list li").forEach((li) => {
    const link = li.querySelector(".contact-link");
    let rect = null;

    li.addEventListener("mouseenter", () => {
      rect = link.getBoundingClientRect(); // cache once per hover
    });
    li.addEventListener("mousemove", (e) => {
      if (!rect) return;
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
      gsap.to(link, { x: dx, y: dy, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    });
    li.addEventListener("mouseleave", () => {
      rect = null;
      gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
    });

    link.addEventListener("click", () => {
      const icon = link.querySelector(".material-icons");
      if (icon) {
        gsap.fromTo(icon,
          { rotation: 0, scale: 1 },
          { rotation: 360, scale: 1.4, duration: 0.35, ease: "back.out(2)", overwrite: true,
            onComplete: () => gsap.set(icon, { scale: 1, rotation: 0 }) }
        );
      }
    });
  });

  /* Resume button */
  const resumeBtn = document.querySelector(".resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("mouseenter", () =>
      gsap.to(resumeBtn, { scale: 1.05, duration: 0.2, ease: "back.out(2.5)", overwrite: "auto" })
    );
    resumeBtn.addEventListener("mouseleave", () =>
      gsap.to(resumeBtn, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" })
    );
    resumeBtn.addEventListener("click", (e) => {
      _sparks(e.clientX, e.clientY, 10);
      gsap.timeline({ overwrite: true })
        .to(resumeBtn, { scale: 0.93, duration: 0.1 })
        .to(resumeBtn, { scale: 1, duration: 0.4, ease: "elastic.out(1.2, 0.5)" });
    });
  }

  /* Panda click */
  const panda = document.querySelector(".panda-coding");
  if (panda) {
    panda.style.cursor = "pointer";
    panda.addEventListener("click", (e) => {
      _sparks(e.clientX, e.clientY, 14);
      gsap.to(panda, {
        rotation: "+=360", scale: 1.12, duration: 0.6, ease: "back.out(1.5)",
        overwrite: "auto",
        onComplete: () => gsap.to(panda, { scale: 1, duration: 0.3, ease: "power2.out" }),
      });
    });
  }

  /* Tab button hover */
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (!btn.classList.contains("active"))
        gsap.to(btn, { scale: 1.05, duration: 0.15, ease: "back.out(3)", overwrite: "auto" });
    });
    btn.addEventListener("mouseleave", () =>
      gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" })
    );
  });
}

/* ─── Re-applies after tab switches ─── */
function applyTechListHover() {
  document.querySelectorAll(".tech-list li").forEach((li) => {
    if (li._gsapHover) return;
    li._gsapHover = true;
    li.addEventListener("mouseenter", () =>
      gsap.to(li, { x: 5, duration: 0.15, ease: "power2.out", overwrite: "auto" })
    );
    li.addEventListener("mouseleave", () =>
      gsap.to(li, { x: 0, duration: 0.2, ease: "power2.inOut", overwrite: "auto" })
    );
  });
}

/* ═══════════════════════════════════════════════════════════ *\
   4. TAB SWITCH
\* ═══════════════════════════════════════════════════════════ */
function animateTabSwitch(oldPanel, newPanel) {
  gsap.timeline()
    .to(oldPanel, {
      opacity: 0, x: -14, duration: 0.14, ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        oldPanel.classList.remove("active");
        gsap.set(oldPanel, { opacity: 1, x: 0 });
        newPanel.classList.add("active");
        gsap.set(newPanel, { opacity: 0, x: 14 });
      },
    })
    .to(newPanel, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" })
    .fromTo(newPanel.querySelectorAll("li"),
      { opacity: 0, x: 8 },
      { opacity: 1, x: 0, stagger: 0.04, duration: 0.2, ease: "power2.out", onComplete: applyTechListHover },
      "-=0.1"
    );
}

/* ═══════════════════════════════════════════════════════════ *\
   5. DETAIL PANE
\* ═══════════════════════════════════════════════════════════ */
function animateDetailIn(pane) {
  const kids = Array.from(pane.children);
  if (!kids.length) return;
  gsap.fromTo(kids,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.28, ease: "power2.out", overwrite: "auto" }
  );
}

/* ═══════════════════════════════════════════════════════════ *\
   6. NAV ITEM FLASH
\* ═══════════════════════════════════════════════════════════ */
function flashNavItem(el) {
  gsap.fromTo(el,
    { opacity: 0.4 },
    { opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" }
  );
}
