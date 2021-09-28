import View from './View.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join(' ');
  }
  _generateMarkupPreview(el) {
    const id = window.location.hash.slice(1);
    return `
			<li class="preview">
				<a class="preview__link ${
          el.id === id ? 'preview__link--active' : ''
        }" href="#${el.id}">
					<figure class="preview__fig">
						<img src="${el.image}" alt="${el.title}" />
					</figure>
					<div class="preview__data">
						<h4 class="preview__title">${el.title}</h4>
						<p class="preview__publisher">${el.publisher}</p>
					</div>
				</a>
			</li>
		`;
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler());
  }
}
export default new BookmarksView();
