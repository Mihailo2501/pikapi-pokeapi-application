import View from './View';

class cardView extends View {
  _parentElement = document.querySelector('.grid__container');
  _buttonPopup = document.querySelector('.btn--card');

  _generateMarkup(data) {
    window.location.hash = `poke-${data.pokemon_name}`;
    return `
      <div class="card">
        <div class="card__background">
          <div class="card__background-ball">
            <img
              src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png"
              alt="${data.pokemon_name}.png"
            />
          </div>
        </div>
        <div class="card__details">
          <h4 class="heading-quaternary">${
            data.pokemon_name.charAt(0).toUpperCase() +
            data.pokemon_name.slice(1)
          } #${data.id}</h4>
          ${data.types
            .map(
              (type, i) =>
                `<span class="span__type--badge badge-${type}" style="${
                  i + 1 < data.types.length ? 'margin-right:5px;' : ''
                }">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`
            )
            .join('')}
          <div class="card__metrics">
            <div class="card__height">
              <span class="span-primary">${data.height}m</span>
              <small class="small-primary">Height</small>
            </div>
            <div class="card__weight">
              <span class="span-primary">${data.weight}kg</span>
              <small class="small-primary">Weight</small>
            </div>
          </div>
          <a href="#" class="btn--card" data-id="${data.id}">Poke Stats</a>
        </div>
      </div>
    `;
  }
}

export default new cardView();
// if (data.pokemon_name.includes('-'))
//   document
//     .getElementsByClassName('card')[0]
//     .closest('.heading-quaternary').style.fontSize = '3px;';
