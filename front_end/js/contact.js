const button = document.querySelector("#open_or_close");
const form = document.querySelector("#hide_me");
const textLabel = document.querySelector('label[for="name-field"]')
const textField = document.getElementById("name-field");
const emailLabel = document.querySelector('label[for="email-field"]')
const emailField = document.getElementById("email-field");
const subjectLabel = document.querySelector('label[for="subject-field"]')
const subjectField = document.getElementById("subject-field");
const messageLabel = document.querySelector('label[for="message-field"]')
const messageField = document.getElementById("message-field");
const submitBtn = document.querySelector("#hide_me > button.btn")
const emailTest = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/;

button.addEventListener("click", () => {
  form.toggleAttribute("hidden");
});

textField.addEventListener("focusout", () => {
  if (!textLabel.classList.contains("form-error") && !(textField.value.length > 5)) {
    textLabel.classList.add("form-error");
    textField.classList.add("form-error");
    textLabel.innerHTML += `<span id="text-error">please give us you full name</span>`;
    if (submitBtn.disabled === false) {
      submitBtn.disabled = true;
    }
  }
})

textField.addEventListener("keyup", () => {
  if (textLabel.classList.contains("form-error") && textField.value.length > 5) {
    textLabel.classList.remove("form-error");
    textField.classList.remove("form-error");
    textLabel.querySelector("#text-error").remove();
    if (!(textField.value.length > 5) && !(emailTest.test(emailField.value)) && !(subjectField.value.length > 15) && !(messageField.value.length > 25)) {
      submitBtn.disabled = false;
    }
  }
})


emailField.addEventListener("focusout", () => {
  if (!emailLabel.classList.contains("form-error") && !(emailTest.test(emailField.value))) {
    emailLabel.classList.add("form-error");
    emailField.classList.add("form-error");
    emailLabel.innerHTML += `<span id="email-error">please give us you a vaild email</span>`;
    if (submitBtn.disabled === false) {
      submitBtn.disabled = true;
    }
  }
})

emailField.addEventListener("keyup", () => {
  console.log(`${emailField.value} - is valid email: ${emailTest.test(emailField.value)}`);
  if (emailLabel.classList.contains("form-error") && emailTest.test(emailField.value)) {
    emailLabel.classList.remove("form-error");
    emailField.classList.remove("form-error");
    emailLabel.querySelector("#email-error").remove();
  if (!(textField.value.length > 5) && !(emailTest.test(emailField.value)) && !(subjectField.value.length > 15) && !(messageField.value.length > 25)) {
    submitBtn.disabled = false;
  }
  }
})

subjectField.addEventListener("focusout", () => {
  if (!subjectLabel.classList.contains("form-error") && !(subjectField.value.length > 15)) {
    subjectLabel.classList.add("form-error");
    subjectField.classList.add("form-error");
    subjectLabel.innerHTML += `<span id="subject-error">please give provide a longer subject</span>`;
    if (submitBtn.disabled === false) {
      submitBtn.disabled = true;
    }
  }
})

subjectField.addEventListener("keyup", () => {
  if (subjectLabel.classList.contains("form-error") && subjectField.value.length > 15) {
    subjectLabel.classList.remove("form-error");
    subjectField.classList.remove("form-error");
    subjectLabel.querySelector("#subject-error").remove();
  if (!(textField.value.length > 5) && !(emailTest.test(emailField.value)) && !(subjectField.value.length > 15) && !(messageField.value.length > 25)) {
    submitBtn.disabled = false;
  }
  }
})

messageField.addEventListener("focusout", () => {
  if (!messageLabel.classList.contains("form-error") && !(messageField.value.length > 25)) {
    messageLabel.classList.add("form-error");
    messageField.classList.add("form-error");
    messageLabel.innerHTML += `<span id="message-error">please give us a longer message</span>`;
    if (submitBtn.disabled === false) {
      submitBtn.disabled = true;
    }
  }
})

messageField.addEventListener("keyup", () => {
  if (messageLabel.classList.contains("form-error") && messageField.value.length > 25) {
    messageLabel.classList.remove("form-error");
    messageField.classList.remove("form-error");
    messageLabel.querySelector("#message-error").remove();
  if (!(textField.value.length > 5) && !(emailTest.test(emailField.value)) && !(subjectField.value.length > 15) && !(messageField.value.length > 25)) {
    submitBtn.disabled = false;
  }
  }
})

submitBtn.addEventListener("click", () => {
  if (!(textField.value.length > 5)) {
    textLabel.classList.add("form-error");
    textField.classList.add("form-error");
    textLabel.innerHTML += `<span id="text-error">please give us you full name</span>`;
    if (submitBtn.disabled === false) {
      submitBtn.disabled = true;
    }
  }
  if (!(emailTest.test(emailField.value))) {
    emailLabel.classList.add("form-error");
    emailField.classList.add("form-error");
    emailLabel.innerHTML += `<span id="email-error">please give us you a vaild email</span>`;
    if (submitBtn.disabled === false) {
      submitBtn.disabled = true;
    }
  }
  if (!(subjectField.value.length > 15)) {
    subjectLabel.classList.add("form-error");
    subjectField.classList.add("form-error");
    subjectLabel.innerHTML += `<span id="subject-error">please give provide a longer subject</span>`;
    if (submitBtn.disabled === false) {
      submitBtn.disabled = true;
    }
  }
  if (!(messageField.value.length > 25)) {
    messageLabel.classList.add("form-error");
    messageField.classList.add("form-error");
    messageLabel.innerHTML += `<span id="message-error">please give us a longer message</span>`;
    if (submitBtn.disabled === false) {
      submitBtn.disabled = true;
    }
  }
  if (textField.value.length > 5 && emailTest.test(emailField.value) && subjectField.value.length > 15 && messageField.value.length > 25) {
    textField.value = "";
    emailField.value = "";
    subjectField.value = "";
    messageField.value = "";
  }
})