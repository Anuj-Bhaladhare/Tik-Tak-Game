const gameInformation = document.querySelector("[data-information]");
const allBoxex = document.querySelectorAll(".box");
const newGameBtn  = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winingPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//let's create a function to initialise the game

function gameInitisalis() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    //UI pr empty bhi karna padega boxes ko
    allBoxex.forEach((box, index) => {
        box.innerText = "";
        allBoxex[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInformation.innerText = `Current Player - ${currentPlayer}`;
}

gameInitisalis();


function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    //UI Update
    gameInformation.innerText = `Current Player - ${currentPlayer}`; 
}

function checkGameOver() {
    let answer = "";

    winingPosition.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
 

            //check if winner is X
            if(gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "0";
            }

             //disable pointer events
             allBoxex.forEach((box) => {
                box.style.pointerEvents = "none";
             })

             allBoxex[position[0]].classList.add("win");
             allBoxex[position[1]].classList.add("win");
             allBoxex[position[2]].classList.add("win");
        }
    })

    //it means we have a winner
    if(answer !== "") {
        gameInformation.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInformation.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handalClick(index) {
    if(gameGrid[index] === "") {
        allBoxex[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        allBoxex[index].style.pointerEvents = "none";

        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

allBoxex.forEach((box, index) => {
    box.addEventListener('click', () => {
        handalClick(index);
    })
});

newGameBtn.addEventListener('click', gameInitisalis);