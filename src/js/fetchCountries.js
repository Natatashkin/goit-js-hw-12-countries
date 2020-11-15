import { error } from "@pnotify/core";

export default class FetchCountries {
    constructor() {
        this.searchQuery = '';
    }

    fetchCountriesByName() {
        return fetch(`https://restcountries.eu/rest/v2/name/${this.searchQuery}`)
            .then(resp => (resp.ok)
            ? resp.json()
            : Promise.reject('is not ok: ' + resp.status)
            )
            .then(countries => {
                return countries;
            })
    }


    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

