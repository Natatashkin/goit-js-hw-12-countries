import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import './styles.css';
import { alert, Stack } from '@pnotify/core';

const debounce = require('lodash.debounce');

import FetchCountries from './js/fetchCountries';
import countryListTpl from './templates/countries-list.hbs';
import countryInfoTpl from './templates/country-info.hbs';
import { notification } from './js/notify';

const refs = {
  input: document.querySelector('.js-search'),
  countriesMarkup: document.querySelector('.countries')
}

const fetchApiCountries = new FetchCountries();

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  clearCountriesMarkUp();
  fetchApiCountries.query = event.target.value.trim();

  if (fetchApiCountries.query === '') {
    clearInputField();
    notification('error', "Enter country name!");
    return;
  }
  fetchApiCountries.fetchCountriesByName()
    .then(appendCountriesMarkUp).then(clearInputField);
}

function appendCountriesMarkUp(countries) {
  const { length } = countries;
  if (length < 2) {
    refs.countriesMarkup.insertAdjacentHTML('beforeend', countryInfoTpl(countries));
    return;
  }
  
  if (length >= 2 && length <= 10) {
    clearCountriesMarkUp(countries);
    refs.countriesMarkup.insertAdjacentHTML('beforeend', countryListTpl(countries));
    return;
  }
  
  if (length > 10) {
    notification('error', "Too mahy matches found. Please enter a more specific query!");
    return;
  }

  if (countries.status === 404) {
    notification('error', "Enter country name in English!");
    return;
  }

}

function clearCountriesMarkUp(countries) {
  refs.countriesMarkup.innerHTML= '';
}

function clearInputField() {
  refs.input.value = '';
}






