import View from './View';

class popupView extends View {
  _parentElement = document.querySelector('.grid__container');
  _btnClose = document.getElementsByClassName('popup__close');
  _popup = document.getElementsByClassName('popup');
  _popupContent = document.getElementsByClassName('popup__content');

  // Overriden render metod from View class
  render(data) {
    this._data = data;
    const markup = this._generateMarkup(data);

    this._parentElement.insertAdjacentHTML('beforeend', markup);

    // SetTimeout func is used in order for transition to work nicely *
    setTimeout(() => {
      this._removeHidden(document.getElementsByClassName('hidden'));
    }, 200);

    // Close popup listener
    this._btnClose[0].addEventListener('click', this._closePopup.bind(this));
  }

  // Close popup and remove from html
  _closePopup() {
    [this._popup, this._popupContent].forEach(el =>
      el[0].classList.add('hidden')
    );
    const container = this._parentElement;
    setTimeout(() => {
      container.removeChild(container.lastElementChild);
    }, 200);
  }

  // Open Popup Handler
  addHandlerOpen(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const clicked = e.target.closest('.btn--card');
      if (!clicked) return;
      const id = clicked.dataset.id;
      handler(id);
    });
  }

  // Remove hidden classes
  _removeHidden(arr) {
    [...arr].forEach(el => el.classList.remove('hidden'));
  }

  _generateMarkup(data) {
    return `
        <div class="popup hidden">
          <div class="popup__content hidden">
            <div class="popup__left">
              <h2 class="heading-secondary">${
                data.pokemon_name.charAt(0).toUpperCase() +
                data.pokemon_name.slice(1)
              } #${data.id}</h2>
              <img
                src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
                  data.id + ''
                ).padStart(3, '0')}.png"
                alt="${data.pokemon_name}.png"
              />
              <div class="popup__compare">
                ${data.types
                  .map(
                    type =>
                      `<span class="span__type--badge badge-${type}">${
                        type.charAt(0).toUpperCase() + type.slice(1)
                      }</span>`
                  )
                  .join('')}
              </div>
              <h4 class="heading-quaternary">Strong Against</h4>
              <div class="popup__compare">
                ${data.strength.strong
                  .map(
                    type =>
                      `<span class="span__type--badge badge-${type}">${
                        type.charAt(0).toUpperCase() + type.slice(1)
                      }</span>`
                  )
                  .join('')}
              </div>
              <h4 class="heading-quaternary">Evolutions</h4>
              <div class="popup__evolutions">
                ${this._generateEvolutions(data)}
              </div>
            </div>

            <div class="popup__right">
              <a href="#" class="popup__close">&times;</a>
              <h3 class="heading-tertiary">Stats</h3>
              <div class="popup__stats">
                <div class="popup__stat">
                  <p class="title">Hp</p>
                  <p class="number">${data.stats[0]}</p>
                  <div class="popup__bar">
                    <div class="popup__bar-stat ${this._checkColor(
                      data.stats[0]
                    )}" style="width: ${data.stats[0]}px;"></div>
                  </div>
                </div>
                <div class="popup__stat">
                  <p class="title">Attack</p>
                  <p class="number">${data.stats[1]}</p>
                  <div class="popup__bar">
                    <div class="popup__bar-stat ${this._checkColor(
                      data.stats[1]
                    )}" style="width: ${data.stats[1]}px;"></div>
                  </div>
                </div>
                <div class="popup__stat">
                  <p class="title">Defense</p>
                  <p class="number">${data.stats[2]}</p>
                  <div class="popup__bar">
                    <div class="popup__bar-stat ${this._checkColor(
                      data.stats[2]
                    )}" style="width:${data.stats[2]}px;"></div>
                  </div>
                </div>
                <div class="popup__stat">
                  <p class="title">Special-Attack</p>
                  <p class="number">${data.stats[3]}</p>
                  <div class="popup__bar">
                    <div class="popup__bar-stat ${this._checkColor(
                      data.stats[3]
                    )}" style="width: ${data.stats[3]}px;"></div>
                  </div>
                </div>
                <div class="popup__stat">
                  <p class="title">Special-Defense</p>
                  <p class="number">${data.stats[4]}</p>
                  <div class="popup__bar">
                    <div class="popup__bar-stat ${this._checkColor(
                      data.stats[4]
                    )}" style="width:${data.stats[4]}px;"></div>
                  </div>
                </div>
                <div class="popup__stat">
                  <p class="title">Speed</p>
                  <p class="number">${data.stats[5]}</p>
                  <div class="popup__bar">
                    <div class="popup__bar-stat ${this._checkColor(
                      data.stats[5]
                    )}" style="width:${data.stats[5]}px;"></div>
                  </div>
                </div>
              </div>
              <h4 class="heading-quaternary">Weak Against</h4>
              <div class="popup__compare">
                 ${data.strength.weak
                   .map(
                     type =>
                       `<span class="span__type--badge badge-${type}">${
                         type.charAt(0).toUpperCase() + type.slice(1)
                       }</span>`
                   )
                   .join('')}
              </div>
              <h4 class="heading-quaternary">Moves</h4>
              <div class="popup__compare">
                ${data.moves
                  .map(
                    move =>
                      `<span class="span__type--move">${
                        move.charAt(0).toUpperCase() + move.slice(1)
                      }</span>`
                  )
                  .join('')}                
              </div>
            </div>
          </div>
        </div>
    `;
  }

  _generateEvolutions(data) {
    let html = '';
    let i = 1;
    for (const property in data.evolutions) {
      const pokeIdString = data.evolutions[property].id + '';
      i;
      html += `
        <div class="popup__evolution">
          <img
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIdString.padStart(
              3,
              '0'
            )}.png"
            alt="${data.evolutions[property].pokemon_name}.png"
            class="img"
          />
          <h6>${
            data.evolutions[property].pokemon_name.charAt(0).toUpperCase() +
            data.evolutions[property].pokemon_name.slice(1)
          } #${data.evolutions[property].id}</h6>
            <div class="popup__compare">
          ${data.evolutions[property].types
            .map(
              (type, i) =>
                `<span class="span__type--badge badge-${type}" style="${
                  i + 1 < data.evolutions[property].types.length
                    ? 'margin-right:5px;'
                    : ''
                }">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`
            )
            .join('')}
            </div>
        </div>    
        ${
          i !== Object.keys(data.evolutions).length
            ? '<div class="arrow"></div>'
            : ''
        }
      `;
      i++;
    }
    return html;
  }

  _checkColor(el) {
    if (el <= 40) return 'color-40';
    if (el <= 80 && el >= 40) return 'color-80';
    if (el <= 110 && el >= 80) return 'color-110';
    if (el >= 110) return 'color-130';
  }
}

export default new popupView();

//(data.evolutions[property].id).padStart(3, '0')
