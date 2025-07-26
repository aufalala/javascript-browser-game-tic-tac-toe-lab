/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [0, 1, 2],
    [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");


/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ["", "", "", "", "", "", "", "", "", ];
    turn = "X"; 
    winner = false;
    tie = false;
    squareEls.forEach((square) => {
                square.style.background = "black";
                square.style.color= "azure";
                square.classList.remove("filled");    
            })
    messageEl.classList.remove("extended");
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((square, index) => {
        
        squareEls[index].textContent = square;
        
    });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `IT IS ${turn}'s TURN`;
        return;
    }
    if (!winner && tie) {
            messageEl.textContent = "ITS A TIE";
            return;
    } else {
            messageEl.innerHTML = "CONGRATS YOU WON<br><span style=\"font-size: 20px\">Click on a square to restart</span>";
            requestAnimationFrame(() => {messageEl.classList.add("extended")});
            return;
        }
}

function handleClick(event) {
    const squareIndex = event.target.id;
    console.log(squareIndex);
    
    if (winner) {
        init();
        placePiece(squareIndex);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
        return;
    }
    if (board[squareIndex]) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
    squareEls[index].classList.add("filled");
    console.log(board);
}

function checkForWinner() {
    winningCombos.forEach((combo, index) => {
        console.log("doing combo" + index)
        if (board[combo[0]] !== "" && 
            board[combo[0]] === board[combo[1]] &&
            board[combo[0]] === board[combo[2]])
         {
            winner = true;
            combo.forEach((square) => {
                squareEls[square].style.background = "azure";
                squareEls[square].style.color= "black";    
            })
            console.log("winner!!!!");   
        }
    })
}

function checkForTie() {
    if (winner) {
        return;
    }
    else if (board.some((square) => {return !square})) {
        return
    }
    else {
        tie = true;
        console.log("ITS A TIE")
    }
}

function switchPlayerTurn() {
    if (winner) {
        return;
    } else if (turn === "X") {
        turn = "O";
        console.log("turn is now" + turn);
    } else {
        turn = "X";
        console.log("turn is now" + turn);
    }
}

/*----------------------------- Event Listeners -----------------------------*/


squareEls.forEach((square) => {
    square.addEventListener("click", handleClick);
})

resetBtnEl.addEventListener("click", init);


////////////
init();
