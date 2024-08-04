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
}

cardsArray.forEach(createCard);


// abrir el modal
// El usuario escribe datos en el modal
// El usuario da click en el botón de submit
// Se capturan los valores de los inputs
// Se agrega a el array de cardsArray los datos del modal al inicio
// se agrega al inicio del array la nueva card usando el template


// listo las constantes con las que voy a trabajar
