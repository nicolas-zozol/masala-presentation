var ncp = require('ncp');
var rimraf = require('rimraf');


deleteSources();

function displayError(e) {
    console.error(e);
}



function deleteSources() {
    rimraf('./node_modules/@masala/parser/src', deleteBuild, displayError)
}

function deleteBuild() {
    rimraf('./node_modules/@masala/parser/build', copy, displayError);
}


function copy() {
    ncp('../../parsec/build/', './node_modules/@masala/parser/build');
    ncp('../../parsec/src/', './node_modules/@masala/parser/src');
    ncp('../../parsec/masala-parser.d.ts', './node_modules/@masala/parser/masala-parser.d.ts');
    console.log('Done --- \n');
}

