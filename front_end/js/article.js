const root = document.querySelector(":root");
const main = document.querySelector("main");
const imgs = document.querySelector("article").querySelectorAll("img");
const button = document.querySelector("#open_or_close");
const form = document.querySelector("#hide_me");

window.addEventListener("resize", () => {
  const zoomedImg = main.getElementsByClassName("img-zoom");
  sett_css_var__img_possitions_left_and_top(zoomedImg);
})
const sett_css_var__img_possitions_left_and_top = (img) => {
  const imgWidth = `${parseInt(getComputedStyle(img).getPropertyValue("width"))}`;
  const imgHeight = `${parseInt(getComputedStyle(img).getPropertyValue("height"))}`;
  root.style.setProperty("--zoom-img-left", `${(window.innerWidth / 2) - (imgWidth / 2)}px`);
  root.style.setProperty("--zoom-img-top", `${(window.innerHeight / 2) - (imgHeight / 2)}px`)
}

imgs.forEach((img) => {
  img.onclick = (evt) => {
    let currentlyClosed = false;
    if (!evt.target.classList.contains("img-zoom")) {
      currentlyClosed = true;
    }

    imgs.forEach(i => i.classList.remove(("img-zoom")));
    if (currentlyClosed) {
      evt.target.classList.add("img-zoom");
    }

    sett_css_var__img_possitions_left_and_top(evt.target);
  }
})

if(button && form) {
  button.addEventListener("click", () => {
    form.toggleAttribute("hidden");
  });
}


