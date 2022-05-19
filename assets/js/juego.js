/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Swords
 */

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// HTML References

const btnPedir = document.querySelector('#btnPedir');
const puntosHtml = document.querySelectorAll('small');

// Comentario

const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push ( i + tipo);
        }
    }

    for( tipo of tipos ) {
        for( esp of especiales ) {
            deck.push( esp + tipo )
        }
    }

    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
};

crearDeck();

// funcion para tomar cartas

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    return carta;
};

// pedirCarta();

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length -1);
    puntos = ( isNaN( valor )) ? (puntos = ( valor === 'A' ) ? 11 : 10) : (puntos = valor * 1);
    return puntos;
};

// Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHtml[0].innerText = puntosJugador;

    



    return puntosJugador;
});

