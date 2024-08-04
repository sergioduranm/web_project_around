// Constantes de perfil
const openProfileButton = document.querySelector(".edit-profile-button");
const addCardButton = document.querySelector(".add-photo-button");
const profileName = document.querySelector(".user-profile__name");
const profileJob = document.querySelector(".user-profile__role");

// Función de modal
function actionModal(title, labelOne, labelTwo, submitCallback) {
  // constante en modal
  const modalTemplate = document.querySelector("#modal-template").content;
  const modalElement = modalTemplate.querySelector(".modal").cloneNode(true);
  const closeButton = modalElement.querySelector("#closeModalBtn");
  const modalForm = modalElement.querySelector(".modal__form");
  const inputOne = modalElement.querySelector("#inputOne");
  const inputTwo = modalElement.querySelector("#inputTwo");
  const submitBtn = modalElement.querySelector(".modal__submit-btn");
  const modalTitle = modalElement.querySelector(".modal__title");
  const modalLabels = modalElement.querySelectorAll(".modal__label");

  // Establecer valores de texto para modal
  modalTitle.textContent = title;
  modalLabels[0].textContent = labelOne;
  modalLabels[1].textContent = labelTwo;
  inputOne.placeholder = labelOne;
  inputTwo.placeholder = labelTwo;

  // Añadir el modal al DOM
  document.body.appendChild(modalElement);
  modalElement.classList.add("modal_opened");

  // Función para cambiar color del botón submit
  function changeColor() {
    if (inputOne.value.trim() !== "" && inputTwo.value.trim() !== "") {
      submitBtn.style.backgroundColor = "#000";
      submitBtn.style.color = "#fff";
    } else {
      submitBtn.style.backgroundColor = "";
      submitBtn.style.color = "";
    }
  }

  // Función para cerrar el modal
  function closeModal() {
    document.body.removeChild(modalElement);
  }

  // Eventos dentro de modal
  inputOne.addEventListener("input", changeColor);
  inputTwo.addEventListener("input", changeColor);
  modalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    submitCallback(inputOne.value, inputTwo.value);
    closeModal();
  });
  closeButton.addEventListener("click", closeModal);
}

// Función para actualizar el perfil del usuario
function updateProfile(name, job) {
  profileName.textContent = name;
  profileJob.textContent = job;
}

// Función para añadir una nueva tarjeta
function addNewCard(name, link) {
  const newCard = {
    name: name,
    link: link,
  };
  cardsArray.unshift(newCard);
  console.log(cardsArray);
  const cardElement = createCard(cardsArray[0]);
  photoCards.prepend(cardElement);
}

// Eventos para activar modal
openProfileButton.addEventListener("click", function () {
  actionModal("Editar perfil", "Nombre", "Acerca de mi", updateProfile);
});

addCardButton.addEventListener("click", function () {
  actionModal("Nuevo lugar", "Nombre", "Link", addNewCard);
});
