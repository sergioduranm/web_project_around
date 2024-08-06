document.addEventListener("DOMContentLoaded", () => {
  // Definir constantes
  const popUpTemplate = document.getElementById(
    "pop-up-imagen-template"
  ).content;
  const body = document.body;
  const photoCardsContainer = document.querySelector(".photo-cards"); // Asegúrate de que el contenedor tiene esta clase

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
