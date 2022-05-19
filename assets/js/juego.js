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


const puntosHtml           = document.querySelectorAll('small');
const divCartasJugador     = document.querySelector('#player-cards');
const divCartasComputadora = document.querySelector('#computer-cards')

// Botones

const btnDetener           = document.querySelector('#btnDetener');
const btnNuevoJuego        = document.querySelector('#btnNuevo');
const btnPedir             = document.querySelector('#btnPedir');

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

// Logica computadora

const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();
    
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHtml[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout( () => {
        if ( puntosComputadora === puntosMinimos ) {
            alert('Nadie Gano');
        } else if ( puntosMinimos > 21 || puntosComputadora ===21 ) {
            alert('Computadora Gana!')
        } else if ( puntosComputadora > 21 ){
            alert('Jugador Gana!')
        } else {
            alert('Computadora Gana!')
        }
    }, 500 );

    
    
};


// Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHtml[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21 ) {
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador );
        btnDetener.disabled =true;
    }

});

btnDetener.addEventListener('click', () => {

    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );

});

btnNuevoJuego.addEventListener('click', () => {

    deck.splice(0, deck.length);
    crearDeck();

    puntosHtml[0].innerText = '0';
    puntosHtml[1].innerText = '0';

    divCartasComputadora.innerText = ' ';
    divCartasJugador.innerText = ' ';
    
    puntosComputadora = 0;
    puntosJugador = 0;

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
    
});




