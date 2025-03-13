import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModal,
  closeModal,
  createModalElement,
  createInputs,
  setupModalEventListeners,
  handleOverlayClose,
} from "./utils.js";

// Constantes de perfil
const openProfileButton = document.querySelector(".edit-profile-button");
const addCardButton = document.querySelector(".add-photo-button");
const profileName = document.querySelector(".user-profile__name");
const profileJob = document.querySelector(".user-profile__role");
const photoCards = document.querySelector(".photo-cards");

// Configuración de validación
const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Array inicial de tarjetas
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Función para crear y renderizar una tarjeta
function createCard(cardData) {
  const card = new Card(cardData, "#photo-card-template");
  return card.generateCard();
}

// Función para renderizar las tarjetas iniciales
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    photoCards.append(cardElement);
  });
}

// Función principal para crear el modal
function actionModal(title, inputsData, submitCallback) {
  const modalElement = createModalElement(title);
  const inputs = createInputs(modalElement, inputsData);
  setupModalEventListeners(modalElement, inputs, submitCallback);

  const formValidator = new FormValidator(
    validationConfig,
    modalElement.querySelector(".modal__form")
  );
  formValidator.enableValidation();

  openModal(modalElement);
}

// Función para actualizar el perfil del usuario
function updateProfile(name, job) {
  profileName.textContent = name;
  profileJob.textContent = job;
}

// Función para añadir una nueva tarjeta
function addNewCard(name, link) {
  const cardData = { name, link };
  const cardElement = createCard(cardData);
  photoCards.prepend(cardElement);
}

// Event Listeners
addCardButton.addEventListener("click", () => {
  actionModal(
    "Nueva tarjeta",
    [
      {
        label: "Nombre",
        placeholder: "Ingresa el nombre del lugar",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 30,
        },
      },
      {
        label: "Link",
        placeholder: "Ingresa el link de la imagen",
        type: "url",
        validation: {
          required: true,
        },
      },
    ],
    addNewCard
  );
});

openProfileButton.addEventListener("click", () => {
  actionModal(
    "Editar perfil",
    [
      {
        label: "Nombre",
        placeholder: "Ingresa tu nombre",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 40,
        },
      },
      {
        label: "Acerca de mí",
        placeholder: "Escribe algo sobre ti",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 200,
        },
      },
    ],
    updateProfile
  );
});

// Event listener para cerrar modales haciendo clic fuera
document.addEventListener("click", handleOverlayClose);

// Inicializar las tarjetas
renderInitialCards();
