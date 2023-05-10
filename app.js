import { createUser } from "./users/user_controller";

const popupContainer = document.getElementById("popup-container");
const registerButton = document.getElementById("test");
const closeButton = document.getElementById("close-button");
const form = document.querySelector("form");
const showPassword = document.querySelector(".password-eye");
const passwordField = document.querySelector("#password");
const confirmPasswordField = document.querySelector("#confirmPassword");
const confirmPasswordEye = document.querySelector("#confirmPasswordEye");

let fullName, email, username, password, confirmPassword, dateOfBirth;

registerButton.addEventListener("click", () => {
  popupContainer.style.display = "block";
  popupContainer.classList.add("visible");
});

showPassword.addEventListener("click", () => {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  showPassword.textContent =
    type === "password" ? "visibility" : "visibility_off";
});

confirmPasswordEye.addEventListener("click", () => {
  const type =
    confirmPasswordField.getAttribute("type") === "password"
      ? "text"
      : "password";
  confirmPasswordField.setAttribute("type", type);
  confirmPasswordEye.textContent =
    type === "password" ? "visibility" : "visibility_off";
});
closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  popupContainer.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fullName = document.querySelector("#fullName").value;
  email = document.querySelector("#email").value;
  username = document.querySelector("#username").value;
  password = document.querySelector("#password").value;
  confirmPassword = document.querySelector("#confirmPassword").value;
  dateOfBirth = document.querySelector("#dateOfBirth").value;

  const user = createUser(
    fullName,
    email,
    username,
    password,
    confirmPassword,
    dateOfBirth
  );
});
