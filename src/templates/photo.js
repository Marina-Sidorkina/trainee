export const createPhotoTemplate = (photo) => (
  `<li class="album__item" id="${photo.id}">
    <a class="album__link" href="#" aria-label="Click to add comment">
    <img class="album__image" src="${photo.url}" alt="Photo">
    </a>
  </li>`
);