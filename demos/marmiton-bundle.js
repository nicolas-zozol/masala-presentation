const {F, C,N, X, T} = require('parser-combinator');
const x = new X();

function quantity(){
    return N.integer;
}

function unit(){
    const knownUnits=['cuillère à café', 'g','l', 'ml', 'cuillère', 'cuillères']
    

    const combinator= T.blank()
        .thenRight(x.stringIn(knownUnits))
        .thenLeft(T.blank());

    return combinator;
    //return combinator.opt().map(x=>x.value);

}

function ingredient(){
    const combinator= C.notString('- ').rep().map(c=>c.join(''));

    return combinator;

}

function structuredLine(){
    return C.string('- ')
        .thenRight( quantity().then(unit()).then(ingredient()));
}




module.exports={
    structuredLine
}
