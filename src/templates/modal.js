const formatDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  return `${(date.getDate() < 10) ? `0${day}` : day}.${(month < 10) ? `0${month}` : month}.${date.getFullYear()}`
}

const createInitialCommentTemplate = (comment) => {
  const date = new Date(comment.date);
  return `<li class="modal__comment" id="${comment.id}">
    <p class="modal__date">${(formatDate(date))}</p>
    <p class="modal__text">${comment.text}</p>
  </li>`
};

const createCommentsTemplate = (comments) => (
  `${comments.map((comment) => createInitialCommentTemplate(comment)).join(``)}`
);

export const createCommentTemplate = (comment) => {
  const date = new Date(comment.date);
  return `<li class="modal__comment" id="${comment.id}">
    <p class="modal__date">${(formatDate(date))}</p>
    <p class="modal__text">${comment.comment}</p>
  </li>`
};

export const createModalTemplate = (modal) => (
  `<div class="page__modal modal">
    <div class="modal__content">
      <div class="modal__header">
        <button class="modal__button" type="button" title="Close modal"></button>
        <img class="modal__image" src="${modal.url}" alt="Photo">
      </div>
      <ul class="modal__comments">
        ${createCommentsTemplate(modal.comments)}
      </ul>
      <form class="modal__form">
        <section class="modal__inputs">
          <input class="modal__add-name" type="text" name="author" placeholder="Ваше имя" required>
          <input class="modal__add-comment" type="text" name="comment" placeholder="Ваш комментарий" required>
          <input class="modal__submit" type="submit" value="Оставить комментарий">
        </section>
      </form>
    </div>
  </div>`
);