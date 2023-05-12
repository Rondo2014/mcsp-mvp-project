const popupContainer = document.getElementById("popup-container");
const registerButton = document.getElementById("signin_signup");
const registerButtonDropdown = document.getElementById("signin_signup_D");
const closeButton = document.getElementById("close-button");
const registerForm = document.getElementById("registration-form");
const signInForm = document.getElementById("signin-form");
const showPassword = document.querySelector(".password-eye");
const passwordField = document.querySelector("#password");
const confirmPasswordField = document.querySelector("#confirmPassword");
const confirmPasswordEye = document.querySelector("#confirmPasswordEye");
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropdownMenu = document.querySelector(".dropdown_menu");
const fetchUsersUrl = "/users";
const loginUrl = "/users/login";
const footer = document.getElementById("footer");
const signInButton = document.querySelector(".sign-in-button");
const signInDialog = document.querySelector(".sign-in-dialog");
const welcomeCard = document.querySelector(".mdl-card");
const welcomeButton = welcomeCard.querySelector(".mdl-button");
const logOutDialog = document.querySelector(".logout-dialog");

isLoggedIn();
console.log(isLoggedIn());

// Login logic
function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token !== null;
}
function handleLogout() {
  logOutDialog.close();
  localStorage.removeItem("token");
  updateDOMOnLogin();
}
function updateDOMOnLogin() {
  if (isLoggedIn()) {
    registerButton.textContent = "Logout";
  } else {
    registerButton.textContent = "Login/Signup";
  }
}
function handleSignIn() {
  signInDialog.close();
  updateDOMOnLogin();
}
//  Navbar toggle
toggleBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("open");
  const isOpen = dropdownMenu.classList.contains("open");

  toggleBtnIcon.textContent = isOpen ? "close" : "menu";
});

// Registration/signup buttons
registerButton.addEventListener("click", () => {
  if (isLoggedIn()) {
    console.log(isLoggedIn());
    logOutDialog
      .querySelector(".mdl-logout-button")
      .addEventListener("click", handleLogout);
    logOutDialog.showModal();
  } else {
    popupContainer.style.display = "block";
    popupContainer.classList.add("visible");
    footer.classList.add("hidden");
    welcomeCard.classList.add("hidden");
  }
});

registerButtonDropdown.addEventListener("click", () => {
  popupContainer.style.display = "block";
  popupContainer.classList.add("visible");
  footer.classList.add("hidden");
  welcomeCard.classList.add("hidden");
});
welcomeButton.addEventListener("click", () => {
  popupContainer.style.display = "block";
  popupContainer.classList.add("visible");
  footer.classList.add("hidden");
  welcomeCard.classList.add("hidden");
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
  registerForm.reset();
  signInForm.reset();
  popupContainer.style.display = "none";
  footer.classList.remove("hidden");
  welcomeCard.classList.remove("hidden");
});

// Registration form submission
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const user = Object.fromEntries(formData.entries());
  try {
    axios
      .post(fetchUsersUrl, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response && err.response.status === 400) {
          alert(err.response.data);
        }
        popupContainer.style.display = "block";
        popupContainer.classList.add("visible");
        footer.classList.add("hidden");
      });

    registerForm.reset();
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.status === 400) {
      alert(err.response.data);
    } else {
      console.error(err);
    }
  }
  popupContainer.style.display = "none";
  footer.classList.remove("hidden");
});
// Signin form submission
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signInForm);
  const user = Object.fromEntries(formData.entries());
  console.log(user);
  try {
    await axios.post(loginUrl, user).then((response) => {
      // console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
    });

    popupContainer.style.display = "none";
    footer.classList.remove("hidden");
    signInForm.reset();
    signInDialog.showModal();
    signInDialog
      .querySelector(".mdl-button")
      .addEventListener("click", handleSignIn);
  } catch (err) {
    console.log(err);
  }
});

// // Footer scroller
// let scrollPosition = window.pageYOffset;

// window.addEventListener("scroll", () => {
//   const currentScrollPosition = window.pageYOffset;

//   if (currentScrollPosition > scrollPosition && currentScrollPosition > 100) {
//     footer.classList.remove("hidden");
//   } else {
//     footer.classList.add("hidden");
//   }
//   scrollPosition = currentScrollPosition;
// });
