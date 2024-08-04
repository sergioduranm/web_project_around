// Constantes y variables
// constantes de modal 3:24 funcionando

// Constantes de perfil
const openProfileButton = document.querySelector(".edit-profile-button");
const profileName = document.querySelector(".user-profile__name");
const profileJob = document.querySelector(".user-profile__role");

// Función
function actionModal() {
  // constante en modal
  const modalTemplate = document.querySelector("#modal-template").content;
  const modalElement = modalTemplate.querySelector(".modal").cloneNode(true);
  const closeButton = modalElement.querySelector("#closeModalBtn");
  const ModalForm = modalElement.querySelector(".modal__form");
  const inputOne = modalElement.querySelector("#inputOne");
  const inputTwo = modalElement.querySelector("#inputTwo");
  const submitBtn = modalElement.querySelector(".modal__submit-btn");

  // Añadir el modal al DOM
  document.body.appendChild(modalElement);
  modalElement.classList.add("modal_opened");

  // Cambiar color del botón submit
  function changeColor() {
    if (inputOne.value.trim() !== "" && inputTwo.value.trim() !== "") {
      submitBtn.style.backgroundColor = "#000";
      submitBtn.style.color = "#fff";
    } else {
      submitBtn.style.backgroundColor = "";
      submitBtn.style.color = "";
    }
  }

  // Función para enviar el formulario del modal de perfil
  function submitModal(event) {
    event.preventDefault();

    // Aquí puedes añadir el código para actualizar el contenido del perfil del usuario, si es necesario.
    profileName.textContent = inputOne.value;
    profileJob.textContent = inputTwo.value;
  }

  // Función para cerrar el modal
  function closeModal() {
    document.body.removeChild(modalElement);
  }
  // Eventos dentro de modal
  inputOne.addEventListener("input", changeColor);
  inputTwo.addEventListener("input", changeColor);
  ModalForm.addEventListener("submit", submitModal);
  ModalForm.addEventListener("submit", closeModal);
  closeButton.addEventListener("click", closeModal);
}

// Eventos del perfil
openProfileButton.addEventListener("click", actionModal);
