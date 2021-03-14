class Animotion {
  constructor(cssAttr, toVal, duration, easing) {
    this.cssAttr = cssAttr;
    this.toVal = toVal;
    this.duration = duration;
    this.easing = easing;
  }
  
  async run(element) {
    element.style.transition = this.duration + "ms" + " " + this.easing;
    // element.classList.add(this.toClass);
    element.style.transform = "translateY(" + this.toVal + ")";
    // console.log(element.classList);
    // element.classList.remove(this.fromClass);
    await sleep(this.duration);
    element.style.transition = "";
  }
  
  sleep(duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }

  getTranslateY() {
    return "translateY(" + this.toVal + ")"; 
  }
};