# Masala Parser
 
# Authors

* Didier Plaindoux
* Nicolas Zozol


# Origins

* Direct Style Monadic Parser Combinators For The Real World
* Haskell **Parsec**
* Existing in JS: Jison, Bennu (Kephri) 


# Use cases (as today)

* Alternative for Lex & yacc
* Extract data from a big text, replace complex regexp
* Validate complete structure with variations
* Note taking with very customized markdown


Keywords: **variations** and **maintainability**


# Interesting points

* Works in the browser
* Zero dependence
* 400 unit & integration tests 
* 100% coverage
* API now stable
* Typescript d.ts (not tested enough)


# Quick Examples


## Live Demos:
 
* Floor Notation
* Tikka Masala
* Operation

# Explanations

## Floor notation


        // N: Number Bundle, C: Chars Bundle
        import {stream, N,C} from 'parser-combinator';
        const document = '|4.6|';
        
        const floorCombinator= C.char('|')
                                .thenRight( N.numberLiteral )    // we had [ '|' , 4.6], we keep 4.6
                                .thenLeft( C.char('|') )   // we had [ 4.6 , '|' ], we keep 4.6
                                .map(x => Math.floor(x)); // we transform selected value in meaningful value
        
        // Parsec needs a stream of characters
        const parsing = floorCombinator.parse(stream.ofString(document));
        
        console.log( parsing.value === 4 );





## Definition

*in functional programming, a parser combinator is a 
higher-order function that accepts several parsers as input and returns a new 
parser as its output.*
 
!image : curry-paste.jpg

## The Monoid structure

  
!image : parsec.png
  


# Core bundles


* Streams
* Class `Parser`
* CharBundle, NumberBundle, FlowBundle
* Genlex: ParserStream

... Live demo


## The Flow Bundle
 
The flow bundle will mix ingredients together.

* `F.try(parser).or(otherParser)` 
* `F.not(parser)`: Accept anything else   
* `F.eos`: Accepted if the Parser has reached the **E**nd **O**f **S**tream

Others:

* `F.lazy`: Makes a lazy evaluation.
    - May be used for Left recursionue 



## The Chars Bundle


* `letter`: accept an ascii letter 
* `letters`: accepts many letters and returns a string
* `char(x)`: accept if next input is `x`
* `lowerCase`: accept any next lower case inputs
*  ...

## The Numbers Bundle

* `numberLiteral`: accept any float number, such as -2.3E+24    
* `digit`: accept any single digit, and return a **single char** 
* `digits`: accept many digits, and return a **string**.
* `integer`: accept any positive or negative integer

## Live demo

.. improving parsing

# The Standard bundles

## Under development

* Json Parser
* Bricks for custom markdown
* 2 paying clients
    - Extractor
    - Markdown (quick notes)


## Lotech

* Markdown for those who write a lot
* Business specific plugins and mini-application
* `!bang`: specific command with autocompletion
* `!!bangbang`: newbie popup, access to apps (table, ...)

### Quizz Example


        !quizz: La renaissance

<br/>        
        
        !q: Quelle année pour Marignan ?        
        
        ** 1515
        * 1525
        * 1625
        
<br/>
        
        !include: @jeanne/renaissance 


### Course Example

... 95% pure markdown

        !image class=right: gutenberg.jpg

<br/>
        
        !image size=small right=right: @nicolas/renaissance.jpg        
        !image small right: @nicolas/renaissance.jpg
     
<br/>
          
        !! => 'bang-bang' ; ouvre une boite de dialogue applicative
            tableaux, addons, ...


### Task Force

* Mini-app
* Json pur < Lotech < Interface graphique
 
<br/>

        !task: ranger le bureau       
        !team name=Bricolo: Réparer des choses faciles
        !captain: Nicolas
        * Magali
        * Your name here

<br/>
        
        !team name=Menuiserie: Fermer la cage d'escalier
        !captain: Pascal
        *  Your name here
       




## Gotcha's

* Hard to debug, especially Genlex 
* Sometimes locked (`optrep().rep()`)

## Questions ?