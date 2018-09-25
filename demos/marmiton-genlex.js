const {Streams, F, C, N, GenLex} = require('@masala/parser');

/**

 We need to cheat and start with a test extraction
 Creating a bundle to split line with functions :
 - quantity
 - unit
 - ingredient
 **/

function quantity() {
    return N.integer();
}

function unit() {
    //const knownUnits = ['cuillère à café', 'g', 'l', 'ml', 'cuillère', 'cuillères']
    //F.stringIn(knownUnits)
    return C.letters();
}

function ingredient() {
    return F.moveUntil(endOfLine());
}

function endOfLine() {
    return C.char('\n').or(F.eos());
}

const genlex = new GenLex();

genlex.tokenize(C.char('-'), 'dash', 2000);
genlex.tokenize(quantity(), 'quantity');
genlex.tokenize(unit(), 'unit');
genlex.tokenize(ingredient(), 'ingredient', 9000);
genlex.tokenize(endOfLine(), 'eol');

module.exports = genlex;


