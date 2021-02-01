let gv = {};
let adeline = {
  imageUrls: [
    "http://localhost:3000/adeline/img01.jpg",
    "http://localhost:3000/adeline/img02.jpg",
    "http://localhost:3000/adeline/img03.jpg",
    "http://localhost:3000/adeline/img04.jpg",
    "http://localhost:3000/adeline/img05.jpg",
    "http://localhost:3000/adeline/img06.jpg"
  ],
  images: [],
  loadCount: 0
};

function checkLoad() {
  adeline.loadCount++;
  console.log("loadCount: " + adeline.loadCount);
  if (adeline.loadCount === adeline.images.length) {
    // run function to setup image location
    document.getElementById("spinner-container").style.display = "none";
  };
}

function preloadImages() {
    for (var i = 0; i < arguments.length; i++) {
        adeline.images[i] = new Image();
        adeline.images[i].onload = checkLoad;
        adeline.images[i].src = preloadImages.arguments[i];
    }
}

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
  
  // display loader
  
});

window.addEventListener("load", (event) => {
  console.log("load event");

  // Set view/window
  resetView();
  window.addEventListener("resize", () => {
    resetViewD();
  });

  // set the width/height of the image_container
  const imageContainer = document.getElementById("image-container");
  imageContainer.style.width = gv.bodyWidth + "px";
  imageContainer.style.height = gv.screenHeight + "px";

  // set div height equal to triple screen window height
  document.getElementById("double-blank").style.height = gv.screenHeight * 2 + "px";

  // LAST - clear the loader
  // document.getElementById("spinner-container").style.display = "none";
  preloadImages(...adeline.imageUrls);
});