const {stream, F, C,N, T} = require('parser-combinator');


function quantity(){
    return N.integer;
}

function unit(){

    const combinator= T.blank()
        .thenRight(C.letters)
        .thenLeft(T.blank());

    return combinator;
    //return combinator.opt().map(x=>x.value);
    // problems : no utf-8, no cuillère à café

}

function ingredient(){
    const combinator= C.notString('- ').rep().map(c=>c.join(''));

    return combinator;

}

function structuredLine(){
    return C.string('- ')
        .thenRight( quantity().then(unit()).then(ingredient()));
}

function parse(document){
   return  structuredLine().rep().parse(stream.ofString(document));
}


module.exports={
    structuredLine,
    parse
}
