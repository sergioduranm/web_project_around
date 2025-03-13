class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".photo-card")
      .cloneNode(true);
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("photo-card__like_on");
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick() {
    const popUpTemplate = document.querySelector(
      "#pop-up-imagen-template"
    ).content;
    const popUpClone = popUpTemplate.cloneNode(true);
    const popUp = popUpClone.querySelector(".pop-up-imagen");
    const popUpImage = popUpClone.querySelector(".pop-up-imagen_photo");
    const popUpName = popUpClone.querySelector(".pop-up-imagen__name");
    const popUpCloseBtn = popUpClone.querySelector(".pop-up-imagen__close-btn");

    popUpImage.src = this._link;
    popUpImage.alt = this._name;
    popUpName.textContent = this._name;

    const closePopUp = () => {
      popUp.remove();
      document.removeEventListener("keydown", handleEscClose);
    };

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closePopUp();
      }
    };

    popUpCloseBtn.addEventListener("click", closePopUp);
    document.addEventListener("keydown", handleEscClose);

    document.body.appendChild(popUp);
    popUp.classList.add("pop-up-imagen_opened");
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".photo-card__like");
    this._deleteButton = this._element.querySelector(".photo-card__delete");
    this._cardImage = this._element.querySelector(".photo-card__image");

    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
    this._cardImage.addEventListener("click", () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".photo-card__title").textContent = this._name;

    return this._element;
  }
}

export default Card;
