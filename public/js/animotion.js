class Animotion {
  constructor(fromClass, toClass, duration, easing) {
    this.fromClass = fromClass;
    this.toClass = toClass;
    this.duration = duration;
    this.easing = easing;
  }
  
  async run(element) {
    element.style.transition = this.duration + "ms" + " " + this.easing;
    element.classList.add(this.toClass);
    console.log(element.classList);
    element.classList.remove(this.fromClass);
    await sleep(this.duration);
    // element.style.transition = "";
  }
  
  sleep(duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }
};