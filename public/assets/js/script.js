/* ============================================================ *\
*          Mary Elenius Portfolio — Main Script                 *
\* ============================================================ */

// ===== ABOUT DATA =====
const aboutChapters = [
  {
    title: "Origins",
    content:
      "Born and raised in Sioux Falls, South Dakota, I've always carried a strong instinct to help—especially animals. From a young age, I found myself constantly drawn to care, curiosity, and problem-solving, often turning everyday moments into small rescue missions or opportunities to learn something new.",
  },
  {
    title: "Discovery",
    content:
      "That same instinct eventually led me into technology. What began as simple curiosity quickly grew into a deep passion for building meaningful applications. I became fascinated by how code could solve real-world problems, blending creativity with logic to create experiences that truly help people.",
  },
  {
    title: "The Journey",
    content:
      "The path hasn't always been straight, but every challenge helped shape me into someone adaptable, resilient, and persistent. Navigating both personal and professional growth taught me how to stay focused, continue learning, and embrace the process of becoming better every day.",
  },
  {
    title: "Present Day",
    content:
      "Today, I work as a full-time Senior Software Engineer while also continuing my passion for animal care as a part-time veterinary technician. Outside of coding, you'll usually find me spending time with family, caring for animals, or expanding my skills in React Native and mobile development.",
  },
  {
    title: "Current Focus",
    content:
      "My current focus is building modern, scalable full-stack PERN and MERN applications, with an emphasis on interactive user experiences. I'm especially passionate about crafting interfaces that feel intuitive, engaging, and thoughtfully designed from both a technical and human perspective.",
  },
];

// ===== PROJECT DATA =====
const projects = [
  {
    title: "Who Is...?",
    description:
      "A co-op trivia game about each other built with React and Socket.IO, allowing players to compete in real-time. The game features chat, 2,000+ questions, and a dynamic interface for an engaging experience.",
    github: "https://github.com/404pandas/whois",
    live: "https://drive.google.com/file/d/1iRiSHn7CZXkd19QYGYbj8HZ6o-kqLqZ_/view?usp=drive_link",
  },
  {
    title: "Witcher's Satchel",
    description:
      "A swiss army knife-style mobile app that covers many common utilities needed by a mobile user. Powered by React Native and the creativity of a Witcher.",
    github: "https://github.com/404pandas/Witchers-Satchel",
    live: "https://drive.google.com/file/d/16c5IJsBTo5FVNyRrXGKxgjr_7KCaRjp6/view?usp=sharing",
  },
  {
    title: "Bluey API",
    description:
      "An API for use in developing apps themed around the Bluey TV show. BLUEY™ and character logo™ and © Ludo Studio. Licensed by BBC Studios Distribution Ltd.",
    github: "https://github.com/404pandas/blue-dog-api",
    live: "https://github.com/404pandas/blue-dog-api",
  },
  {
    title: "Cortez Cafe",
    description:
      "A browser-based daily scheduler using Moment.js to manage date and time. This app dynamically updates its interface with HTML and CSS powered by jQuery, allowing users to plan and organize their workday efficiently.",
    github: "https://github.com/404pandas/workday-scheduler",
    live: "https://www.cortezcafe.com/",
  },
  {
    title: "Workday Scheduler",
    description:
      "A browser-based daily scheduler using Moment.js to manage date and time. This app dynamically updates its interface with HTML and CSS powered by jQuery, allowing users to plan and organize their workday efficiently.",
    github: "https://github.com/404pandas/workday-scheduler",
    live: "https://workday-schedule.netlify.app",
  },
  {
    title: "Coding Quiz",
    description:
      "A timed coding quiz application that tests users' knowledge of JavaScript fundamentals. Built with semantic HTML5, CSS, and vanilla JavaScript, the app provides immediate feedback on quiz answers.",
    github: "https://github.com/404pandas/coding-quiz",
    live: "https://web-coder-quiz.netlify.app",
  },
  {
    title: "Jacob Elenius Professional Website",
    description:
      "A personal portfolio website for Jacob Elenius, showcasing professional experience and projects. Built using HTML, CSS, and JavaScript, with custom tent iconography to reflect outdoor and camping interests.",
    github: "https://github.com/404pandas/jacob-elenius",
    live: "https://jacobelenius.netlify.app/",
  },
  {
    title: "Standard Portfolio",
    description:
      "A professional portfolio website developed using jQuery, Materialize, and GSAP for dynamic interactions. Backend functionality is handled by Node.js, while the front end utilizes day.js and various npm packages for an optimized experience.",
    github: "https://github.com/404pandas/404pandas.github.io",
    live: "https://standard-portfolio.onrender.com",
  },
  {
    title: "Burn Book Blog",
    description:
      "A blogging platform built with a full stack environment, utilizing technologies like Handlebars, Sequelize, MySQL, and Materialize for user-friendly interaction. Features user authentication, session management, and real-time updates through Express and Node.js.",
    github: "https://github.com/404pandas/burn-book-blog",
    live: "https://burn-book-blog.onrender.com",
  },
  {
    title: "PWA Kitties",
    description:
      "A progressive web app (PWA) themed around cats, built using Webpack, Babel, and CodeMirror. This text editor application allows users to write and save text offline, with a modern JavaScript framework and responsive design.",
    github: "https://github.com/404pandas/pwa-kitties",
    live: "https://pwa-kitties.onrender.com",
  },
  {
    title: "MERN Stack Project Setup",
    description:
      "A MERN stack project utilizing MongoDB, Express, React, and Node.js. Integrated with Apollo and GraphQL for seamless data fetching and state management. The project is in the prototype stage and will be deployed after MVP completion.",
    github: "https://github.com/404pandas/project-3-setup-guide",
    live: "https://witcher-9efi.onrender.com",
  },
  {
    title: "Jaskier's Journal",
    description:
      "A note-taking web application built leveraging Express and Node.js to create, save, and delete notes. Notes are stored using local database storage, and the project is deployed on Heroku.",
    github: "https://github.com/404pandas/notetaker",
    live: "https://notetaker-irrb.onrender.com",
  },
  {
    title: "Password Generator",
    description:
      "A web-based password generator using JavaScript, HTML, and CSS to create secure, random passwords based on user preferences. Features include customizable password length and the option to include special characters.",
    github: "https://github.com/404pandas/password-generator",
    live: "https://pswrd-gen.netlify.app",
  },
  {
    title: "Pooh Weather Dashboard",
    description:
      "An interactive weather dashboard that utilizes the OpenWeatherMap API to provide real-time weather updates. Built with Day.js, GSAP, jQuery, and Materialize for dynamic front-end experiences. Backend functionality is powered by Node.js and npm.",
    github: "https://github.com/404pandas/pooh-weather-dashboard",
    live: "https://pooh-weather-dashboard.netlify.app",
  },
];

// ===== TECHNOLOGIES TABS =====
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const newPanel = document.getElementById(target);
      const oldPanel = document.querySelector(".tab-panel.active");

      if (!newPanel || newPanel === oldPanel) return;

      // Update ARIA + button states immediately
      tabBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Delegate panel switching to GSAP
      if (typeof animateTabSwitch === "function" && oldPanel) {
        animateTabSwitch(oldPanel, newPanel);
      } else {
        if (oldPanel) oldPanel.classList.remove("active");
        newPanel.classList.add("active");
      }
    });
  });
}

// ===== WORK / PROJECT NAVIGATOR =====
function initProjects() {
  const navList = document.getElementById("project-nav-list");
  const detailPane = document.getElementById("project-detail");

  if (!navList || !detailPane) return;

  projects.forEach((project, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    li.innerHTML = `<span class="project-num">${String(index + 1).padStart(
      2,
      "0"
    )}.</span>${project.title}`;
    if (index === 0) li.classList.add("active");
    li.addEventListener("click", () => selectProject(index));
    navList.appendChild(li);
  });

  renderProject(0);
}

function selectProject(index) {
  const navItems = document.querySelectorAll("#project-nav-list li");
  navItems.forEach((item) => {
    item.classList.remove("active");
    gsap.killTweensOf(item);
    gsap.set(item, { backgroundColor: "" });
  });

  const target = document.querySelector(
    `#project-nav-list li[data-index="${index}"]`
  );
  if (target) {
    target.classList.add("active");
    target.scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (typeof flashNavItem === "function") flashNavItem(target);
  }

  renderProject(index);
}

function renderProject(index) {
  const project = projects[index];
  const detailPane = document.getElementById("project-detail");
  if (!project || !detailPane) return;

  const githubBtn = project.github
    ? `<a href="${project.github}" class="project-link-btn" target="_blank" rel="noopener noreferrer">
         <i class="material-icons" aria-hidden="true">code</i> GitHub Repo
       </a>`
    : "";

  const liveBtn = project.live
    ? `<a href="${project.live}" class="project-link-btn" target="_blank" rel="noopener noreferrer">
         <i class="material-icons" aria-hidden="true">open_in_new</i> Live Site
       </a>`
    : "";

  detailPane.innerHTML = `
    <h3 class="project-name">${project.title}</h3>
    <p class="project-description">${project.description}</p>
    <div class="project-links">${githubBtn}${liveBtn}</div>
  `;

  if (typeof animateDetailIn === "function") animateDetailIn(detailPane);
}

// ===== ABOUT NAVIGATOR =====
function initAbout() {
  const navList = document.getElementById("about-nav-list");
  const detailPane = document.getElementById("about-detail");

  if (!navList || !detailPane) return;

  aboutChapters.forEach((chapter, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    li.textContent = chapter.title;
    if (index === 0) li.classList.add("active");
    li.addEventListener("click", () => selectAbout(index));
    navList.appendChild(li);
  });

  renderAbout(0);
}

function selectAbout(index) {
  const navItems = document.querySelectorAll("#about-nav-list li");
  navItems.forEach((item) => {
    item.classList.remove("active");
    gsap.killTweensOf(item);
    gsap.set(item, { backgroundColor: "" });
  });

  const target = document.querySelector(
    `#about-nav-list li[data-index="${index}"]`
  );
  if (target) {
    target.classList.add("active");
    if (typeof flashNavItem === "function") flashNavItem(target);
  }

  renderAbout(index);
}

function renderAbout(index) {
  const chapter = aboutChapters[index];
  const detailPane = document.getElementById("about-detail");
  if (!chapter || !detailPane) return;

  detailPane.innerHTML = `
    <h3 class="about-chapter-title">${chapter.title}</h3>
    <p class="about-chapter-content">${chapter.content}</p>
  `;

  if (typeof animateDetailIn === "function") animateDetailIn(detailPane);
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initAbout();
  initProjects();

  if (typeof initPageLoad === "function") initPageLoad();
  if (typeof initScrollAnimations === "function") initScrollAnimations();
  if (typeof initAmbient === "function") initAmbient();
  if (typeof initInteractions === "function") initInteractions();
});
