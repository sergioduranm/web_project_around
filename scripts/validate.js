// Funciones de validación
function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("modal__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add("modal__error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("modal__input_type_error");
  errorElement.classList.remove("modal__error_visible");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputs, submitButton) {
  if (hasInvalidInput(inputs)) {
    submitButton.classList.add("modal__submit-btn_disabled");
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove("modal__submit-btn_disabled");
    submitButton.disabled = false;
  }
}

// Funciones para event listeners
function addInputEventListeners(formElement, inputs, submitButton) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input);
      toggleButtonState(inputs, submitButton);
    });
  });
}

function handleFormSubmit(formElement, inputs, submitCallback, modalElement) {
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validar todos los inputs antes de enviar
    let allValid = true;
    inputs.forEach((input) => {
      checkInputValidity(formElement, input);
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
}

function addCloseButtonListener(closeButton, modalElement) {
  closeButton.addEventListener("click", () => closeModal(modalElement));
}

// Función principal para configurar los event listeners
function setupEventListeners(modalElement, inputs, submitCallback) {
  const closeButton = modalElement.querySelector("#closeModalBtn");
  const modalForm = modalElement.querySelector(".modal__form");
  const submitBtn = modalElement.querySelector(".modal__submit-btn");

  addInputEventListeners(modalForm, inputs, submitBtn);
  toggleButtonState(inputs, submitBtn); // Estado inicial del botón
  handleFormSubmit(modalForm, inputs, submitCallback, modalElement);
  addCloseButtonListener(closeButton, modalElement);
}
