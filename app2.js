document.addEventListener('DOMContentLoaded', loadGame);
const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
const fin = document.querySelector('body');
const time = document.querySelector('.time');
let secs = document.querySelector('#sec');
let mins = document.querySelector('#min');

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let clickedCardsArray = [];

const btn = document.querySelector('#but');

let clickCount = 0;

const cardArray = [
    {
        name:'black&white',
        img:'img/black&white.jpg'
    },
    {
        name:'black&white',
        img:'img/black&white.jpg'
    },
    {
        name:'blue-skies',
        img:'img/blue-skies.png'
    },
    {
        name:'blue-skies',
        img:'img/blue-skies.png'
    },
    {
        name:'cliffs',
        img:'img/cliffs.png'
    },
    {
        name:'cliffs',
        img:'img/cliffs.png'
    },
    {
        name:'countryside',
        img:'img/countryside.jpg'
    },
    {
        name:'countryside',
        img:'img/countryside.jpg'
    },
    {
        name:'pool',
        img:'img/pool.jpg'
    },
    {
        name:'pool',
        img:'img/pool.jpg'
    },
    {
        name:'stars',
        img:'img/stars.jpg'
    },
    {
        name:'stars',
        img:'img/stars.jpg'
    },
    {
        name:'trees',
        img:'img/trees.jpg'
    },
    {
        name:'trees',
        img:'img/trees.jpg'
    },
    {
        name:'sand',
        img:'img/sand.jpg'
    },
    {
        name:'sand',
        img:'img/sand.jpg'
    }
];

cardArray.sort(() => 0.5 - Math.random());

function loadGame(){
    cardArray.forEach((allCards, idx) => {
        allCards = document.createElement('img')
        allCards.setAttribute('src', 'img/blank.png')
        allCards.setAttribute('data-id', idx);
        allCards.addEventListener('click', flipCard) 
     grid.appendChild(allCards)
     })
}

function flipCard(e){
    const clickedCard = e.target;
  
    if(clickedCardsArray.includes(clickedCard)){
        console.log('You Idiot....this has already been clicked')
    } else{
        clickedCardsArray.push(clickedCard);
        console.log('sent to cards clicked array')
    }

    var cardID = clickedCard.getAttribute('data-id'); 

    if (cardsChosenId.includes(cardID)){
        return;
    } else{
        cardsChosen.push(cardArray[cardID].name);
        cardsChosenId.push(cardID);
     
        
        clickedCard.setAttribute('src', cardArray[cardID].img);
        if(cardsChosen.length === 2){
            setTimeout(() => {
                checkForMatch(cardID, clickedCard)
            }, 500);
        }
    }
}

function checkForMatch(cardID, clickedCard){
    //console.log(clickedCard);
    var cards = document.querySelectorAll('img');
    
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    //optionOneId.removeEventListener('click', flipCard);
    console.log(cardsChosen);
    console.log(optionOneId, optionTwoId);

    if(cardsChosen[0] === cardsChosen[1]){
        console.log('you found a match');
        cards[optionOneId].setAttribute('src', 'img/white.png');
        cards[optionTwoId].setAttribute('src', 'img/white.png');
        cardsWon.push(cardsChosen);
        console.log('you have found this pair...well done');
        setTimeout(() => {
            clickedCardsArray.forEach(card => {
                console.log(card);
                card.removeEventListener('click', flipCard);
                
            })
        }, 100);
        
    } else{
        cards[optionOneId].setAttribute('src', 'img/blank.png');
        cards[optionTwoId].setAttribute('src', 'img/blank.png');
        console.log('Sorry try again');
        clickedCardsArray = [];
    }
    // !important - clear the arrays to check again if cards selected
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length; 
    if(cardsWon.length === cardArray.length/2){
        fin.classList.add('active');
        clearInterval(gameTimer);
    }

}
// setInterval(() => {
//     time.innerText = ` 0${minutes}:${count}`;
//     count ++;
    
//     (count >= 10) ? time.innerText = ` ${minutes}:${count}`: '';
    
//      if(count > 60){
//         minutes ++;
//         count = 00;
//         count ++;
//         time.innerText = ` 0${minutes}:${count}`;
//     }

  
// }, 1000);

var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }

let newMins = parseInt(mins);


const gameTimer = setInterval(() =>{
    secs=pad(++sec%60);
    mins=pad(parseInt(sec/60,10));
    time.innerText = ` ${mins}:${secs}`
    //console.log(time.innerHTML);    

    mins > 2 ? clearInterval(gameTimer) : '';

}, 1000);

