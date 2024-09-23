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

// Función para configurar los event listeners
function setupEventListeners(modalElement, inputs, submitCallback) {
  const closeButton = modalElement.querySelector("#closeModalBtn");
  const modalForm = modalElement.querySelector(".modal__form");
  const submitBtn = modalElement.querySelector(".modal__submit-btn");

  // Función para mostrar el mensaje de error
  function showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("modal__input_type_error");
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add("modal__error_visible");
  }

  // Función para ocultar el mensaje de error
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("modal__input_type_error");
    errorElement.classList.remove("modal__error_visible");
    errorElement.textContent = "";
  }

  // Función para validar cada input
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  // Función para verificar si hay algún input inválido
  function hasInvalidInput(inputs) {
    return inputs.some((inputElement) => !inputElement.validity.valid);
  }

  // Función para controlar el estado del botón submit
  function toggleButtonState(inputs, submitButton) {
    if (hasInvalidInput(inputs)) {
      submitButton.classList.add("modal__submit-btn_disabled");
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove("modal__submit-btn_disabled");
      submitButton.disabled = false;
    }
  }

  // Añadir eventos a los inputs
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(modalForm, input);
      toggleButtonState(inputs, submitBtn);
    });
  });

  // Controlar el estado inicial del botón submit
  toggleButtonState(inputs, submitBtn);

  // Evento para el submit del formulario
  modalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validar todos los inputs antes de enviar
    let allValid = true;
    inputs.forEach((input) => {
      checkInputValidity(modalForm, input);
      if (!input.validity.valid) {
        allValid = false;
      }
    });

    if (allValid) {
      const formData = inputs.map((input) => input.value);
      submitCallback(...formData);
      closeModal(modalElement);
    }
  });

  // Evento para cerrar el modal
  closeButton.addEventListener("click", () => closeModal(modalElement));
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
