import * as model from './model.js';
import searchView from './views/searchView';
import cardView from './views/cardView';
import popupView from './views/popupView.js';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import 'core-js/stable'; // polyfilling
import 'regenerator-runtime/runtime'; // polyfilling async / await

async function controlSearch() {
  try {
    // Rendering spinner
    cardView.renderSpinner();

    // Getting search query
    const query = searchView.getQuery();

    // Storing pokemon data in state object
    await model.loadCard(query);

    // Rendering card on UI
    cardView.render(model.state.search.pokemon);
  } catch (err) {
    cardView.renderError(err.message);
  }
}

async function controlPopup(id) {
  try {
    await model.loadPopup(id);
    console.log(model.state.search.pokemon);
    popupView.render(model.state.search.pokemon);
  } catch (err) {
    popupView.renderError(err);
  }
}

async function controlResults(type) {
  try {
    // Rendering spinner
    resultsView.renderSpinner();

    // Load all urls into state
    await model.loadAllType(type);

    // Get x urls generate objects, and render them
    resultsView.render(await model.getSearchResultPage());

    // Rendering pagination button
    paginationView.render(model.state);
  } catch (err) {
    resultsView.renderError(err);
  }
}

async function controlPagination(gotoPage) {
  try {
    // Rendering spinner
    resultsView.renderSpinner();

    // Rendering results
    resultsView.render(await model.getSearchResultPage(gotoPage));

    // Rendering pagination buttons
    paginationView.render(model.state);
  } catch (err) {
    paginationView.renderError(err);
  }
}

function init() {
  searchView.addHandlerSearch(controlSearch); // search submit
  popupView.addHandlerOpen(controlPopup); // btn--card
  resultsView.addHandlerClick(controlResults); // nav click
  paginationView.addHandlerClick(controlPagination); // clicking pagination button
}

init();
