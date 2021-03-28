let globe = {
  canScroll: false,
  toJump: 97,
  toNext: 99,
  toUnseen: 100,
  toSeen: 0,
  toScrollNext: 90,
};
let adeline = {
  imageUrls: [
    "http://localhost:3000/adeline/img01.jpg",
    "http://localhost:3000/adeline/img02.jpg",
    "http://localhost:3000/adeline/img03.jpg",
    "http://localhost:3000/adeline/img04.jpg",
    "http://localhost:3000/adeline/img05.jpg",
    "http://localhost:3000/adeline/img06.jpg",
  ],
  images: [],
  loadCount: 0,
  loaded: false,
  currentImageIndex: 0,
};

animotions = {
  toJump: new Animotion("transform", globe.toJump.toString() + "%", 500, "cubic-bezier(0.33, 1, 0.68, 1)"),
  toNext: new Animotion("transform", globe.toNext.toString() + "%", 300, "cubic-bezier(0.33, 1, 0.68, 1)"),
  toUnseen: new Animotion("transform", globe.toUnseen.toString() + "%", 500, "cubic-bezier(0.33, 1, 0.68, 1)"),
  toSeen: new Animotion("transform", globe.toSeen.toString() + "%", 300, "cubic-bezier(0.33, 1, 0.68, 1)"),
};

// Called to set global variables of the window and body so the application can calculate location of objects
// Called during initial setup and when window is resized.
// Debouncer used when resizing may be triggered too often.
function setView() {
  console.log("reset view");
  globe.bodyWidth = document.body.clientWidth;
  globe.bodyHeight = document.body.clientHeight;
  globe.screenWidth = window.innerWidth;
  globe.screenHeight = window.innerHeight;

  // set the width/height of the image_container
  document.getElementById("image-container").style.width = globe.bodyWidth + "px";
  document.getElementById("image-container").style.height = globe.screenHeight + "px";

  // set div height equal to double screen window height
  document.getElementById("double-blank").style.height = globe.screenHeight * 2 + "px";
}
const setViewD = debouncer(() => setView(), 300);

// Creates all images set in the adeline.imageUrls array and sets URL
// Sets each image onload with checkLoad function to be run after each image loads
function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    adeline.images[i] = document.createElement("img");
    adeline.images[i].classList.add("photo-image", "hide");
    adeline.images[i].onload = checkLoad;
    adeline.images[i].src = preloadImages.arguments[i];
  }
}

async function checkLoad() {
  adeline.loadCount++;
  console.log("loadCount: " + adeline.loadCount);
  if (adeline.loadCount === adeline.images.length) {
    // run function to setup image location
    adeline.loaded = true;
    await insertImageElements();
    document.getElementById("spinner-container").style.display = "none";
    window.addEventListener("scroll", handleScroll);
  }
}

async function insertImageElements() {
  // images will be created and injected into the DOM here
  let imageContainer = document.getElementById("image-container");
  adeline.images.forEach((image) => {
    imageContainer.appendChild(image);
  });
  setImageLocation();
  await sleep(600);
  await popNextImage(adeline.images[adeline.currentImageIndex + 1]);
}

function setImageLocation() {
  // images will be set to the location
  // should be called during initial setup and when window is resized
  adeline.images.forEach((image, index) => {
    console.log("index: " + index);
    if (index > adeline.currentImageIndex) {
      image.style.transform = animotions.toUnseen.getTranslateY();
      // image.style.transform = imageTransformState.unseen;
    } else if (index < adeline.currentImageIndex) {
      // image.style.transform = imageTransformState.seen;
      image.style.transform = animotions.toSeen.getTranslateY();
    }
    image.classList.remove("hide");
  });
  console.log("setImageLocation finish");
}

function handleScroll() {
  if (globe.canScroll === true) {
    let scrollRatio = (globe.screenHeight - window.scrollY * 0.5) / globe.screenHeight;
    let translateAmount = (scrollRatio * globe.toNext).toString();
    adeline.images[adeline.currentImageIndex + 1].style.transform = "translateY(" + translateAmount + "%)";
    checkNextScrollD();
  }
}

async function popNextImage(image) {
  console.log("popNextImage start");
  await animotions.toJump.run(image);
  await sleep(120);
  // image.classList.add("photo-image_next");
  // image.classList.remove("photo-image_next-jump");
  await animotions.toNext.run(image);
  window.scrollTo(0, 0);
  globe.canScroll = true;
}

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

// WIP
async function checkNextScroll() {
  globe.canScroll = false;
  const nextImage = adeline.images[adeline.currentImageIndex + 1];

  // get the transform style percentage value for comparison
  const nextImageTransformText = nextImage.style.transform;
  console.log("transform style: " + nextImageTransformText);
  let start_pos = nextImageTransformText.indexOf("(") + 1;
  let end_pos = nextImageTransformText.indexOf("%");
  let percentTranslate = nextImageTransformText.substring(start_pos, end_pos);
  console.log("translate percentage: " + percentTranslate);

  if ((percentTranslate < globe.toScrollNext)) {
    console.log("moving");
    adeline.currentImageIndex += 1;
    animotions.toSeen.run(nextImage);
    await animotions.toJump.run(adeline.images[adeline.currentImageIndex + 1]);
    await animotions.toNext.run(adeline.images[adeline.currentImageIndex + 1]);
  } 
  else {
    await animotions.toNext.run(nextImage);
  }
  window.scrollTo(0, 0);
  globe.canScroll = true;
}
const checkNextScrollD = debouncer(() => checkNextScroll(), 300);

function showNextImage() {
  // disable scrolling by setting globe.canScroll to false
  // move next image up, increment the next image counter
  // pop the new next image with function call of popNextImage()
}

// // calls during DOM
// window.addEventListener("DOMContentLoaded", (event) => {
//   console.log("DOMContentLoaded event");

//   // display loader

// });

window.addEventListener("load", (event) => {
  console.log("load event");

  // Set view/window
  setView();
  window.addEventListener("resize", () => {
    setViewD();
  });

  // set the width/height of the image_container
  const imageContainer = document.getElementById("image-container");
  imageContainer.style.width = globe.bodyWidth + "px";
  imageContainer.style.height = globe.screenHeight + "px";

  // set div height equal to triple screen window height
  document.getElementById("double-blank").style.height = globe.screenHeight * 2 + "px";

  // LAST - clear the loader
  // document.getElementById("spinner-container").style.display = "none";
  preloadImages(...adeline.imageUrls);
});
