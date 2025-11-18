var images = [
  "https://drive.google.com/thumbnail?id=1AAtjAYL7NEWVCFh_FjMa_EtcIa92gP1k",
  "https://drive.google.com/thumbnail?id=1obCglLtytSO8CkGQLunoQ1MVarpfaSyX",
  "https://drive.google.com/thumbnail?id=1Uy-7KAdtSaXHm8x_Olh9jCVWFWnv7QTU",
  "https://drive.google.com/thumbnail?id=1dMZy6qRjvSydE5Hnprsq5oToBHkwKP9t",
  "https://drive.google.com/thumbnail?id=18W-jZRkANH06HpsrTGH-H9JV4TxPU74O",
  "https://drive.google.com/thumbnail?id=1pQOskzoYn-ePub_-Nt5mArlGO75bGbs0",
  "https://drive.google.com/thumbnail?id=1Pw-HKidZX8SiOxzp71yz0WeDIHpblpYS",
  "https://drive.google.com/thumbnail?id=16-Au21USAtXI4Zi8vK8WWHY0MzmNSxpd"
];

var firstCard = null;
var secondCard = null;
var canFlip = true;
var matches = 0;
var moves = 0;
var seconds = 0;
var timerRunning = false;
var timerInterval;


function startGame() {
    var gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  var cardImages = images.concat(images);
  cardImages.sort(() => Math.random() - 0.5);
            
  for (var i = 0; i < cardImages.length; i++) {
  var card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '<div class="card-front"><i class="fas fa-heart"></i></div>' +
                  '<div class="card-back"><img src="' + cardImages[i] + '"></div>';
    card.onclick = flipCard;
    card.dataset.image = cardImages[i];
    gameBoard.appendChild(card);
  }
            
  firstCard = null;
  secondCard = null;
  canFlip = true;
  matches = 0;
  moves = 0;
  seconds = 0;
  timerRunning = false;
            
  updateStats();
  clearInterval(timerInterval);
}

function flipCard() {
  if (!canFlip) return;
  if (this.classList.contains('flipped')) return;
  if (this.classList.contains('matched')) return;
            

  if (!timerRunning) {
    startTimer();
  }
            
  this.classList.add('flipped');
            
  if (firstCard == null) {
    firstCard = this;
  } else {
    secondCard = this;
    canFlip = false;
    moves++;
    updateStats();
    checkMatch();
  }
}

function checkMatch() {
    var match = firstCard.dataset.image == secondCard.dataset.image;
            
    if (match) {
        setTimeout(function() {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matches++;
            updateStats();
            resetCards();
                    
            if (matches == 8) {
                endGame();
            }
        }, 500);
    } else {
        setTimeout(function() {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  canFlip = true;
}

function startTimer() {
  timerRunning = true;
  timerInterval = setInterval(function() {
    seconds++;
    updateStats();
  }, 1000);
}

function updateStats() {
  document.getElementById('moves').textContent = moves;
  document.getElementById('matches').textContent = matches + '/8';
            
  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;
  if (secs < 10) secs = '0' + secs;
  document.getElementById('time').textContent = mins + ':' + secs;
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = document.getElementById('time').textContent;
    document.getElementById('winModal').classList.add('show');
}

function newGame() {
  document.getElementById('winModal').classList.remove('show');
  clearInterval(timerInterval);
  startGame();
}

startGame();   cardImages.sort(function() {
        return Math.random() - 0.5;

    });
