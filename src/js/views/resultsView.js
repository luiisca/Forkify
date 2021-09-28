import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No recipes found for your query. Please try again ;)';
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
						<img src="${el.imageUrl}" alt="${el.title}" />
					</figure>
					<div class="preview__data">
						<h4 class="preview__title">${el.title}</h4>
						<p class="preview__publisher">${el.publisher}</p>
            <div class="preview__user-generated ${el.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
					</div>
				</a>
			</li>
		`;
  }
}
export default new ResultsView();
