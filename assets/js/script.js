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
window.onload = function () {
  document.getElementById("frameworks-close-btn").onclick = function () {
    this.parentNode.parentNode.remove();
    return false;
  };
};

// Tab Javascript
let el = document.querySelector(".tabs");
let options = { swipeable: true };
var instance = M.Tabs.init(el, options);
var instance = M.Tabs.getInstance(elem);

// On-click display for technologies
function showTech1() {
  let tech1Container = document.querySelector("#tech1");
  console.log(tech1Container);
  tech1Container.classList.remove("hidden");
  console.log(tech1Container);
}

// Work if/else render
const allWork = document.querySelectorAll(".workInactive");

allWork.forEach((work) => work.addEventListener("click", toggleActiveWork));

function toggleActiveWork(e) {
  works.forEach((work) => {
    work.classList.remove("workActive");
  });
  e.currentTarget.classList.toggle("workActive");
}
