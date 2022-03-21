////////////////////////////////////////
//// Variables
var index = 41;
const players = ["*", "#"];
var player = 0;
let player1Col = "lime"
let player2Col = "coral"
let player1 = [];
let player2 = [];
const winReq = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
];

let board = [
  " ", " ", " ", " ", " ", " ", " ", //6
  " ", " ", " ", " ", " ", " ", " ", //13
  " ", " ", " ", " ", " ", " ", " ", //20
  " ", " ", " ", " ", " ", " ", " ", //27
  " ", " ", " ", " ", " ", " ", " ", //34
  " ", " ", " ", " ", " ", " ", " ", //41
]

////////////////////////////////////////
//// Randomnumber between 35 and 42
function generaterRandom () {
  var num = Math.random() * 6;
  num = Math.round(num);
  num++
  num=num+35;
  return num;
}
index = generaterRandom();

////////////////////////////////////////
//// Checks if field is taken
function checkTaken() {
  if (board[index] === " ") {
    board.splice(index, 1, players[player]);
    if (player === 1) {
      player2.push(index);
      document.getElementById("field-"+index).style.backgroundColor = player2Col;
      player=0;
    } else {
      player1.push(index);
      document.getElementById("field-"+index).style.backgroundColor = player1Col;
      player = 1;
    }
  } else if (board[0] !== " " && board[1] !== " " && board[2] !== " " && board[3] !== " " && board[4] !== " " && board[5] !== " " && board[6] !== " ") {
    return "full";
  } else {
    if (index > 0) {
      index=index-7;
      checkTaken();
    } else {
      console.log("chosing other column");
      index = generaterRandom();
      checkTaken();
    }
  }
}

////////////////////////////////////////
//// Checks if one won
function checkWin(player1, player2) {
  for (var arrLen = 0; arrLen < winReq.length; arrLen++) {
    const containsAllPl1 = winReq[arrLen].every(element => {
      return player1.indexOf(element) !== -1;
    });
    const containsAllPl2 = winReq[arrLen].every(element => {
      return player2.indexOf(element) !== -1;
    });
    if (containsAllPl1 === true || containsAllPl2 === true) {
      if (containsAllPl1 === true) {
        return 1;
      } else {
        return 2;
      }
    } else {
      return 0;
    }
  }
}

////////////////////////////////////////
//// Sleep function
function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

////////////////////////////////////////
//// bot play
async function runBoard() {
  loop1:
    for (let i = 0; i < 43; i++) {
      index = generaterRandom()
      if (checkTaken() === "full") {
        console.log("board full");
        console.log("draw");
        break;
      }
      for (var arrLen = 0; arrLen < winReq.length; arrLen++) {
        const containsAllPl1 = winReq[arrLen].every(element => {
          return player1.indexOf(element) !== -1;
        });
        const containsAllPl2 = winReq[arrLen].every(element => {
          return player2.indexOf(element) !== -1;
        });
        if (containsAllPl1 === true || containsAllPl2 === true) {
          if (containsAllPl1 === true) {
            console.log("bot 1 won");
            break loop1;
          } else {
            console.log("bot 2 won");
            break loop1;
          }
        } else {
        }
      }
      console.log(board);
      await sleep(1000);
    }
    console.log(board);
}
//runBoard();