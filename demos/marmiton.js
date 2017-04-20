const fetch  = require('node-fetch');
const htmlToText = require('html-to-text');
const $ = require('cheerio');
const {stream,F, C,N, X} = require('parser-combinator');
const bundle = require('./marmiton-bundle');

let recipeText;

const marmiton = 'http://www.marmiton.org/recettes/';
const tikka = 'recette_poulet-tikka-massala_21628.aspx';

const selector = 'div.m_content_recette_main .m_content_recette_ingredients';

const test =``;



fetch(marmiton+tikka)
    .then( resp => resp.text())
    .then( html => $(selector, html) )  // cheerio
    .then( ingredientHtml => htmlToText.fromString(ingredientHtml)) // <divs>
    .then(text => {
        try{


        console.log('++++++');
        console.log(text);    return;  // TODO : comment here

        recipeText = text;
        //throw "fail"
        const parsing = line().rep().parse(stream.ofString(test))
        console.log('====== Did we accept the parse ? :');
        console.log(parsing.value);
        }
        catch (e){
            console.log('e',e);
        }
    });


// rep() these lines
function line(){
    return C.string('- ')
        .thenRight(F.not(C.string('- ')).rep().map(c=>c.join('')));
}
