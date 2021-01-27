let gv = {};

let adelineImages = [
  "img01.jpg",
  "img02.jpg",
  "img03.jpg",
  "img04.jpg",
  "img05.jpg",
  "img06.jpg"
];

function resetView() {
  console.log("reset view");
  gv.bodyWidth = document.body.clientWidth;
  gv.bodyHeight = document.body.clientHeight;
  gv.screenWidth = window.innerWidth;
  gv.screenHeight = window.innerHeight;

  // set the width/height of the image_container
  document.getElementById("image-container").style.width = gv.bodyWidth + "px";
  document.getElementById("image-container").style.height = gv.screenHeight + "px";

  // set div height equal to double screen window height
  document.getElementById("double-blank").style.height = gv.screenHeight * 2 + "px";
}
const resetViewD = debouncer(() => resetView(), 300);

// calls during DOM but
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOMContentLoaded event");
  // load images
});

window.addEventListener("load", (event) => {
  console.log("load event");

  // Set view/window
  resetView();
  window.addEventListener("resize", () => {
    resetViewD();
  });

  // set the width/height of the image_container
  document.getElementById("image-container").style.width = gv.bodyWidth + "px";
  document.getElementById("image-container").style.height = gv.screenHeight + "px";

  // set div height equal to triple screen window height
  document.getElementById("double-blank").style.height = gv.screenHeight * 2 + "px";
});