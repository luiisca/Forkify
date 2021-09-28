import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const data = +btn.dataset.goto;
      handler(data);
    });
  }

  _generateMarkup() {
    // render cases
    const curPage = this._data.currentPage;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );

    // 1) We are in the first page and there is more pages
    if (curPage === 1 && numPages > 1) {
      return `
				<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
					<span>Page ${curPage + 1}</span>
					<svg class="search__icon">
						<use href="${icons}#icon-arrow-right"></use>
					</svg>
				</button>
			`;
    }
    // 2) We are in the last page
    if (curPage === numPages && numPages > 1) {
      return `
				<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
					<svg class="search__icon">
						<use href="${icons}#icon-arrow-left"></use>
					</svg>
					<span>Page ${curPage - 1}</span>
				</button>
			`;
    }

    // 3) We are not in the first neither the last page
    if (this._data.currentPage < numPages) {
      return ` 
				<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
					<svg class="search__icon">
					<use href="${icons}#icon-arrow-left"></use>
					</svg>
					<span>Page ${this._data.currentPage - 1}</span>
				</button>
				<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
					<span>Page ${this._data.currentPage + 1}</span>
					<svg class="search__icon">
					<use href="${icons}#icon-arrow-right"></use>
					</svg>
				</button>
					`;
    }
    return '';
  }
}

export default new paginationView();
