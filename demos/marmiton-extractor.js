const {stream, F, C, N, X, T} = require('parser-combinator');


/**
Using the Extractor Bundle to help us
 - In combinaotr(): Using x.wordsUntil(lineStop) to work correctly
 - find good units
 - Escaping Html, Using debug to find where we are
 - Using the Flow bundle
 **/


const lineStop = C.string('- ');
let x = new X();



function quantity() {
    return N.integer;
}

function unit() {
    const knownUnits = ['cuillère à café', 'g', 'l', 'ml', 'cuillère', 'cuillères']
    
    const combinator = T.blank()
        .thenRight(x.stringIn(knownUnits))
        .thenLeft(T.blank());


    return combinator.opt().map(v=>v.value);

}

function ingredient() {
    const html = C.char('[')
        .then(C.notChar(']').rep())
        .then(C.char(']'))
        .debug('HTML');

    const ignore = html.or(T.eol).map(c=>'');

    // We could also be using x.wordsUntil(html), but some lines have not
    return F.try(ignore).or(F.not(lineStop)).rep().map(c=>c.join(''));

}

function structuredLine(){
    return lineStop
        .thenRight( quantity().then(unit()).then(ingredient()));
}

function marmitonCombinator() {
    return x.wordsUntil(lineStop).thenRight(structuredLine().rep());
}

function parse(document){
   return  marmitonCombinator().parse(stream.ofString(document));
}

module.exports = {
    marmitonCombinator,
    parse
}
