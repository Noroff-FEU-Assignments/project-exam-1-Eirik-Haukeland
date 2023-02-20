const root = document.querySelector(":root");
const header = document.querySelector("header")
const menuBtn = document.querySelector("#menu > button");
const menuItmes = document.querySelector("#menu-div");

const sett_css_var__menu_position_top = () => {
  const header_heigth = `${parseInt(getComputedStyle(header).getPropertyValue("height"))}px`;
  root.style.setProperty("--menu-position-top", `${header_heigth}`)
}


menuBtn.onclick = () => {
  menuItmes.toggleAttribute("hidden");
  if (!menuItmes.hasAttribute("hidden")) {
    sett_css_var__menu_position_top();
  } else {
    root.style.setProperty("--menu-position-top", "0px")
  }
}

document.addEventListener("load", (evt) => {
  console.log("loaded")
  if (window.innerWidth < 700 && !menuItmes.hasAttribute("hidden")) {
    sett_css_var__menu_position_top();
    menuItmes.setAttribute("hidden", true);
  }
})
console.log("test")
window.addEventListener("resize", () => {
  if (window.innerWidth < 700 && !menuItmes.hasAttribute("hidden")) {
    menuItmes.setAttribute("hidden", "true");
    sett_css_var__menu_position_top();
  } else if (window.innerWidth >= 700 && menuItmes.hasAttribute("hidden"))
    menuItmes.removeAttribute("hidden");
  }
)