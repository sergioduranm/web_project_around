// Funciones para manejar modales
export function openModal(modalElement) {
  document.body.appendChild(modalElement);
  modalElement.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modalElement) {
  document.body.removeChild(modalElement);
  document.removeEventListener("keydown", handleEscClose);
}

// Event handler para cerrar con Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Event handler para cerrar haciendo clic fuera del modal
export function handleOverlayClose(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

// Función para crear el elemento del modal
export function createModalElement(title) {
  const modalTemplate = document.querySelector("#modal-template").content;
  const modalElement = modalTemplate.querySelector(".modal").cloneNode(true);
  const modalTitle = modalElement.querySelector(".modal__title");
  const modalForm = modalElement.querySelector(".modal__form");

  modalTitle.textContent = title;
  modalForm.setAttribute("novalidate", true);

  return modalElement;
}

// Función para crear inputs dinámicamente
export function createInputs(modalElement, inputsData) {
  const modalInputsContainer = modalElement.querySelector(".modal__inputs");
  modalInputsContainer.innerHTML = "";

  const inputs = inputsData.map((inputData, index) => {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("modal__form-group");

    const label = document.createElement("label");
    label.classList.add("modal__label");
    label.textContent = inputData.label;
    label.setAttribute("for", `input-${index}`);

    const input = document.createElement("input");
    input.classList.add("modal__input");
    input.setAttribute("id", `input-${index}`);
    input.setAttribute("name", `input-${index}`);
    input.setAttribute("placeholder", inputData.placeholder || inputData.label);
    input.setAttribute("type", inputData.type || "text");

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

    const errorElement = document.createElement("span");
    errorElement.classList.add("modal__error");
    errorElement.setAttribute("id", `${input.id}-error`);

    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    inputContainer.appendChild(errorElement);
    modalInputsContainer.appendChild(inputContainer);

    return input;
  });

  return inputs;
}

// Función para configurar los event listeners del modal
export function setupModalEventListeners(modalElement, inputs, submitCallback) {
  const modalForm = modalElement.querySelector(".modal__form");
  const closeButton = modalElement.querySelector("#closeModalBtn");

  closeButton.addEventListener("click", () => closeModal(modalElement));

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formValues = inputs.map((input) => input.value);
    submitCallback(...formValues);
    closeModal(modalElement);
  });
}
