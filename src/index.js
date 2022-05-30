import './css/styles.css';
import debounce  from 'lodash.debounce'
import ref from './js/ref_comp' 
import fetchCountries from './js/fetchCountries'
import Notiflix from 'notiflix';
import countryItems from './templates/countryList.hbs'
import countryCard from './templates/countryCard.hbs'

const DEBOUNCE_DELAY = 300;
ref.searchBox.addEventListener("input", debounce(inputCountry, DEBOUNCE_DELAY))

function inputCountry(e) {    
    let name = e.target.value.trim();
    resetList();
    resetCard();
        fetchCountries(name).then(data => {
            if (data.length > 10) {
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
            if (data.length > 1 && data.length < 11) {
                let markup = data.map(countryItems);                
                ref.listCountry.innerHTML = markup.join("");
               
            }
            if (data.length === 1) { 
                let markup = countryCard(data[0])
                ref.infoCountry.innerHTML = markup;
                
            }
        }).catch(err => {
            
            Notiflix.Notify.failure("Oops, there is no country with that name");
            
        });
    
}

function resetList() {
    ref.listCountry.innerHTML = "";
}
function resetCard() {
     ref.infoCountry.innerHTML = "";
}
