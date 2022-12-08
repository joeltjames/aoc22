import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((v) => v.split("").map((v) => parseInt(v)));

const isVisibleUp = (
  rowIdx: number,
  colIdx: number,
  value: number,
  grid: number[][],
) => {
  rowIdx--;
  while (rowIdx >= 0) {
    if (grid[rowIdx][colIdx] >= value) {
      return false;
    }
    rowIdx--;
  }
  return true;
};

const isVisibleDown = (
  rowIdx: number,
  colIdx: number,
  value: number,
  grid: number[][],
) => {
  rowIdx++;
  while (rowIdx < grid.length) {
    if (grid[rowIdx][colIdx] >= value) {
      return false;
    }
    rowIdx++;
  }
  return true;
};

const isVisibleLeft = (
  rowIdx: number,
  colIdx: number,
  value: number,
  grid: number[][],
) => {
  colIdx--;
  while (colIdx >= 0) {
    if (grid[rowIdx][colIdx] >= value) {
      return false;
    }
    colIdx--;
  }
  return true;
};

const isVisibleRight = (
  rowIdx: number,
  colIdx: number,
  value: number,
  grid: number[][],
) => {
  colIdx++;
  const row = grid[rowIdx];
  while (colIdx <= row.length) {
    if (row[colIdx] >= value) {
      return false;
    }
    colIdx++;
  }
  return true;
};

const isVisible = (
  rowIdx: number,
  colIdx: number,
  value: number,
  grid: number[][],
) => {
  return (
    isVisibleUp(rowIdx, colIdx, value, grid) ||
    isVisibleDown(rowIdx, colIdx, value, grid) ||
    isVisibleLeft(rowIdx, colIdx, value, grid) ||
    isVisibleRight(rowIdx, colIdx, value, grid)
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let visibleCells: { [key: string]: number } = {};
  input.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      let cellKey = `${rowIdx},${colIdx}`;
      if (rowIdx === 0 || rowIdx === input.length - 1) {
        visibleCells[cellKey] = cell;
      } else if (colIdx === 0 || colIdx === row.length - 1) {
        visibleCells[cellKey] = cell;
      } else if (isVisible(rowIdx, colIdx, cell, input)) {
        visibleCells[cellKey] = cell;
      }
    });
  });
  return Object.keys(visibleCells).length;
};

const getNumberOfVisibleTreesAbove = (
  row: number,
  col: number,
  grid: number[][],
) => {
  const val = grid[row][col];
  if (row === 0) {
    return 0;
  }
  let count = 0;
  row--;
  while (row >= 0) {
    count++;
    if (grid[row][col] >= val) {
      break;
    }
    row--;
  }
  return count;
};

const getNumberOfVisibleTreesBelow = (
  row: number,
  col: number,
  grid: number[][],
) => {
  const val = grid[row][col];
  if (row === grid.length) {
    return 0;
  }
  let count = 0;
  row++;
  while (row < grid.length) {
    count++;
    if (grid[row][col] >= val) {
      break;
    }
    row++;
  }
  return count;
};

const getNumberOfVisibleTreesRight = (
  row: number,
  col: number,
  grid: number[][],
) => {
  const val = grid[row][col];
  if (col === grid[row].length) {
    return 0;
  }
  let count = 0;
  col++;
  while (col < grid[row].length) {
    count++;
    if (grid[row][col] >= val) {
      break;
    }
    col++;
  }
  return count;
};

const getNumberOfVisibleTreesLeft = (
  row: number,
  col: number,
  grid: number[][],
) => {
  const val = grid[row][col];
  if (col === 0) {
    return 0;
  }
  let count = 0;
  col--;
  while (col >= 0) {
    count++;
    if (grid[row][col] >= val) {
      break;
    }
    col--;
  }
  return count;
};

const getScenicScore = (row: number, col: number, grid: number[][]) => {
  return (
    getNumberOfVisibleTreesAbove(row, col, grid) *
    getNumberOfVisibleTreesBelow(row, col, grid) *
    getNumberOfVisibleTreesLeft(row, col, grid) *
    getNumberOfVisibleTreesRight(row, col, grid)
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let maxScore = 0;
  input.forEach((row, rowIdx) => {
    let scores: any[] = [];
    row.forEach((_, colIdx) => {
      const score = getScenicScore(rowIdx, colIdx, input);
      scores.push(score);
      if (maxScore < score) {
        maxScore = score;
      }
    });
  });
  return maxScore;
};

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
