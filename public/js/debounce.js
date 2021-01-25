// Source:
// https://www.freecodecamp.org/news/javascript-debounce-example/

// -EXAMPLE USAGE-
// function saveInput(){
//   console.log('Saving data');
// }
//
// const processChange = debounce(() => saveInput());
//
// window.addEventListener("scroll", processChange);

function debouncer(func, wait = 300) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

function throttler(func, timeout = 300){
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}