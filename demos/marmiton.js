const fetch  = require('node-fetch');
const htmlToText = require('html-to-text');
const $ = require('cheerio');
let recipeText;


const marmiton = 'http://www.marmiton.org/recettes/';
const tikka = 'recette_poulet-tikka-massala_21628.aspx';

const selector = 'div.m_content_recette_main .m_content_recette_ingredients';

fetch(marmiton+tikka)
    .then( resp => resp.text())
    .then( html => $(selector, html) )  // cheerio
    .then( ingredientHtml => htmlToText.fromString(ingredientHtml)) // <>
    .then(text => console.log(text));


