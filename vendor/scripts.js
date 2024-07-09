// Variables y constantes

const profileModal = document.querySelector(".profile-modal");
const editProfileButton = document.querySelector(".edit-profile-button");
const closeProfileButton = document.querySelector(".profile-modal__close-btn");
const profileModalForm = document.querySelector(".profile-modal__form");
const profileName = document.querySelector(".user-profile__name");
const profileJob = document.querySelector(".user-profile__role");

// Funciones

// Función para enviar el formulario del modal de perfil
function submitProfileModal(event) {
  event.preventDefault();

  // Obtener valores de los inputs
  let inputName = profileModalForm.querySelector(
    ".profile-modal__input#name"
  ).value;
  let inputJob = profileModalForm.querySelector(
    ".profile-modal__input#about"
  ).value;

  // Actualizar el contenido del perfil del usuario
  profileName.textContent = inputName;
  profileJob.textContent = inputJob;
}

// Función para abrir y cerrar el modal de perfil
function actionProfileModal() {
  profileModal.classList.toggle("profile-modal_opened"); // Removed dot before class name
}

// Eventos

profileModalForm.addEventListener("submit", submitProfileModal);
editProfileButton.addEventListener("click", actionProfileModal);
closeProfileButton.addEventListener("click", actionProfileModal);
