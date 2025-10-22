const table = document.getElementById("table");
table.addEventListener("click", clickUser);
const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let counter = 1;
let compFirst = false;
if (Math.random() < 0.5) {
  compFirst = true;
  goComp();
}

function clickUser(event) {
  const button = event.target;
  if (
    button.tagName == "BUTTON" &&
    button.closest("#table").tagName == "TABLE"
  ) {
    button.classList.add("butClickUser");
    button.innerText = "X";
    button.disabled = true;
    array[button.getAttribute("id")] = 1;
    //console.log(array);
    counter++;
    checkWinerAll(1);
    goComp();
  }
}

function goComp() {
  // Если комп ходит первый - в центр
  if (counter == 1) {
    array[4] = 2;
    const elem = document.getElementById(4);
    elem.classList.add("butClickComp");
    elem.innerText = "O";
    elem.disabled = true;
    counter++;
    return;
  }

  // Если комп ходит первый раз после user-> в центр если свободно
  // Если это второй свой ход
  //(1-й ход был в центр)-> в угол(любой не занятый)
  if (counter == 2 || counter == 3) {
    if (array[4] == 0) {
      const elem = document.getElementById(4);
      elem.classList.add("butClickComp");
      elem.innerText = "O";
      elem.disabled = true;
      counter++;
      array[4] = 2;
      return;
    }
    while (true) {
      const i = getRandomIntInclusive(0, 3);
      const j = [0, 2, 6, 8][i]; // j-
      if (array[j] == 0) {
        array[j] = 2;
        const elem = document.getElementById(j);
        elem.classList.add("butClickComp");
        elem.innerText = "O";
        elem.disabled = true;
        counter++;
        return;
      } else continue;
    }
  }

  // Если может победить, ходит и выход из goComp()
  if (checkWinComp() == 1) {
    return;
  }

  // Теперь может быть ловушка от user 2крестика рядом
  const resultChek = checkLose();
  if (resultChek == 1) {
    // Комп нашел ловушку и походил
    return;
  } else {
    //ловушки не было, не походил
    console.log("!!!");
    if (compFirst == true) {
      // Находит все свободные ячейки и комп ходит  в любую свободную
      // Это уводит на ничью - выигрыш невозможен почти если user не затупит
      const arrFree = getAllFree();
      //getRandomIntInclusive(0, arrFree.length-1);
      writeComp(arrFree[getRandomIntInclusive(0, arrFree.length - 1)]);
      checkWinerAll(2);
      console.log(arrFree);
    } else {
      // Комп не первый-надо подумать куда чтобы ничья
      // Поставить в любой свободный угол-100% ничья
      switch (0) {
        case array[0]:
          writeComp(0);
          break;
        case array[2]:
          writeComp(2);
          break;
        case array[6]:
          writeComp(6);
          break;
        case array[8]:
          writeComp(8);
          break;
      }
    }
  }

  // Находит ловушку и ходит return 1 если ходит
  function checkLose() {
    let arrTemp = [
      [array[0], array[1], array[2]],
      [array[3], array[4], array[5]],
      [array[6], array[7], array[8]],
    ];
    console.log(arrTemp);
    console.log(counter);

    // Проверка строк на ловушку
    for (let i = 0; i < arrTemp.length; i++) {
      // перебор строк
      const [a, b, c] = arrTemp[i]; // a,b,c хранят строку-ходы(0|1|2)
      // a&&b
      if (+a == 1 && +b == 1 && c == 0) {
        switch (i) {
          case 0:
            writeComp(2);
            break;
          case 1:
            writeComp(5);
            break;
          case 2:
            writeComp(8);
            break;
        }
        return 1;
      }

      // a&&c
      if (+a == 1 && +c == 1 && b == 0) {
        switch (i) {
          case 0:
            writeComp(1);
            break;
          case 1:
            writeComp(4);
            break;
          case 2:
            writeComp(7);
            break;
        }
        return 1;
      }

      // b&&c
      if (+b == 1 && +c == 1 && a == 0) {
        switch (i) {
          case 0:
            writeComp(0);
            break;
          case 1:
            writeComp(3);
            break;
          case 2:
            writeComp(6);
            break;
        }
        return 1;
      }
    }

    // Проверка столбцов на ловушку
    arrTemp = [
      [array[0], array[3], array[6]],
      [array[1], array[4], array[7]],
      [array[2], array[5], array[8]],
    ];
    for (let i = 0; i < arrTemp.length; i++) {
      // перебор строк
      const [a, b, c] = arrTemp[i]; // a,b,c хранят столбец-ходы(0|1|2)
      // a&&b
      if (+a == 1 && +b == 1 && c == 0) {
        switch (i) {
          case 0:
            writeComp(6);
            break;
          case 1:
            writeComp(7);
            break;
          case 2:
            writeComp(8);
            break;
        }
        return 1;
      }

      // a&&c
      if (+a == 1 && +c == 1 && b == 0) {
        switch (i) {
          case 0:
            writeComp(3);
            break;
          case 1:
            writeComp(4);
            break;
          case 2:
            writeComp(5);
            break;
        }
        return 1;
      }

      // b&&c
      if (+b == 1 && +c == 1 && a == 0) {
        switch (i) {
          case 0:
            writeComp(0);
            break;
          case 1:
            writeComp(1);
            break;
          case 2:
            writeComp(2);
            break;
        }
        return 1;
      }
    }

    // Проверка диагоналей на ловушку
    if (array[4] != 1) {
      return;
    } else {
      if (array[0] == 1 && array[4] == 1 && array[8] == 0) {
        writeComp(8);
        return 1;
      }
      if (array[2] == 1 && array[4] == 1 && array[6] == 0) {
        writeComp(6);
        return 1;
      }
      if (array[6] == 1 && array[4] == 1 && array[2] == 0) {
        writeComp(2);
        return 1;
      }
      if (array[8] == 1 && array[4] == 1 && array[0] == 0) {
        writeComp(0);
        return 1;
      }
    }
  }

  // return int[] свободных индексов в array
  function getAllFree() {
    const arrFree = [];
    array.filter((item, index) => (item == 0 ? arrFree.push(index) : false));
    return arrFree;
  }

  // return случайное число от min до max вкл
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

// Находит победителя и заканчивает игру || -1
function checkWinerAll(winer) {
  let arrTemp = [
    [array[0], array[1], array[2]],
    [array[3], array[4], array[5]],
    [array[6], array[7], array[8]],
  ];

  // Проверка строк на победу
  for (let i = 0; i < arrTemp.length; i++) {
    // перебор строк
    const [a, b, c] = arrTemp[i]; // a,b,c хранят строку-ходы(0|1|2)
    // a&&b&&c
    if ((a == 1 && b == 1 && c == 1) || (a == 2 && b == 2 && c == 2)) {
      switch (i) {
        case 0:
          endWithWinner(0, 1, 2, winer);
          break;
        case 1:
          endWithWinner(3, 4, 5, winer);
          break;
        case 2:
          endWithWinner(6, 7, 8, winer);
          break;
      }
      return;
    }
  }

  // Проверка столбцов на победу
  arrTemp = [
    [array[0], array[3], array[6]],
    [array[1], array[4], array[7]],
    [array[2], array[5], array[8]],
  ];
  for (let i = 0; i < arrTemp.length; i++) {
    const [a, b, c] = arrTemp[i]; // a,b,c хранят столбец-ходы(0|1|2)
    // a&&b&&c
    if ((a == 1 && b == 1 && c == 1) || (a == 2 && b == 2 && c == 2)) {
      switch (i) {
        case 0:
          endWithWinner(0, 3, 6, winer);
          break;
        case 1:
          endWithWinner(1, 4, 7, winer);
          break;
        case 2:
          endWithWinner(2, 5, 8, winer);
          break;
      }
      return;
    }
  }

  // Проверка диагоналей на победу
  if (
    (array[0] == 1 && array[4] == 1 && array[8] == 1) ||
    (array[0] == 2 && array[4] == 2 && array[8] == 2)
  ) {
    endWithWinner(0, 4, 8, winer);
    return;
  }
  if (
    (array[2] == 1 && array[4] == 1 && array[6] == 1) ||
    (array[2] == 2 && array[4] == 2 && array[6] == 2)
  ) {
    endWithWinner(2, 4, 6, winer);
    return;
  }

  function endWithWinner(a, b, c, winer) {
    console.log("Win " + a + " " + b + " " + c + " ");
    array.map(
      (item, index) => (document.getElementById(index).disabled = true)
    );
    if (winer == 1) {
      document.getElementById(a).style.backgroundColor = "#18eb05ff";
      document.getElementById(b).style.backgroundColor = "#18eb05ff";
      document.getElementById(c).style.backgroundColor = "#18eb05ff";
      return;
    } else {
      document.getElementById(a).style.backgroundColor = "#e65f47ff";
      document.getElementById(b).style.backgroundColor = "#e65f47ff";
      document.getElementById(c).style.backgroundColor = "#e65f47ff";
      return;
    }
  }
}

// Если комп может победить(есть 2 клетки рядом)ходит, return 1 если ходит
function checkWinComp() {
  let arrTemp = [
    [array[0], array[1], array[2]],
    [array[3], array[4], array[5]],
    [array[6], array[7], array[8]],
  ];
  console.log("Comp check win and go");

  // Проверка строк на победу
  for (let i = 0; i < arrTemp.length; i++) {
    // перебор строк
    const [a, b, c] = arrTemp[i]; // a,b,c хранят строку-ходы(0|1|2)
    // a&&b
    if (+a == 2 && +b == 2 && c == 0) {
      switch (i) {
        case 0:
          writeComp(2);
          break;
        case 1:
          writeComp(5);
          break;
        case 2:
          writeComp(8);
          break;
      }
      return 1;
    }

    // a&&c
    if (+a == 2 && +c == 2 && b == 0) {
      switch (i) {
        case 0:
          writeComp(1);
          break;
        case 1:
          writeComp(4);
          break;
        case 2:
          writeComp(7);
          break;
      }
      return 1;
    }

    // b&&c
    if (+b == 2 && +c == 2 && a == 0) {
      switch (i) {
        case 0:
          writeComp(0);
          break;
        case 1:
          writeComp(3);
          break;
        case 2:
          writeComp(6);
          break;
      }
      return 1;
    }
  }

  // Проверка столбцов на победу
  arrTemp = [
    [array[0], array[3], array[6]],
    [array[1], array[4], array[7]],
    [array[2], array[5], array[8]],
  ];
  for (let i = 0; i < arrTemp.length; i++) {
    // перебор строк
    const [a, b, c] = arrTemp[i]; // a,b,c хранят столбец-ходы(0|1|2)
    // a&&b
    if (+a == 2 && +b == 2 && c == 0) {
      switch (i) {
        case 0:
          writeComp(6);
          break;
        case 1:
          writeComp(7);
          break;
        case 2:
          writeComp(8);
          break;
      }
      return 1;
    }

    // a&&c
    if (+a == 2 && +c == 2 && b == 0) {
      switch (i) {
        case 0:
          writeComp(3);
          break;
        case 1:
          writeComp(4);
          break;
        case 2:
          writeComp(5);
          break;
      }
      return 1;
    }

    // b&&c
    if (+b == 2 && +c == 2 && a == 0) {
      switch (i) {
        case 0:
          writeComp(0);
          break;
        case 1:
          writeComp(1);
          break;
        case 2:
          writeComp(2);
          break;
      }
      return 1;
    }
  }

  // Проверка диагоналей на победу
  if (array[4] != 2) {
    return;
  } else {
    if (array[0] == 2 && array[4] == 2 && array[8] == 0) {
      writeComp(8);
      return 1;
    }
    if (array[2] == 2 && array[4] == 2 && array[6] == 0) {
      writeComp(6);
      return 1;
    }
    if (array[6] == 2 && array[4] == 2 && array[2] == 0) {
      writeComp(2);
      return 1;
    }
    if (array[8] == 2 && array[4] == 2 && array[0] == 0) {
      writeComp(0);
      return 1;
    }
  }
}

// Получает индекс и ходит комп
function writeComp(value) {
  array[value] = 2;
  const elem = document.getElementById(value);
  elem.classList.add("butClickComp");
  elem.innerText = "O";
  elem.disabled = true;
  counter++;
  checkWinerAll(2);
  return;
}
