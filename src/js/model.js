import { AJAX } from './helpers';
import { createStrength } from './helperModel';
import { createEvo } from './helperModel';

export const state = {
  results: [],
  resultsDisplay: [],
  page: 1,
  resultsPerPage: 6,
  search: {
    query: '',
    pokemon: {},
  },
};

function createCardObject(data) {
  return {
    id: data.id,
    pokemon_name: data.name,
    types: data.types.map(el => el.type.name),
    height: data.height,
    weight: data.weight,
  };
}

export async function loadCard(query) {
  try {
    const dataPoke = await AJAX(
      `https://pokeapi.co/api/v2/pokemon/${query}/`,
      `Pokemon you searched for doesn't exist. Try with pikachu or poliwrath :)!`
    );
    state.search.query = query;
    if (dataPoke.name.includes('-'))
      throw new Error(
        `Pokemon you searched for doesn't exist. Try with pikachu or poliwrath :)!`
      );
    state.search.pokemon = createCardObject(dataPoke);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createPopupObject(data) {
  try {
    return {
      id: data.id,
      pokemon_name: data.name,
      types: data.types.map(el => el.type.name),
      moves: data.moves.slice(0, 5).map(el => el.move.name),
      stats: data.stats.map(el => el.base_stat),
      strength: await createStrength(data.types.map(el => el.type.url)),
      evolutions: await createEvo(data.id),
    };
  } catch (err) {
    throw err;
  }
}

export async function loadPopup(id) {
  try {
    const dataStat = await AJAX(`https://pokeapi.co/api/v2/pokemon/${id}`);
    state.search.pokemon = await createPopupObject(dataStat);
  } catch (err) {
    throw err;
  }
}

export async function loadAllType(type) {
  try {
    const url =
      type === 'all'
        ? `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800`
        : `https://pokeapi.co/api/v2/type/${type}/`;
    state.results = await AJAX(url);

    // Removing all pokemons that have "-" in name since lot of them don't have img
    type === 'all'
      ? (state.results = state.results.results
          .filter(el => !el.name.includes('-'))
          .map(el => el.url))
      : (state.results = state.results.pokemon
          .filter(el => !el.pokemon.name.includes('-'))
          .map(el => el.pokemon.url));

    state.page = 1;
  } catch (err) {
    throw err;
  }
}

export async function getSearchResultPage(page = state.page) {
  try {
    state.page = page;

    const start = (page - 1) * state.resultsPerPage;
    const end = page * state.resultsPerPage;
    state.resultsDisplay = state.results.slice(start, end);
    let curr;
    const arr = [];
    for (const el of state.resultsDisplay) {
      curr = await AJAX(el);
      arr.push(curr);
    }

    return arr.map(el => createCardObject(el));
  } catch (err) {
    throw err;
  }
}
