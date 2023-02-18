const button = document.querySelector("#open_or_close");
const form = document.querySelector("#hide_me");

button.addEventListener("click", () => {
  form.toggleAttribute("hidden");
});
