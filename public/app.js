const popupContainer = document.getElementById("popup-container");
const registerButton = document.getElementById("signin_signup");
const registerButtonDropdown = document.getElementById("signin_signup_D");
const closeButton = document.getElementById("close-button");
const form = document.querySelector("form");
const showPassword = document.querySelector(".password-eye");
const passwordField = document.querySelector("#password");
const confirmPasswordField = document.querySelector("#confirmPassword");
const confirmPasswordEye = document.querySelector("#confirmPasswordEye");
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropdownMenu = document.querySelector(".dropdown_menu");

toggleBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("open");
  const isOpen = dropdownMenu.classList.contains("open");

  toggleBtnIcon.textContent = isOpen ? "close" : "menu";
});
registerButton.addEventListener("click", () => {
  popupContainer.style.display = "block";
  popupContainer.classList.add("visible");
});
registerButtonDropdown.addEventListener("click", () => {
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
  console.log("hello!");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  try {
    axios.post("http://localhost:4000/users", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    form.reset();
    popupContainer.style.display = "none";
  } catch (err) {
    console.error(err);
  }
});
