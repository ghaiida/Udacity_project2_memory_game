/*
 * Create a list that holds all of your cards
 */

 const cards = ["far fa-gem"         , "far fa-gem",
                 "fa fa-anchor"      , "fa fa-anchor" ,
                "fa fa-bomb"         , "fa fa-bomb",
                "far fa-paper-plane" , "far fa-paper-plane",
                "fa fa-cube"         , "fa fa-cube", 
                "fa fa-leaf"         , "fa fa-leaf",
                "fa fa-bolt"         , "fa fa-bolt",
               "fa fa-bicycle"       , "fa fa-bicycle" ];

// cards board
const cardsBoard       = document.querySelector('#board');
const movesCount       = document.querySelector('.moves-count');
const star             = document.querySelectorAll('.star');
const starsForRate     = document.querySelector('.stars');
const houre            = document.querySelector('.hours');
const minutes          = document.querySelector('.minutes');
const seconds          = document.querySelector('.seconds');
const restartBotton    = document.querySelector('#restart');
const totalTimer       = document.querySelector("#timer");
const totalMoves       = document.querySelector(".moves");

/*Model*/
const modal            = document.querySelector('.modal');
const timeModal        = document.querySelector('.timeModal');
const moveCountModal   = document.querySelector('.moves-countModal');
const starsModal       = document.querySelector('.starsModal');
const buttonModal      = document.querySelector('.replay-bttn');
const closeBut         = document.querySelector('.close');

 
////////////////////////////////////////////////////////////

let openCards = [];
let matchCard = [];
let moves     = 0;
let time      = 0;
let timeCounter;
let flag      = false;

////////////////////////////////////////////////////////////



/*Deck Creation*/

function creatCardsBoard() {

    // To clear the old card board 
    cardsBoard.innerHTML = "";
    // creat new ul element to append it to "cardsBoard"
    const myNewDeck = document.createElement('ul');
    myNewDeck.classList.add('deck');
    // shuffle the icons list
    let shufIcons = shuffle(cards);
    for (let i = 0; i < shufIcons.length; ++i) {
        const Li = document.createElement('li');
        Li.classList.add('card');
        Li.innerHTML = `<i class="${shufIcons[i]}"></i>`;
        myNewDeck.appendChild(Li);
    }
    cardsBoard.append(myNewDeck);
}



/*click the card and start timer and (match / unmath) 2 cards */
function openCardClicked(event){
      

     let targetCard = event.target;

    if(targetCard.classList.contains("card") &&
    	!targetCard.classList.contains("open", "show","match")) {
         if(flag == false){
           flag= true;
           startTimer();
          }
        targetCard.classList.add("open", "show");
    	openCards.push(targetCard);
}

    if(openCards.length == 2){
        cardsBoard.classList.add("stop-event");
        moveCount();
        // if the cards are matched 
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            matched();
        } else {
            // if they aren't matched 
            setTimeout(notMatched, 800);
        }
        
          gameEnd();
    }

}


/*the counter*/
 function startTimer() {

    timeCounter = setInterval(function() {
     ++time;
     let hour    = Math.floor(time/3600);
     let mins    = Math.floor((time - hour*3600)/60);
     let second  = time - (hour * 3600 + mins*60);
         
     houre.innerHTML     =  hour;
     minutes.innerHTML   =  mins; 
     seconds.innerHTML   =  second;
          },1000 );

}


// if the cards are matched 
function matched() {
    // add class match to both cards
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    // push both cards to the matchedCards array
    matchCard.push(openCards[0]);
    matchCard.push(openCards[1]);
    // remove cards from checkCards array
    openCards = [];
    // to allow opening and checking two cards again
    cardsBoard.classList.remove("stop-event");
}


// if the cards are not matched 
function notMatched() {
    openCards[0].classList.remove("open", "show");
    openCards[1].classList.remove("open", "show");
    openCards = [];
    cardsBoard.classList.remove("stop-event");
}
 

//count move in the borde
function moveCount() {
    moves++;
    movesCount.innerHTML=moves;

    startRate();
}


 //stars Rating
function startRate(){
    if (moves == 16){
        star[0].style.color = 'gray';
    }else if(moves == 20){
        star[1].style.color= 'gray';
    }else if(moves == 25){
        star[2].style.color= 'gray';
    }

 }


//restarting the game
 function restart() {
    
    flag     = false;
    openCards= [];
    matchCard= [];
    moves    = 0;
    time     = 0;
    //clean the timer
     clearInterval(timeCounter);
     creatCardsBoard();
    movesCount.innerHTML= 0;
   
     houre.innerHTML     =  0;
     minutes.innerHTML   =  0; 
     seconds.innerHTML   =  0;  
     star[0].style.color = '#ffcd00';
     star[1].style.color = '#ffcd00';
     star[2].style.color = '#ffcd00';
    
 }


//game over display the model
 function gameEnd(){
    if (matchCard.length == 16){
        modal.classList.add('modal');
        modal.style.display       = 'block';
        clearInterval(timeCounter);
        timeModal.innerHTML       = totalTimer.innerHTML;
        moveCountModal.innerHTML  = totalMoves.innerHTML;
        starsModal.innerHTML      = starsForRate.innerHTML;
        moveCountModal.innerHTML  = movesCounter.innerHTML;
        }

 }


  /*replay button in model and close model*/

  closeBut.addEventListener('click',function(){
    modal.style.display ='none';
  })

  buttonModal.addEventListener('click',function(){
    modal.style.display = 'none';
    restart();
  })
 

/*start the game from here the first time */
creatCardsBoard();
 cardsBoard.addEventListener('click', openCardClicked);
restartBotton.addEventListener('click',restart);
 

 ////////////////////////////////////////////////////////////  
// Shuffle function from http://stackoverflow.com/a/2450976//
////////////////////////////////////////////////////////////

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


