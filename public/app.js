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
const signInPasswordEye = document.querySelector("#signInPasswordEye");
const signInPasswordField = document.querySelector("#signInPasswordField");
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropdownMenu = document.querySelector(".dropdown_menu");
const fetchUsersUrl = "/users";
const getUsersByID = "/users/:id";
const loginUrl = "/users/login";
const passwordUrl = "/users/password";
const deleteUrl = "users/delete";
const footer = document.getElementById("footer");
const signInButton = document.querySelector(".sign-in-button");
const signInDialog = document.querySelector(".sign-in-dialog");
const welcomeCard = document.querySelector(".mdl-card");
const welcomeButton = welcomeCard.querySelector(".mdl-button");
const logOutDialog = document.querySelector(".logout-dialog");
const profile = document.querySelector(".profile");
const body = document.querySelector(".body-container");
const list = document.querySelector(".mdl-list");
const profileContainer = document.getElementById("profile");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profileUsername = document.getElementById("profile-username");
const profilePassword = document.getElementById("profile-password");
const profileGender = document.getElementById("profile-gender");
const profileDOB = document.getElementById("profile-date-of-birth");
const profileDOBInput = document.getElementById("profile-date-of-birth-input");
const editButton = document.querySelector(".edit-button");
const profileGym = document.querySelector(".profile-primary-gym");
const profileTrainer = document.querySelector(".profile-trainer");
const profileInput = document.querySelectorAll(".profile-input");
const editButtonPassword = document.querySelector("#editPasswordField");
const editButtonDialog = document.querySelector(".edit-button-dialog");
const editButtonDialogButton = document.querySelector(".edit-password-button");
const profileSaveDialog = document.querySelector(".profile-save-dialog");
const profileSaveClose = document.querySelector(".profile-save-close");
const logOutDisagree = document.querySelector(".mdl-disagree-button");
const signInError = document.querySelector(".sign-in-error-dialog");
const signInErrorClose = document.querySelector(".sign-in-error-close");
const deleteButton = document.querySelector(".delete-button");
const deleteDialog = document.querySelector(".delete-dialog");
const deleteAgree = document.querySelector(".mdl-delete-button");
const deleteDisagree = document.querySelector("#delete-disagree-button");

isLoggedIn();
console.log(isLoggedIn());
updateDOMOnLogin();

// Login logic
function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token !== null;
}

function handleLogout() {
  logOutDialog.close();
  localStorage.removeItem("token");
  updateDOMOnLogin();
  location.reload();
}

function updateDOMOnLogin() {
  if (isLoggedIn()) {
    registerButton.textContent = "Logout";
    welcomeCard.classList.add("hidden");
  } else {
    registerButton.textContent = "Login/Signup";
  }
}

function updateProfile() {
  editButtonDialog.close();
  editButton.textContent = "save";
  profileDOBInput.type = "date";
  deleteButton.classList.remove("hidden");
  profileInput.forEach((input) => {
    input.disabled = false;
  });
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
registerButton.onclick = () => {
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
};

registerButtonDropdown.onclick = () => {
  popupContainer.style.display = "block";
  popupContainer.classList.add("visible");
  footer.classList.add("hidden");
  welcomeCard.classList.add("hidden");
  dropdownMenu.classList.toggle("open");
};

welcomeButton.onclick = () => {
  popupContainer.style.display = "block";
  popupContainer.classList.add("visible");
  footer.classList.add("hidden");
  welcomeCard.classList.add("hidden");
};

showPassword.onclick = () => {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  showPassword.textContent =
    type === "password" ? "visibility" : "visibility_off";
};

confirmPasswordEye.onclick = () => {
  const type =
    confirmPasswordField.getAttribute("type") === "password"
      ? "text"
      : "password";
  confirmPasswordField.setAttribute("type", type);
  confirmPasswordEye.textContent =
    type === "password" ? "visibility" : "visibility_off";
};

signInPasswordEye.onclick = () => {
  const type =
    signInPasswordField.getAttribute("type") === "password"
      ? "text"
      : "password";
  signInPasswordField.setAttribute("type", type);
  signInPasswordEye.textContent =
    type === "password" ? "visibility" : "visibility_off";
};

closeButton.onclick = (e) => {
  e.preventDefault();
  registerForm.reset();
  signInForm.reset();
  popupContainer.style.display = "none";
  footer.classList.remove("hidden");
  welcomeCard.classList.remove("hidden");
};

logOutDisagree.onclick = () => {
  logOutDialog.close();
};

profileSaveClose.onclick = () => {
  location.reload();
};

signInErrorClose.onclick = () => {
  signInError.close();
};

deleteButton.onclick = () => {
  deleteDialog.showModal();
  deleteDisagree.onclick = () => {
    deleteDialog.close();
  };
};

deleteAgree.onclick = () => {
  const token = localStorage.getItem("token");
  try {
    const res = axios.delete(deleteUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    deleteDialog.close();
    handleLogout();
  } catch (err) {
    console.log(err);
  }
};

// Registration form submission
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const user = Object.fromEntries(formData.entries());

  try {
    axios.post(fetchUsersUrl, user).catch((err) => {
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
    const res = await axios.post(loginUrl, user);
    if (res.status === 202) {
      localStorage.setItem("token", res.data.token);
      popupContainer.style.display = "none";
      footer.classList.remove("hidden");
      signInForm.reset();
      signInDialog.showModal();
      signInDialog
        .querySelector(".mdl-button")
        .addEventListener("click", handleSignIn);
    }
  } catch (err) {
    signInError.showModal();
  }
});

// Profile page with information request
profile.onclick = async () => {
  if (isLoggedIn()) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(getUsersByID, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const {
        date_of_birth,
        email,
        gender,
        name,
        password,
        primary_gym,
        trainer,
        username,
      } = res.data;
      console.log(res.data);

      const formattedDateOfBirth = new Date(date_of_birth)
        .toISOString()
        .split("T")[0];
      profileName.textContent = `Name: ${name}`;
      profileUsername.textContent = `Username: ${username}`;
      profileEmail.textContent = `Email: ${email}`;
      profilePassword.textContent = `Password: ******`;
      profileDOB.textContent = `D.O.B: ${formattedDateOfBirth}`;
      profileGender.textContent = `Gender: ${gender}`;
      profileGym.textContent = `Primary Gym: ${
        primary_gym ? primary_gym : "NA"
      }`;
      profileTrainer.textContent = `Trainer: ${trainer ? trainer : "NA"}`;
    } catch (err) {
      console.log(err);
    }

    profileContainer.classList.remove("hidden");
    body.style.display = "none";
    footer.style.display = "none";
  } else {
    console.log("not logged in");
  }
};

editButton.onclick = async () => {
  const buttonText = editButton.textContent.trim();
  console.log(buttonText);
  if (buttonText === "edit") {
    editButtonDialog.showModal();
  } else if (buttonText === "save") {
    const profileInputs = document.querySelectorAll(".profile-input");
    const userData = {};

    profileInputs.forEach((input) => {
      const inputId = input.id.replace("profile-", "").replace(/-input$/, "");
      const inputValue = input.value;
      if (inputValue.trim() !== "") {
        userData[inputId] = inputValue;
        console.log(userData);
      }
    });

    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(fetchUsersUrl, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.status);
      if (res.status === 202) {
        profileSaveDialog.showModal();
      }
    } catch (err) {
      console.log(err);
    }
  }
};

editButtonDialogButton.onclick = async (e) => {
  e.preventDefault();
  const password = document.querySelector("#editPasswordField").value;
  const passwordCheck = { password: password };
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(passwordUrl, passwordCheck, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 202) {
      console.log("Success!");
      updateProfile();
    }
  } catch (err) {
    console.log(err);
    signInError.showModal();
  }
};
