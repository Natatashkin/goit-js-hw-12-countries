export default class FetchCountries {
    constructor() {
        this.searchQuery = '';
    }

    fetchCountriesByName() {
        return fetch(`https://restcountries.eu/rest/v2/name/${this.searchQuery}`)
            .then(response => response.json())
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