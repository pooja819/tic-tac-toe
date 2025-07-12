let boxes = document.querySelectorAll(".box"); // to get all boxes
let resetBtn = document.querySelector("#reset-btn"); // to get reset button
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//to track whose turn
let turnO = true; //player X , player O

// let check the conditions when player wins the game

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// to add event (something happen) after clicking button

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box was click");
    if (turnO) {
      // turn of player O
      box.innerText = "O";
      turnO = false;
    } else {
      // turn of player x
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner(); // to check the winner
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations , winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    // console.log(pattern[0], pattern[1], pattern[2]); // to check pattern
    // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]); // to check boxes
    // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText); // to get position value

    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;

    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      // to check position value should not be empty
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        // to check position value is equal or not
        // console.log("winner", posVal1);
        showWinner(posVal1);
        boxes[pattern[0]].classList.add("winning-box");
        boxes[pattern[1]].classList.add("winning-box");
        boxes[pattern[2]].classList.add("winning-box");

        return; // Stop here if winner is found
      }
    }
  }
  checkDraw(); // Only check for draw if no winner
};

const checkDraw = () => {
  let filled = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") filled++;
  });

  if (filled === 9) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
