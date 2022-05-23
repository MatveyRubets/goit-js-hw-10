import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ERROR_MSG = 'Oops, there is no country with that name';
const BASE_URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(res => {
    if (res.ok) {
      return res.json();
    }

    Notify.failure(`${ERROR_MSG}`, { clickToClose: true });
    throw new Error(res.statusText);
  });
}
