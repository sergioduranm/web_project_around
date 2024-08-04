// Constantes y variables
// constantes de modal 3:24 funcionando
const modalTemplate = document.querySelector("#modal-template").content;
const modal = document.querySelector("#Modal");
const closeButton = document.querySelector("#closeModalBtn");
const ModalForm = document.querySelector(".modal__form");
const inputOne = document.querySelector("#inputOne");
const inputTwo = document.querySelector("#inputTwo");
const submitBtn = document.querySelector(".modal__submit-btn");

// Constantes de perfil
const openProfileButton = document.querySelector(".edit-profile-button");
const profileName = document.querySelector(".user-profile__name");
const profileJob = document.querySelector(".user-profile__role");

// Función para abrir y cerrar el modal de perfil
function actionModal() {
  modal.classList.toggle("modal_opened");
}

// Función para enviar el formulario del modal de perfil
function submitModal(event) {
  event.preventDefault();

  // Aquí puedes añadir el código para actualizar el contenido del perfil del usuario, si es necesario.
  profileName.textContent = inputOne.value;
  profileJob.textContent = inputTwo.value;
}
// Función para cambiar color botón submit
function changeColor() {
  if (inputOne.value.trim() !== "" && inputTwo.value.trim() !== "") {
    submitBtn.style.backgroundColor = "#000";
    submitBtn.style.color = "#fff";
  } else {
    submitBtn.style.backgroundColor = "";
    submitBtn.style.color = "";
  }
}
// Eventos
inputOne.addEventListener("input", changeColor);
inputTwo.addEventListener("input", changeColor);
ModalForm.addEventListener("submit", submitModal);
openProfileButton.addEventListener("click", actionModal);
closeButton.addEventListener("click", actionModal);
ModalForm.addEventListener("submit", actionModal);
