const {F, C, N, X, T} = require('parser-combinator');
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

    //let combinator= x.words().rep();
    const word = F.try(ignore).or(C.notString('- ')).rep().map(c=>c.join(''));

    let combinator = word;

    return combinator;

}

function structuredLine(){
    return lineStop
        .thenRight( quantity().then(unit()).then(ingredient()));
}

function marmitonCombinator() {
    return x.wordsUntil(lineStop).thenRight(structuredLine().rep());
}


module.exports = {
    marmitonCombinator
}
