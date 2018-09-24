const fetch  = require('node-fetch');
var h2p = require('html2plaintext')

const $ = require('cheerio');
const {Streams,F, C,N, X} = require('@masala/parser');
const bundle = require('./marmiton-bundle');


let recipeText;


const marmiton = 'http://www.marmiton.org/recettes/';
// Oh, it's one 's' for masala !
const tikka = 'recette_poulet-tikka-massala_21628.aspx';

// marmiton : recipe-ingredients__list
const selector = 'ul.recipe-ingredients__list';

const test =``;



fetch(marmiton+tikka)
    .then( resp => resp.text())
    .then( html => $(selector, html) )  // cheerio
    .then( h2p) // <divs>
    .then(text => {
        try{

        console.log(text);    return;  // TODO : comment here

        recipeText = text;
        //throw "fail"
        const parsing = line().rep().parse(Streams.ofString(recipeText))
        console.log('====== Did we accept the parse ? :');
        console.log(parsing.value);
        }
        catch (e){
            console.log('e',e);
        }
    });


// rep() these lines
function line(){
    return C.string('- ').drop()
        .then(
            F.moveUntil(endOfLine())
        ).then(endOfLine().drop());
}

function endOfLine(){
    return C.char('\n').or(F.eos());
}