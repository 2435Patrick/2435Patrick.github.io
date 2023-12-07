/*----- constants -----*/
/**
 * La variable winningCombos est une constante qui représente toutes les combinaisons possibles pour remporter le jeu
 */
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/

let board; //Tableau des carreaux possible
let turn = 'X';//Set le Tour des personnes

// ce que j'ai ajouter
let win;//Set le Gagnant au fin de tour
let point_X = 0; //Variable de point des X
let point_O = 0; //Variable de point des O
let active_by_restart; //S'active seulement si click sur restart








/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);

/**
 * cette ligne de code crée un tableau appelé squares, contenant les références aux éléments <div> qui représentent les carrés du plateau de jeu
 */
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


/**
 *la fonction getWinner parcourt toutes les combinaisons gagnantes possibles du jeu
  et détermine si l'une d'entre elles est remplie par un seul joueur
  elle affiche le gagnant dans le cas contraire elle affiche null ou continue le jeu
 */

function getWinner() 
{
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
};


/**
 *  la fonction handleTurn gère le tour d'un joueur lorsqu'un carré est cliqué. 
 * Elle vérifie si le carré est vide, s'il n'y a pas encore de gagnant
 * 
 */

function handleTurn()
 {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    if(board[idx] == "" && win == null) 
    {
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    active_by_restart = false;
    render();
    }
    
};




/**
 * La fonction init est une fonction d'initialisation qui est utilisée pour préparer le jeu Tic Tac Toe 
 * Elle est appelée au début du jeu et également lorsque le bouton de réinitialisation est cliqué.
 * Nous utilisons une variable appelée active_by_restart pour indiquer si la partie a été redémarrée
 * cette fonction init est comme le debut d'une nouvelle partie
 */
function init() 
{
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    active_by_restart = true;
     //la variable `win` à `null`, indiquant qu'il n'y a pas encore de gagnant
    win = null
    render();
};





/**
 * Modifie le message affiché en fonction de l'état du jeu
     Si c'est une égalité cette fonction (win === 'T'), affiche "Egalite"
     Si quelqu'un a gagné (win est défini), affiche "${win} A GAGNE"
     Sinon, affiche "C'est le tour de ${turn}"
     ce que j'ai modifier ici c'est le message qu'on affiche lorsqu'un deux joueur a gagner
     La condition `win == "O" || win == "X"` vérifie si quelqu'un a gagné
     La condition `active_by_restart == false` vérifie si la partie n'a pas été redémarrée
     Si ces conditions sont remplies, donne un point au gagnant de la partie
 */

function render()
 {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
    });
   
    messages.textContent = win === 'T' ? `Egalité` : win ? `${win} a Gagné` : `C'est le tour de ${turn}`; 
    if(win == "O" || win == "X" && active_by_restart == false) //donne un point au gagnant de la partie
    {
    if(win == "O")
    {
    point_O++
    }
 
    if(win == "X")
    {
    point_X++
    }
 
    }
    
    console.log("Les O ont " + point_O + " point");
    console.log("Les X ont " + point_X + " point");

    // Cette ligne utilise l'API localStorage pour stocker des données sur le navigateur client.
    //localStorage.setItem prend deux arguments : la clé (dans ce cas, "Les X ont gagné") et la valeur (le nombre de victoires du joueur "X", représenté par point_X)
    // Cette ligne stocke donc le nombre de victoires du joueur "X" ou "O" avec soit "Les X ont gagné" ou "Les O ont gagné"
    localStorage.setItem("Les X ont gagné", point_X ,"fois");
    localStorage.setItem("Les O ont gagné", point_O ,"fois");  
    };

init();

/**
     * Génére une couleur aléatoire pour le fond 
     *  */
    /**
     * Change le fond du body de la page avec la couleur 
     *  */
    /**
     * Cela parcourt tous les carrés du jeu et change leur couleur de fond pour une couleur aléatoire 
     * en mettant le footer et le body dans une culeur uniforme
     */ 
    /**
 * Ajout un écouteur d'événements au nouveau bouton pour déclencher la fonction de changement de fond
 *  */ 

function changeBackgroundColor() 
{
     
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
    let squares = document.querySelectorAll(".square");
    for (let i=0 ; i<squares.length ; i++) 
    {
        squares[i].style.backgroundColor=randomColor;
    }
    let footer = document.querySelector('footer');
    footer.style.backgroundColor = randomColor;
};

/**
 * Ajout un écouteur d'événements au nouveau bouton pour déclencher la fonction de changement de fond
 *  */ 
document.getElementById('change-bg-button').addEventListener('click', changeBackgroundColor);








 

 


 
 

 

 

 

