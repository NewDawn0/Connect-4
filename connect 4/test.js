taken = [2, 5, 1, 8, 9];
function checkTaken() {
  if (taken.includes(4) === true) {
    console.log("taken")
  } else {
      console.log("free")
  }
}
checkTaken();