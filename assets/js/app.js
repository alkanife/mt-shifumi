// Particles
particlesJS.load('particles-js', 'assets/js/particlesjs-config.json');

// game
const roundElement = document.getElementById('round');
const piglinScoreElement = document.getElementById('piglin-score');
const playerScoreElement = document.getElementById('player-score');
const dialogBoxElement = document.getElementById('dialog-box');
const dialogTextElement = document.getElementById('dialog-text');
const choiceTitleElement = document.getElementById('choice-title');
const replayDiv = document.getElementById('replay');
const replayImage = document.getElementById('replay-image');

let choiceElement;
let userChoice;
let computerChoice;
let playing;
let countdown;
let roundCount;
let intervalId;
let playerScore;
let piglinScore;

newGame();

function startGame(element, choice) {
    // If already playing (counting), do nothing
    if (playing) {
        return;
    }

    // set variables
    userChoice = inputToString(choice);
    choiceElement = element;

    // Reset box
    dialogTextElement.innerText = '';
    dialogBoxElement.classList.remove('flex-dialog-box');

    updateDialogHeader();

    // Lock game
    playing = true;
    element.classList.toggle('force-border');

    // Do 3... 2... 1...
    intervalId = setInterval(count, 1000);
}

function count() {
    if (countdown === 0) {
        clearInterval(intervalId);
        play();
        return;
    }

    let countValue = 'Mi'

    if (countdown === 3) {
        countValue = 'Shi';
    } else if (countdown === 2) {
        countValue = 'Fu'
    }

    print(`${countValue}...`)
    countdown--;
}

function play() {
    let random = Math.floor(Math.random() * 3); // Between 0 and 3
    computerChoice = inputToString(random);

    let result = 'You lost this round.'
    let also = '';

    console.log(computerChoice + ' ' + userChoice)

    if (!computerChoice.includes(userChoice)) {
        if (computerChoice === 'Rock' && userChoice === 'Scissors' ||
            computerChoice === 'Paper' && userChoice === 'Rock' ||
            computerChoice === 'Scissors' && userChoice === 'Paper') {
            piglinScore += 1;
        } else {
            playerScore += 1;
            result = 'You won this round!';
        }
    } else {
        result = 'Nobody wins.';
        also = 'also ';
    }

    print(`The piglin ${also}chose ${computerChoice}. ${result}`);
    nextRound();
    updateDialogHeader();
    roundCount++;
}

function nextRound() {
    if (playerScore >= 3) {
        dialogTextElement.innerText = 'YOU WON!!'
        dialogBoxElement.classList.add('flex-dialog-box');
        showReplayButton();
        return;
    }

    if (piglinScore >= 3) {
        showReplayButton();
        dialogTextElement.innerText = 'You lost... The piglin stole all your gold.';
        dialogBoxElement.classList.add('flex-dialog-box');
        return;
    }

    choiceElement.classList.toggle('force-border');
    reset();
    choiceTitleElement.innerText = 'Choose your next move!';
}

function inputToString(input) {
    let value = '';

    switch (input) {
        case 0:
            value = 'Rock';
            break;

        case 1:
            value = 'Paper';
            break;

        default:
            value = 'Scissors';
            break;
    }

    return value;
}

function updateDialogHeader() {
    roundElement.innerHTML = roundCount;
    piglinScoreElement.innerHTML = piglinScore;
    playerScoreElement.innerHTML = playerScore;
}

function reset() {
    choiceElement = null;
    userChoice = '';
    computerChoice = 0;
    playing = false;
    countdown = 3;
}

function newGame() {
    reset();
    roundCount = 1;
    playerScore = 0;
    piglinScore = 0;
    updateDialogHeader();
    replayDiv.style.display = 'none';
    dialogTextElement.innerText = 'You made a deal with a piglin : whoever wins the shifumi takes all the other\'s gold.';
}

function print(message) {
    dialogTextElement.innerHTML += message + '<br>';
}

function showReplayButton() {
    replayDiv.style.display = 'block';
}

// Replay button
replayImage.addEventListener('mouseenter', (event) => event.target.src = 'assets/images/replay_select.png');
replayImage.addEventListener('mouseleave', (event) => event.target.src = 'assets/images/replay.png');
replayImage.addEventListener('click', (event) => {
    choiceElement.classList.toggle('force-border');
    newGame();
})