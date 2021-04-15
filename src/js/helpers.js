import { TIMEOUT_SEC } from './config';

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Try again.`));
    }, s * 1000);
  });
}

export async function AJAX(url, errMessage = 'An error occured. Try again!') {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (!res.ok) throw new Error(`${errMessage}`);
    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
}

// function timeoutView() {}
