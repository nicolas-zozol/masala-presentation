

const fetch  = require('node-fetch');
var h2p = require('html2plaintext')
const $ = require('cheerio');
const {Streams,F, C} = require('@masala/parser');
const genlex = require('./marmiton-genlex');


let recipeText;


const marmiton = 'http://www.marmiton.org/recettes/';
// Oh, it's one 's' for masala !
const tikka = 'recette_poulet-tikka-massala_21628.aspx';

// marmiton : recipe-ingredients__list
const selector = 'ul.recipe-ingredients__list';





fetch(marmiton+tikka)
    .then( resp => resp.text())
    .then( html => $(selector, html) )  // cheerio
    .then( h2p) // <divs>
    .then(text => {
        try{

            console.log(text);

            let parser =  genlex.use(grammar());
            const parsing = parser.parse(Streams.ofString(text))
            console.log('====== Did we accept the parse ? :');
            console.log(parsing.value);
        }
        catch (e){
            console.log('e',e);
        }
    });

function grammar(){
    let {dash, quantity, unit, ingredient, eol} = genlex.tokens();


    return dash.debug('dash')
        .then(quantity.opt()).debug('quantity')
        .then(unit)
        .then(ingredient)
        .then(eol).debug("Line : ")
        .rep();

}