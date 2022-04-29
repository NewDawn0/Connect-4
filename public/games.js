////////////////////////////////////////
//// Variables
var arrow = false;
var index = 41;
const players = ["*", "#"];
var player = 0;
let player1Col = "#ff3050"
let player2Col = "#ffffff"
let player1 = [];
let player2 = [];
const topCollumn = [0, 1, 2, 3, 4, 5, 6];
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
sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let user = JSON.parse(localStorage.getItem("user"));
console.log(user.name);
let enemyY = JSON.parse(localStorage.getItem("enemy"));
console.log(enemyY.name);

async function drawEnemy() {
  const response = await fetch('/api/userDraw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: enemyY.name
    })
  });
  const data = await response.json();
  console.log(data.message);
}
async function drawUser() {
  const response = await fetch('/api/userDraw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: user.name
    })
  });
  const data = await response.json();
  console.log(data.message);
}
async function youWin() {
  const response = await fetch('/api/userWin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: user.name
    })
  });
  const data = await response.json();
  console.log(data.message);
}
async function youlose() {
  const response = await fetch('/api/userLosses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: enemyY.name
    })
  });
  const data = await response.json();
  console.log(data.message);
}
async function enemyWin() {
  const response = await fetch('/api/userWin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: enemyY.name
    })
  });
  const data = await response.json();
  console.log(data.message);
}
async function enemylose() {
  const response = await fetch('/api/userLosses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: user.name
    })
  });
  const data = await response.json();
  console.log(data.message);
}

function genRand() {
  var num = Math.random() * 6;
  num = Math.round(num);
  num++
  num = num + 35;
  return num;
}
checkWin = (player1, player2) => {
  for (var arrLen = 0; arrLen < winReq.length; arrLen++) {
    const containsAllPl1 = winReq[arrLen].every(element => {
      return player1.indexOf(element) !== -1;
    });
    const containsAllPl2 = winReq[arrLen].every(element => {
      return player2.indexOf(element) !== -1;
    });
    if (containsAllPl1) {
      for (var i = 0; i < winReq[arrLen].length; i++) {
        let num = winReq[arrLen][i];
        let item = document.getElementById("field-"+num);
        item.style.cssText = "background-image: url(sources/rick.gif); background-size: cover; background-repeat: no-repeat;";
      }
      return 1;
    }
    if (containsAllPl2) {
      for (var i = 0; i < winReq[arrLen].length; i++) {
        let num = winReq[arrLen][i];
        let item = document.getElementById("field-"+num);
        item.style.cssText = "background-image: url(sources/rick.gif); background-size: cover; background-repeat: no-repeat;";
      }
      return 2;
    }
  }
}
async function redirect () {
  await sleep(10000);
  location.replace("dashboard.html")
}
player = num => {
  index = num
  if (checkWin(player1, player2) === 1 || checkWin(player1, player2) === 2) {
    redirect();
  } else {
    checkTaken = (index) =>{
      if (board[index] === " ") {
        board.splice(index, 1, players[player]);
        player1.push(index);
        document.getElementById("field-" + index).style.background = player1Col;
        if (index in topCollumn) {
          index++;
          document.getElementById("arrow" + index).style.visibility = "hidden";
        }
      } else {
        if (index in topCollumn) {
          index++;
          document.getElementById("arrow" + index).style.visibility = "hidden";
          alert("collumn full")
        } else {
          index = index - 7;
          checkTaken(index);
        }
      }
    }
    checkTaken(index);
  }
  if (checkWin(player1, player2) === 1) {
    alert("You win!");
    youWin(user.name);
    youlose(enemyY.name);
    redirect();
  } else if (checkWin(player1, player2) === 2) {
    alert("You lose!");
    enemyWin(enemyY.name);
    enemylose(user.name);
    redirect();
  } else {
    if (board[0] !== " " && board[1] !== " " && board[2] !== " " && board[3] !== " " && board[4] !== " " && board[5] !== " " && board[6] !== " ") {
      alert("Board full");
      alert("Draw");
      drawUser(user.name);
      drawEnemy(enemyY.name);
      redirect();
    } else {
      bot();
    }
  }
}
async function bot () {
  await sleep(100);
  if (checkWin(player1, player2) === 1 || checkWin(player1, player2) === 2) {
    redirect();
  } else {
    index = genRand();
    checkTaken = (index) =>{
      if (board[index] === " ") {
        board.splice(index, 1, players[player]);
        player2.push(index);
        document.getElementById("field-" + index).style.background = player2Col;
        if (index in topCollumn) {
          index++;
          document.getElementById("arrow" + index).style.visibility = "hidden";
        }
      } else {
        if (index in topCollumn) {
          index++;
          document.getElementById("arrow" + index).style.visibility = "hidden";
          bot();
        } else {
          index = index - 7;
          checkTaken(index);
        }
      }
    }
    checkTaken(index);
  }
  if (checkWin(player1, player2) === 1) {
    alert("You win!");
    youWin(user.name);
    youlose(enemyY.name);
    redirect();
  } else if (checkWin(player1, player2) === 2) {
    alert("You lose!");
    enemyWin(enemyY.name);
    enemylose(user.name);
    redirect();
  }
}
