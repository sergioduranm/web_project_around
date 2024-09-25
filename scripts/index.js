// Constantes de perfil
const openProfileButton = document.querySelector(".edit-profile-button");
const addCardButton = document.querySelector(".add-photo-button");
const profileName = document.querySelector(".user-profile__name");
const profileJob = document.querySelector(".user-profile__role");

// Función principal para crear el modal
function actionModal(title, inputsData, submitCallback) {
  // Crear y configurar el modal
  const modalElement = createModalElement(title);

  // Crear inputs dinámicamente
  const inputs = createInputs(modalElement, inputsData);

  // Configurar eventos
  setupEventListeners(modalElement, inputs, submitCallback);

  // Mostrar el modal
  openModal(modalElement);
}

// Función para crear el elemento del modal a partir de la plantilla
function createModalElement(title) {
  const modalTemplate = document.querySelector("#modal-template").content;
  const modalElement = modalTemplate.querySelector(".modal").cloneNode(true);
  const modalTitle = modalElement.querySelector(".modal__title");
  const modalForm = modalElement.querySelector(".modal__form");

  modalTitle.textContent = title;
  modalForm.setAttribute("novalidate", true); // Desactivar validación nativa

  return modalElement;
}

// Función para crear los inputs dinámicamente
function createInputs(modalElement, inputsData) {
  const modalInputsContainer = modalElement.querySelector(".modal__inputs");
  modalInputsContainer.innerHTML = ""; // Limpiar inputs existentes

  const inputs = inputsData.map((inputData, index) => {
    // Crear contenedor del input
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("modal__form-group");

    // Crear label
    const label = document.createElement("label");
    label.classList.add("modal__label");
    label.textContent = inputData.label;
    label.setAttribute("for", `input-${index}`);

    // Crear input
    const input = document.createElement("input");
    input.classList.add("modal__input");
    input.setAttribute("id", `input-${index}`);
    input.setAttribute("name", `input-${index}`);
    input.setAttribute("placeholder", inputData.placeholder || inputData.label);
    input.setAttribute("type", inputData.type || "text");

    // Añadir atributos de validación
    if (inputData.validation) {
      if (inputData.validation.required) {
        input.required = true;
      }
      if (inputData.validation.minLength) {
        input.minLength = inputData.validation.minLength;
      }
      if (inputData.validation.maxLength) {
        input.maxLength = inputData.validation.maxLength;
      }
      if (inputData.validation.pattern) {
        input.pattern = inputData.validation.pattern;
      }
    }

    // Crear elemento para mostrar el mensaje de error
    const errorElement = document.createElement("span");
    errorElement.classList.add("modal__error");
    errorElement.setAttribute("id", `${input.id}-error`);

    // Añadir label, input y mensaje de error al contenedor
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    inputContainer.appendChild(errorElement);

    // Añadir contenedor al modal
    modalInputsContainer.appendChild(inputContainer);

    return input;
  });

  return inputs;
}

// agregar event listener para cerrar con click fuera de modal y con tecla esc
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
});

// Función para abrir el modal
function openModal(modalElement) {
  document.body.appendChild(modalElement);
  modalElement.classList.add("modal_opened");
}

// Función para cerrar el modal
function closeModal(modalElement) {
  document.body.removeChild(modalElement);
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

// click para agregar una nueva tarjeta
addCardButton.addEventListener("click", function () {
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

// click abrir modal para editar perfil nombre y acerca de mi
openProfileButton.addEventListener("click", function () {
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

// pop up new cards

document.addEventListener("DOMContentLoaded", () => {
  // Definir constantes
  const popUpTemplate = document.getElementById(
    "pop-up-imagen-template"
  ).content;
  const body = document.body;
  const photoCardsContainer = document.querySelector(".photo-cards");

  // Función para abrir el pop-up con la imagen seleccionada
  function openImagePopUp(imageSrc, imageName) {
    // Clonar el contenido del template
    const popUpClone = popUpTemplate.cloneNode(true);

    // Seleccionar elementos dentro del pop-up clonado
    const popUp = popUpClone.querySelector(".pop-up-imagen");
    const popUpImage = popUpClone.querySelector(".pop-up-imagen_photo");
    const popUpName = popUpClone.querySelector(".pop-up-imagen__name");
    const popUpCloseBtn = popUpClone.querySelector(".pop-up-imagen__close-btn");

    // Configurar la imagen y el nombre
    popUpImage.src = imageSrc;
    popUpName.textContent = imageName;

    // Función para cerrar el pop-up
    function closePopUp() {
      popUp.remove();
    }

    // Agregar evento de cierre al botón de cierre
    popUpCloseBtn.addEventListener("click", closePopUp);

    // Agregar el pop-up clonado al cuerpo del documento
    body.appendChild(popUp);

    // Abrir el pop-up
    popUp.classList.add("pop-up-imagen_opened");

    console.log("Pop-up opened with image:", imageSrc, "and name:", imageName);
  }

  // Delegación de eventos para manejar clicks en imágenes
  photoCardsContainer.addEventListener("click", (event) => {
    const image = event.target.closest(".photo-card__image");
    if (image) {
      const imageSrc = image.src;
      const imageCard = image.closest(".photo-card");
      const imageName =
        imageCard.querySelector(".photo-card__title").textContent ||
        "Nombre de imagen";
      openImagePopUp(imageSrc, imageName);
    }
  });
});

// Cards

// Variables y constantes
const cardsArray = [
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
const photoCards = document.querySelector(".photo-cards");

// ------------------------------------------------------------------------------------------------------
// Funciones

// function y método para createCard

function createCard(card) {
  const cardTemplate = document.querySelector("#photo-card-template").content;
  const cardElement = cardTemplate.querySelector(".photo-card").cloneNode(true);
  cardElement.querySelector(".photo-card__image").src = card.link;
  cardElement.querySelector(".photo-card__title").textContent = card.name;
  photoCards.append(cardElement);
  // like button
  const likeButton = cardElement.querySelector(".photo-card__like");
  function likeCard(event) {
    event.target.classList.toggle("photo-card__like_on");
  }
  likeButton.addEventListener("click", likeCard);
  // delete button
  const deleteButton = cardElement.querySelector(".photo-card__delete");
  function deleteCard(event) {
    event.target.closest(".photo-card").remove();
  }
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

cardsArray.forEach(createCard);
