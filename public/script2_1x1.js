// Скрипт для игры 1 x 1
let userActivity = true; //green
function startGame1x1() {
  console.log("1x1 start");
  table.addEventListener("click", click1x1);
  resetGame(true);
  table.removeEventListener("click", clickUser);
}

function click1x1(event) {
  console.log("table click");
  const button = event.target;
  if (
    button.tagName == "BUTTON" &&
    button.closest("#table").tagName == "TABLE"
  ) {
    if (userActivity) {
      button.classList.add("butClickUser");
      button.innerText = "X";
      button.disabled = true;
      array[button.getAttribute("id")] = 1;
      //console.log(array);
      if (checkWinerAll(1) == 1) return;
    }
    if (!userActivity) {
      button.classList.add("butClickComp");
      button.innerText = "O";
      button.disabled = true;
      array[button.getAttribute("id")] = 2;
      console.log(array);
      if (checkWinerAll(2) == 1) return;
    }
    userActivity = !userActivity;
  }
}
