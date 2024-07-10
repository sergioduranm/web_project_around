// ------------------------------------------------------------------------------------------------------
//  Variables y constantes

const profileModal = document.querySelector(".profile-modal");
const editProfileButton = document.querySelector(".edit-profile-button");
const closeProfileButton = document.querySelector(".profile-modal__close-btn");
const profileModalForm = document.querySelector(".profile-modal__form");
const profileName = document.querySelector(".user-profile__name");
const profileJob = document.querySelector(".user-profile__role");
const submitProfBtn = document.querySelector(".profile-modal__submit-btn");
const inputName = profileModalForm.querySelector(".profile-modal__input#name");
const inputJob = profileModalForm.querySelector(".profile-modal__input#about");

// ------------------------------------------------------------------------------------------------------
// Funciones

// ------------------------------------------------------------------------------------------------------
// Función para enviar el formulario del modal de perfil
function submitProfileModal(event) {
  event.preventDefault();

  // Actualizar el contenido del perfil del usuario
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}

// ------------------------------------------------------------------------------------------------------
// función para cambiar color botón submit
function changeColor() {
  if (inputName.value.trim() !== "" && inputJob.value.trim() !== "") {
    submitProfBtn.style.backgroundColor = "#000";
    submitProfBtn.style.color = "#fff";
  } else {
    submitProfBtn.style.backgroundColor = "";
    submitProfBtn.style.color = "";
  }
}

// ------------------------------------------------------------------------------------------------------
// Función para abrir y cerrar el modal de perfil
function actionProfileModal() {
  profileModal.classList.toggle("profile-modal_opened"); // Removed dot before class name
}

// ------------------------------------------------------------------------------------------------------
// Eventos

inputName.addEventListener("input", changeColor);
inputJob.addEventListener("input", changeColor);
profileModalForm.addEventListener("submit", submitProfileModal);
editProfileButton.addEventListener("click", actionProfileModal);
closeProfileButton.addEventListener("click", actionProfileModal);
profileModalForm.addEventListener("submit", actionProfileModal);
