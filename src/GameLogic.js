//returns a randomly chosen a number from a given array
function randomChoice(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

//returns an array of numbers from all the rows before the current row and current column
function posChoice(count, board, start) {
  const res = [];
  for (let i = 0; i < count; i++) {
    const temp = board[i].slice(start, board[i].length);
    res.push(...temp);
  }
  return res.sort();
}

//returns an array of numbers that repeats from a given array
function reduce(arr) {
  const resDict = {};
  const res = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        count++;
      } else {
        i = i + count - 1;
        break;
      }
    }
    resDict[arr[i]] = count;
    count = 0;
    let Count = Object.keys(resDict).length;
    if (Count === arr.length || (Count < arr.length && i === arr.length - 2)) {
      break;
    }
  }
  const vArr = Object.values(resDict);
  var maxVal = Math.max(...vArr);
  for (var key in resDict) {
    if (resDict[key] === maxVal) {
      res.push(Number(key));
    }
  }
  return res;
}

//returns a filled out 2d array puzzle from a given length
export function makePuzzle(length) {
  let lNum = Number(length);
  const nums = [];
  for (let i = 1; i <= lNum; i++) {
    nums.push(i);
  }
  while (true) {
    try {
      const board = Array.from(Array(lNum)).map(() => Array.from(Array(lNum)));
      const rows = Array.from(Array(lNum).keys()).map(() => new Set(nums));
      const cols = Array.from(Array(lNum).keys()).map(() => new Set(nums));
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          const row = rows[i];
          const col = cols[j];
          const choices = [...row].filter((x) => col.has(x));
          let choice = randomChoice(choices);
          if (i > 1 && j !== lNum - 1) {
            const colRestr = posChoice(i, board, j);
            const filteredRestr = colRestr.filter((x) => choices.includes(x));
            const filteredChoices = reduce(filteredRestr, j);
            if (filteredChoices.length > 0) {
              choice = randomChoice(filteredChoices);
            }
          }
          if (!choice) {
            throw new Error("dead end");
          }
          board[i][j] = choice;
          col.delete(choice);
          row.delete(choice);
        }
      }
      return board;
    } catch (e) {
      continue;
    }
  }
}

//return a converted 2d array from its rows to columns
export function convertToColumns(puzzle) {
  const columns = Array.from(Array(puzzle.length)).map(() =>
    Array.from(Array(puzzle.length))
  );
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      columns[j][i] = puzzle[i][j];
    }
  }
  return columns;
}

//return the count of numbers that can be seen from the ends
function findNums(arr) {
  let count = 1;
  let current = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (current > arr[i]) {
      continue;
    } else {
      count++;
      current = arr[i];
    }
  }
  return count;
}

//return an array of clues for all sides
export function findClues(puzzle, columns) {
  let topC = [];
  let botC = [];
  let rightC = [];
  let leftC = [];
  for (let i = 0; i < puzzle.length; i++) {
    const maxXIndex = puzzle[i].findIndex((x) => x === Math.max(...puzzle[i]));
    const maxYIndex = columns[i].findIndex(
      (y) => y === Math.max(...columns[i])
    );
    const leftArr = Array.from(puzzle[i]).splice(0, maxXIndex + 1);
    const rightArr = Array.from(puzzle[i]).splice(maxXIndex).reverse();
    const topArr = Array.from(columns[i]).splice(0, maxYIndex + 1);
    const botArr = Array.from(columns[i]).splice(maxYIndex).reverse();
    let rCount = findNums(rightArr);
    let lCount = findNums(leftArr);
    let tCount = findNums(topArr);
    let bCount = findNums(botArr);
    topC.push(tCount);
    botC.push(bCount);
    leftC.push(lCount);
    rightC.push(rCount);
  }
  return topC.concat(rightC, botC, leftC);
}

//removes clues from a given clue array until the given amount
export function removeClues(clueAmount, clueArr) {
  const clues = {
    topC: null,
    rightC: null,
    botC: null,
    leftC: null,
  };
  const clueLoc = ["topC", "rightC", "botC", "leftC"];
  const cluesCopy = Array.from(clueArr);
  for (var arr in clues) {
    clues[arr] = cluesCopy.splice(0, clueArr.length / 4);
  }

  let count = 0;
  while (count !== clueArr.length - clueAmount) {
    let choice = clues[clueLoc[Math.floor(Math.random() * clueLoc.length)]];
    let numC = 0;
    for (let i = 0; i < choice.length; i++) {
      if (choice[i]) {
        numC++;
      }
    }
    if (numC > Math.floor(clueArr.length / 4 / 3)) {
      const rndI = Math.floor(Math.random() * choice.length);
      if (choice[rndI]) {
        choice.splice(rndI, 1, null);
        count++;
      }
    }
  }
  let clueA = [4];
  let c = 0;
  for (var ca in clues) {
    clueA[c] = clues[ca];
    c++;
  }
  let tC = clueA[0];
  let rC = clueA[1];
  let bC = clueA[2];
  let lC = clueA[3];
  return tC.concat(rC, bC, lC);
}
