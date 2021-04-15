export default class View {
  render(data) {
    this._data = data;
    const markup = this._generateMarkup(data);

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="welcome">
        <img src="/pokeball.4aaa0667.png" alt="PokeBall" class="spinner">
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderError(msg) {
    this._clear();
    const html = `
      <div class="welcome">
        <p class="welcome-text">${msg}</p>
        <img src="/pikachu-error.e99fb3e3.png" alt="Error img" class="welcome-img">
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }
}
