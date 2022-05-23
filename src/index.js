import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const refs = {
  searchBox: document.querySelector('[data-search]'),
  countryList: document.querySelector('[data-list]'),
  countryInfo: document.querySelector('[data-info]'),
};

function onSearch(e) {
  const query = e.target.value.trim();

  if (query === '') {
    removeElement(refs.countryInfo);
    removeElement(refs.countryList);
    return;
  }

  fetchCountries(query)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }

      renderMarkup(data);
    })
    .catch(err => {
      removeElement(refs.countryInfo);
      removeElement(refs.countryList);
      console.log(err);
    });
}

function renderMarkup(matches) {
  if (matches.length > 1) {
    refs.countryList.innerHTML = makeCountryList(matches);
    removeElement(refs.countryInfo);
  } else {
    refs.countryInfo.innerHTML = makeCountryInfo(matches);
    removeElement(refs.countryList);
  }
}

function makeCountryList(matches) {
  return matches
    .map(
      ({ flags, name }) =>
        `<ul class-"country-list"> 
            <li class="list__item ">
               <img class="list__img" src="${flags.svg}" alt="${name.official}" width="60" height="40">
               <p class="list__text">${name.official}</p>
            </li>
        </ul>`,
    )
    .join('');
}

function makeCountryInfo(matches) {
  return matches
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<div class="country__container">
            <div class="flex items-center gap-3">
               <img src="${flags.svg}" alt="${name.official}" width="40px" height="20px"/>
               <h1 class="country__name">${name.official}</h1>
            </div> 
            <ul>
               <li class="py-2"><strong>Capital: </strong> ${capital}</li>
               <li class="py-2"><strong>Population: </strong> ${population}</li>
               <li class="py-2"><strong>Languages: </strong> ${Object.values(languages)}</li>
            </ul> 
         </div>
      `,
    )
    .join('');
}

function removeElement(el) {
  el.innerHTML = '';
}

refs.searchBox.addEventListener('input', debounce(onSearch, 300));
