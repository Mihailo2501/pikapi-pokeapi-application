import icons from 'url:../../img/icons.svg';
import View from './View';

class paginationView extends View {
  _parentElement = document.querySelector('.grid__container');

  render(data) {
    this._data = data;
    const markup = this._generateMarkup(data);

    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      // Calling controlPagination and passing which page to go as an argument
      handler(goToPage);
    });
  }

  _generateMarkup(data) {
    const curPage = data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <footer class="footer">
            <button class="btn btn--next" data-goto="${curPage + 1}">
              <svg>
              <use href="${icons}#icon-arrow-right"></use>
              </svg>
              <span>Page ${curPage + 1}</span>
            </button>
        </footer>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <footer class="footer">
            <button class="btn btn--prev" data-goto="${curPage - 1}">
              <svg>
              <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>
        </footer>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <footer class="footer">
            <button class="btn btn--prev" data-goto="${curPage - 1}">
              <svg>
              <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>
            <button class="btn btn--next" data-goto="${curPage + 1}">
              <svg>
              <use href="${icons}#icon-arrow-right"></use>
              </svg>
              <span>Page ${curPage + 1}</span>
            </button>
        </footer>
      `;
    }

    return '';
  }
}

export default new paginationView();
