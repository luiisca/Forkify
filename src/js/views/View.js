import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  /**
   * Render recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @returns {undefined} Doesn't return any value
   * @this {Object} View instance
   * @author Luis Cadillo
   * @todo Implementation finished
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markUp = this._generateMarkup();
    this._clean();
    this._parentEl.insertAdjacentHTML('beforeend', markUp);
  }

  /**
   * Render only the values which are different on the data received
   * @param {Object | Object[]} data The object to compare and then be rendered
   * @returns {undefined} undefined - only execute operations
   * @this {Object} View instance
   */
  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !curEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!curEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clean() {
    this._parentEl.innerHTML = '';
  }

  renderError(message = this._errMessage) {
    const markup = `
			<div class="error">
				<div>
					<svg>
						<use href="${icons}#icon-alert-triangle"></use>
					</svg>
				</div>
				<p>${message}</p>
			</div> 
		`;

    this._clean();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
		<div class="message">
			<div>
				<svg>
					<use href="${icons}#icon-smile"></use>
				</svg>
			</div>
			<p>${message}</p>
		</div> 
		`;

    this._clean();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  renderSpinner() {
    const markup = `
			<div class="spinner">
				<svg>
					<use href="${icons}#icon-loader"></use>
				</svg>
			</div>
		`;
    this._clean();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
