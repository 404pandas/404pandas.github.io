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

// Close button javascript
window.onload = function () {
  document.getElementById("frameworks-close-btn").onclick = function () {
    this.parentNode.parentNode.remove();
    return false;
  };
};

// Messy Panda javascript
document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  var Modalelem = document.querySelector(".modal");
  var instance = M.Modal.init(Modalelem);
  instance.open();
});

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
