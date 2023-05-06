// Scroll event listener
window.addEventListener(
  "scroll",
  () => {
    document.body.style.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );
  },
  false
);

// Tab Javascript
var instance = M.Tabs.init(el, options);

// On-click display for technologies
// function showTech1() {
//   let tech1 = document.getElementById("tech1");
//   tech1.classList.remove("hidden");
// }

// function showTech2() {
//   let tech2 = document.getElementById("tech2");
//   tech2.classList.remove("hidden");
// }
// function showTech3() {
//   let tech3 = document.getElementById("tech3");
//   tech3.classList.remove("hidden");
// }
// function showTech4() {
//   let tech4 = document.getElementById("tech4");
//   tech4.classList.remove("hidden");
// }
