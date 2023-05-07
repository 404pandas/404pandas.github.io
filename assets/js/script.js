// TODO- Scroll event listener for future development
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

// Messy Panda javascript
document.addEventListener("DOMContentLoaded", function () {
  var Modalelem = document.querySelector(".modal");
  var instance = M.Modal.init(Modalelem);
  instance.open();
});

// Tab Javascript
let elem = document.querySelector(".tabs");
let options = { swipeable: true };
var instance = M.Tabs.init(el, options);
var instance = M.Tabs.getInstance(elem);
