function createCol(numOfCards, numOfCols, startInd) {
  const buttons = [];
  const col = document.createElement("div");
  if (numOfCols >= 2 && numOfCols < 8) {
    const className = "col-md-" + 12 / numOfCols;
    col.classList.add(className, "col-sm-12", "mb-2");
  } else {
    col.classList.add("col-md-1", "col-sm-12", "mb-2");
  }

  const grid = document.createElement("div");
  grid.classList.add("d-grid", "gap-2");
  for (let i = startInd; i < startInd + numOfCards; i++) {
    const button = document.createElement("button");
    button.classList.add(
      "btn",
      "btn-cust",
      "hover-shadow",
      'data-toggle="button"'
    );
    button.type = "button";
    button.id = i;

    buttons.push(button);
  }

  buttons.forEach((item) => {
    grid.append(item);
  });

  col.append(grid);

  return {
    col,
    grid,
    buttons,
  };
}

function createCardsGrid(numOfCols, numOfCards) {
  const row = document.createElement("div");
  row.classList.add("row");
  if (numOfCols === 8) {
    const col = document.createElement("div");
    col.classList.add("col-md-2", "col-sm-12", "mb-2");
    row.append(col);
  }
  if (numOfCols === 10) {
    const col = document.createElement("div");
    col.classList.add("col-md-1", "col-sm-12", "mb-2");
    row.append(col);
  }
  let count = 0;
  for (let i = 0; i < numOfCols; i++) {
    const column = createCol(numOfCards, numOfCols, count);
    row.append(column.col);
    count += numOfCards;
  }

  if (numOfCols == 8) {
    const col = document.createElement("div");
    col.classList.add("col-md-2", "col-sm-12", "mb-2");
    row.append(col);
  }
  if (numOfCols == 10) {
    const col = document.createElement("div");
    col.classList.add("col-md-1", "col-sm-12", "mb-2");
    row.append(col);
  }
  return row;
}

function createGame(cols, cards) {
  const section = document.getElementsByClassName("game");
  const wrapper = document.createElement("div");
  wrapper.classList.add("container");
  const row = createCardsGrid(cols, cards);
  wrapper.append(row);
  section[0].append(wrapper);
}

function createRandNumArray(num) {
  // num = arr.length
  const arr = [];
  for (let i = 1; i <= num / 2; i++) {
    arr.push(i, i);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function hideCards() {
  const buttonsAgain = document.querySelectorAll(".btn-cust");
  let count = 0;
  const itemsFounded = [];
  for (item of buttonsAgain) {
    if (item.classList.contains("btn-toggle")) {
      itemsFounded.push(item);
      count++;
    }

    if (count === 2) {
      if (itemsFounded[0].textContent === itemsFounded[1].textContent) {
        itemsFounded[0].classList.replace("btn-toggle", "btn-toggle-fake");
        itemsFounded[1].classList.replace("btn-toggle", "btn-toggle-fake");
      } else {
        itemsFounded[0].classList.toggle("btn-toggle");
        itemsFounded[0].textContent = "";
        itemsFounded[1].classList.toggle("btn-toggle");
        itemsFounded[1].textContent = "";
      }
      break;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inputVals");
  form.addEventListener("submit", (e) => {
    // эта строчка необходима чтобы предотвратить стандартное действие браузер
    // в данном случае мы не хотим, чтобы страница перезагружалась при отпарвке формы
    e.preventDefault();
    const selects = document.getElementsByTagName("select");
    const options = selects.namedItem("inputRows").options;
    const row = selects.namedItem("inputRows").selectedIndex;
    const col = selects.namedItem("inputCols").selectedIndex;

    const rowNum = Number(options[col].text);
    const colNum = Number(options[row].text);

    createGame(rowNum, colNum);

    const numArr = createRandNumArray(rowNum * colNum);

    const buttons = document.querySelectorAll(".btn-cust");
    buttons.forEach((btn) => {
      btn.classList.toggle("btn-toggle");
      btn.textContent = numArr[btn.id];
    });
    setTimeout(() => {
      buttons.forEach((btn) => {
        btn.classList.toggle("btn-toggle");
        btn.textContent = "";
      });
    }, 1500);
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("btn-toggle");
        if (btn.classList.contains("btn-toggle")) {
          btn.textContent = numArr[btn.id];
        } else {
          btn.textContent = "";
        }

        setTimeout(hideCards, 1000);
      });
    });
  });
});
