import cardView from './cardView';
import View from './View';

class resultsView extends View {
  _parentElement = document.querySelector('.grid__container');
  _fireElement = document.querySelector('.nav');

  addHandlerClick(handler) {
    this._fireElement.addEventListener('click', function (e) {
      const clicked = e.target.closest('.nav__link');
      if (!clicked) return;
      console.log(clicked);
      const type = clicked.dataset.type;
      handler(type);
    });
  }

  _generateMarkup(data) {
    return data
      .map(
        el => ` 
      <div class="card">
        <div class="card__background">
          <div class="card__background-ball">
            <img
              src="https://pokeres.bastionbot.org/images/pokemon/${el.id}.png"
              alt="${el.pokemon_name}.png"
            />
          </div>
        </div>
        <div class="card__details">
          <h4 class="heading-quaternary">${
            el.pokemon_name.charAt(0).toUpperCase() + el.pokemon_name.slice(1)
          } #${el.id}</h4>
          ${el.types
            .map(
              (type, i) =>
                `<span class="span__type--badge badge-${type}" style="${
                  i + 1 < el.types.length ? 'margin-right:5px;' : ''
                }">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`
            )
            .join('')}
          <div class="card__metrics">
            <div class="card__height">
              <span class="span-primary">${el.height}m</span>
              <small class="small-primary">Height</small>
            </div>
            <div class="card__weight">
              <span class="span-primary">${el.weight}kg</span>
              <small class="small-primary">Weight</small>
            </div>
          </div>
          <a href="#" class="btn--card" data-id="${el.id}">Poke Stats</a>
        </div>
      </div>`
      )
      .join('');
  }
}

export default new resultsView();
