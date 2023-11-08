// Contact form javascript
document.addEventListener("DOMContentLoaded", function (e) {
  var elems = document.querySelector("#modal2");
  var instance = M.Modal.init(elems);
});

// Messy Panda javascript
document.addEventListener("DOMContentLoaded", function (e) {
  var elems = document.querySelector("#modal1");
  var instance = M.Modal.init(elems);
  instance.open();
});

// TODO- Scroll event listener for future development
// window.addEventListener(
//   "scroll",
//   () => {
//     document.body.style.setProperty(
//       "--scroll",
//       window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
//     );
//   },
//   false
// );

// Close button javascript
// window.onload = function () {
//   document.getElementById("frameworks-close-btn").onclick = function () {
//     this.parentNode.parentNode.remove();
//     return false;
//   };
// };

// Tab Javascript
// Technology tabs
let tabsContainer = document.querySelector("#tab-container");
let options = { swipeable: true };
var instance = M.Tabs.init(tabsContainer, options);
var instance = M.Tabs.getInstance(this);

// Work tabs
let worktabsContainer = document.querySelector("#work-tabs");
var instance = M.Tabs.init(worktabsContainer, options);
var instance = M.Tabs.getInstance(this);

// On-click display for technologies
// function showTech1() {
//   let tech1Container = document.querySelector("#tech1");
//   console.log(tech1Container);
//   tech1Container.classList.remove("hidden");
//   console.log(tech1Container);
// }

// Work if/else render
