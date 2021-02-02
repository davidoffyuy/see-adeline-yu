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
  loadCount: 0,
  loaded: false
};

function checkLoad() {
  adeline.loadCount++;
  console.log("loadCount: " + adeline.loadCount);
  if (adeline.loadCount === adeline.images.length) {
    // run function to setup image location
    adeline.loaded = true;
    createImageElements();
    document.getElementById("spinner-container").style.display = "none";
  };
}

function preloadImages() {
    for (var i = 0; i < arguments.length; i++) {
        adeline.images[i] = document.createElement('img');
        adeline.images[i].onload = checkLoad;
        adeline.images[i].src = preloadImages.arguments[i];
        adeline.images[i].classList.add("photo-image", "hide");
    }
}

function createImageElements() {
  // images will be created and injected into the DOM here
  let imageContainer = document.getElementById("image-container");
  adeline.images.forEach(image => {
    imageContainer.appendChild(image);
  });
  setImageLocation();
}

function setImageLocation() {
  // images will be set to the location
  // should be called during initial setup and when window is resized
  adeline.images.forEach(image => {
    image.classList.remove("hide");
  });
}

function setView() {
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
const setViewD = debouncer(() => setView(), 300);

// calls during DOM but
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOMContentLoaded event");
  
  // display loader
  
});

window.addEventListener("load", (event) => {
  console.log("load event");

  // Set view/window
  setView();
  window.addEventListener("resize", () => {
    setViewD();
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