let cells = document.querySelectorAll(".cell");
let gameStatus = document.querySelector(".Status p");
let reset = document.querySelector(".Reset");
let b1 = document.querySelector(".b1");
let b2 = document.querySelector(".b2");
let player = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let cpu = false;
let winCondition = [ 
    [2, 1, 0]
    , [5, 4, 3]
    , [8, 7, 6]
    , [6, 3, 0]
    , [7, 4, 1]
    , [8, 5, 2]
    , [8, 4, 0]
    , [6, 4, 2]
];

cells.forEach((cell) => {
    cell.addEventListener("click", ()=>{
        if (cell.textContent !=="" || !gameActive) {
            return;
        }
        cell.textContent = player;
        let index = cell.dataset.index;
        board[index] = player;
        checkWinner(cell)
    })
}) 

function checkWinner(cell) {
    if (player === "X") {
        cell.classList.add("x_color");
    } else {
        cell.classList.add("o_color");
    }
    for (let i = 0; i<winCondition.length; i++) {
        let condition = winCondition[i];
        let a = board[condition[0]];
        let b = board[condition[1]];
        let c = board[condition[2]];
        if (a!=="" && a === b && b === c) {
            gameStatus.textContent = "Game status : " + player + " won ";
            gameActive = false;
            return;
        }
    }
        if (player === "X") {
        player = "O";
        
    } else {
        player = "X";
    }
    gameStatus.textContent = "Game status : " + player + " turn";
    if (cpu && player === "O" && gameActive) {
        setTimeout(cpuMove, 400)
    }
}
reset.addEventListener("click", () => {
    resetGame();
})
b1.addEventListener("click", ()=> {
    cpu = false;
    resetGame();
    b1.classList.add("active");
    b2.classList.remove("active");

})
b2.addEventListener("click", ()=>{
    cpu = true;
    resetGame();
    b2.classList.add("active");
    b1.classList.remove("active");
})
function resetGame () {
board = ["", "", "", "", "", "", "", "", ""];
player = "X";
gameActive = true;
cells.forEach((cell) => {cell.textContent=""; cell.classList.remove("x_color", "o_color");})
}
function cpuMove() {
    if (!gameActive) return;
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) 
        if (board[i]==="")
            emptyCells.push(i);
    let randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    checkWinner(cells[randomIndex]);
}