import { AJAX } from './helpers';

// Function returns object containing strong and weak against types
export async function createStrength(arr) {
  try {
    let curr;
    const data = [];

    // Looping trough url's, requesting data and storing into data array
    for (const el of arr) {
      curr = await AJAX(el);
      data.push(curr);
    }

    // Taking out only damage_relations properties and creating new arr
    const strength = data.map(el => el.damage_relations);

    // Array we will use to store all strengs with
    const strNoConcat = [];
    strength.forEach(el => {
      for (const [key, value] of Object.entries(el)) {
        strNoConcat.push(value.map(val => val.name));
      }
    });

    // Array we will use to concatinate strengths of each type
    let strConcat = [];
    for (let i = 0; i < strNoConcat.length; i++) {
      if (strNoConcat.length === 6) {
        strConcat.push(strNoConcat);
        strConcat = strConcat[0];
        break;
      }
      if (i < strNoConcat.length / 2) {
        strConcat[i] = [...strNoConcat[i], ...strNoConcat[i + 6]];
      }
    }

    // Creating each set for either strong against or weak against
    const setStrong = [
      ...new Set([strConcat[1], strConcat[2], strConcat[4]].flat()),
    ];

    // Removing items setStrong contains
    const setWeak = [
      ...new Set([strConcat[0], strConcat[3], strConcat[5]].flat()),
    ].filter(el => !setStrong.includes(el));

    return {
      strong: setStrong,
      weak: setWeak,
    };
  } catch (err) {
    throw err;
  }
}

// Returns evolution object
export async function createEvo(id) {
  try {
    const data = await AJAX(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const evoData = await AJAX(`${data.evolution_chain.url}`);
    let chain = evoData.chain;
    const helper = {};

    // As soon as chain's evolves_to property is empty, break loop
    do {
      helper[`${chain.species.name}`] = await AJAX(
        `${chain.species.url.replace('-species', '')}`
      );
      if (chain.evolves_to.length === 0) break;
      chain = chain.evolves_to[0];
    } while (5 > 3);

    const evoObj = {};

    // Creating object of objects containing data for each of the evolution stage of a single pokemon
    for (const [key, value] of Object.entries(helper)) {
      evoObj[`${key}`] = {
        id: value.id,
        pokemon_name: value.name,
        types: value.types.map(el => el.type.name),
      };
    }
    return evoObj;
  } catch (err) {
    throw err;
  }
}
