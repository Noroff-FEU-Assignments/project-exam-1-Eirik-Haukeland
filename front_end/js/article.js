const button = document.querySelector("#open_or_close");
const form = document.querySelector("#hide_me");

if(button && form) {
  button.addEventListener("click", () => {
    form.toggleAttribute("hidden");
  });
}


