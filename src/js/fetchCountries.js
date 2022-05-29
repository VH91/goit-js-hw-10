const url = 'https://restcountries.com/v3.1/name'
function fetchCountries(name) {    
    return fetch(`${url}/${name}?fields=name,capital,population,flags,languages`).then(res => {
        if (res.ok) return res.json();
        else throw new Error("Status code error :" + res.status)
    }).then(arr => {
        return arr;
    });
}
export default fetchCountries;