const {Streams, F, C, N, GenLex, getMathGenLex} = require('@masala/parser');
/*
 Implementing general solution :
 E -> T E'
 E' -> + TE'  |  eps
 T -> F T'
 T' -> * FT'  |  eps
 F -> NUMBER | ( E )   (https://en.wikipedia.org/wiki/Operator-precedence_parser)



 * Expr -> SubExpr then OptYieldExpr
 * OptYieldExpr -> YieldExpr.opt()
 * YieldExpr ->  + then SubExpr then YieldExpr
 * PriorExpr -> Terminal then OptPriorExpr
 * OptPriorExpr -> PriorExpr.opt()
 * PriorExpr ->  * then Terminal then OptPriorExpr
 * Terminal -> (Expr)| Number | -Terminal | Expr  // care of priority !

 */


// tokens
const genlex = getMathGenLex();
const {number, plus, minus, mult, div, open, close} = genlex.tokens();

const priorToken = () => mult.or(div);
const yieldToken = () => plus.or(minus);

function terminal() {
    return parenthesis()
        .or(number)
        .or(negative())
        .or(F.lazy(expression))
}

function negative() {
    return minus.drop().then(F.lazy(terminal)).map(x => -x);
}

function parenthesis() {
    return open.drop().then(F.lazy(expression)).then(close.drop())
}

function expression() {
    return priorExpr().flatMap(optYieldExpr);
}


function optYieldExpr(left) {

    return yieldExpr(left).opt()
        .map(opt => opt.isPresent() ? opt.get() : left)
}

function yieldExpr(left) {
    return yieldToken()
        .then(priorExpr())
        .map(([token, right]) =>
            token === '+' ? left + right : left - right)
        .flatMap(optYieldExpr);
}


function priorExpr() {
    return terminal().flatMap(optSubPriorExp);
}

function optSubPriorExp(priorValue) {
    return subPriorExpr(priorValue).opt()
        .map(opt => opt.isPresent() ? opt.get() : priorValue);
}


function subPriorExpr(priorValue) {

    return priorToken().then(terminal())
        .map(([token, left]) => token === '*' ? priorValue * left : priorValue / left)
        .flatMap(optSubPriorExp)
}


function multParser() {

    const parser = expression();

    return genlex.use(parser.then(F.eos().drop()));
}


let parsing = multParser().parse(Streams.ofString('3 + -4/2*5 '));
console.log(parsing.value);