import run from "aocrunner";
import chalk from "chalk";
const printGrid = (grid: string[][]) => {
  grid.forEach((row) => {
    if (
      row.filter((item) => item !== ".").length > 1
      //    || row.filter((item) => item === "o").length > 0
    ) {
      console.log(
        row
          .map((v) => {
            if (v === ".") {
              return v;
            }
            if (v === "o") {
              return chalk.yellow(v);
            }
            return chalk.red(v);
          })
          .join(""),
      );
    }
  });
};

const parseInput = (rawInput: string, floor = false) => {
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;
  const rockCoords = rawInput
    .split("\n")
    .map((v) => {
      const listOfCoords = v.split(" -> ").map((v) => {
        const [x, y] = v.split(",");
        let xInt = parseInt(x);
        let yInt = parseInt(y);
        if (xInt > maxX) {
          maxX = xInt;
        }
        if (yInt > maxY) {
          maxY = yInt;
        }
        return { x: xInt, y: yInt };
      });

      const toAdd: {
        x: number;
        y: number;
      }[] = [];

      listOfCoords.forEach((v, idx, arr) => {
        if (idx < arr.length - 1) {
          const next = { ...v };

          while (next.x < arr[idx + 1].x - 1) {
            next.x++;
            toAdd.push({ ...next });
          }

          while (next.x > arr[idx + 1].x + 1) {
            next.x--;
            toAdd.push({ ...next });
          }

          while (next.y < arr[idx + 1].y - 1) {
            next.y++;
            toAdd.push({ ...next });
          }

          while (next.y > arr[idx + 1].y + 1) {
            next.y--;
            toAdd.push({ ...next });
          }
        }
      });

      return listOfCoords.concat(toAdd);
    })
    .reduce((prev, curr) => {
      curr.forEach(({ x, y }) => {
        if (!(x in prev)) {
          prev[x] = [];
        }
        prev[x].push(y);
      });
      return prev;
    }, {} as { [key: number]: number[] });

  if (floor) {
    maxX *= 2;
    for (let i = 0; i < maxX; i++) {
      if (!(i in rockCoords)) {
        rockCoords[i] = [];
      }
      rockCoords[i].push(maxY + 2);
    }
  }

  const grid = new Array(maxX + 1)
    .fill(null)
    .map(() => new Array(maxY + 2).fill("."));

  Object.keys(rockCoords).forEach((rowIdx) => {
    const row = rockCoords[parseInt(rowIdx)];
    row.forEach((colIdx) => {
      grid[parseInt(rowIdx)][colIdx] = "#";
    });
  });

  return { grid, drop: 500, lowestRock: maxY };
};

const debugMsg = (message: any, debug: boolean) => {
  if (debug) {
    console.log(message);
  }
};

const dropSand = (
  grid: string[][],
  drop: number,
  lowestRock: number,
  debug = true,
) => {
  let col = drop;
  grid[col][0] = "o";
  let prevPosition = { x: col, y: 0 };
  let currPosition = { x: col, y: 0 };
  while (currPosition.y < lowestRock) {
    grid[prevPosition.x][prevPosition.y] = ".";
    if (grid[currPosition.x][currPosition.y + 1] !== "#") {
      currPosition.y += 1;
      grid[currPosition.x][currPosition.y] = "o";
      prevPosition = { ...currPosition };
    }
    debugMsg("-----", debug);
    if (debug) printGrid(grid);
    if (
      grid[currPosition.x][currPosition.y + 1] === "o" ||
      grid[currPosition.x][currPosition.y + 1] === "#"
    ) {
      if (
        grid[currPosition.x - 1][currPosition.y + 1] !== "o" &&
        grid[currPosition.x - 1][currPosition.y + 1] !== "#"
      ) {
        currPosition.x -= 1;
      } else if (
        grid[currPosition.x + 1][currPosition.y + 1] !== "o" &&
        grid[currPosition.x + 1][currPosition.y + 1] !== "#"
      ) {
        currPosition.x += 1;
      } else {
        break;
      }
    }
    if (
      grid[currPosition.x][currPosition.y + 1] === "#" &&
      currPosition.x - 1 in grid &&
      grid[currPosition.x - 1][currPosition.y + 1] === "#" &&
      currPosition.x + 1 in grid &&
      grid[currPosition.x + 1][currPosition.y + 1] === "#"
    ) {
      break;
    }
  }
  if (currPosition.y >= lowestRock) {
    return false;
  }
  return true;
};

const dropSand2 = (grid: string[][], drop: number, debug = true) => {
  debugMsg("-----", debug);
  if (debug) printGrid(grid);
  let col = drop;
  grid[col][0] = "o";
  let prevPosition = { x: col, y: 0 };
  let currPosition = { x: col, y: 0 };
  if (
    grid[currPosition.x][currPosition.y + 1] === "o" &&
    currPosition.x - 1 in grid &&
    grid[currPosition.x - 1][currPosition.y + 1] === "o" &&
    currPosition.x + 1 in grid &&
    grid[currPosition.x + 1][currPosition.y + 1] === "o"
  ) {
    return true;
  }

  while (true) {
    grid[prevPosition.x][prevPosition.y] = ".";
    if (
      grid[currPosition.x][currPosition.y + 1] !== "#" &&
      grid[currPosition.x][currPosition.y + 1] !== "o"
    ) {
      currPosition.y += 1;
      grid[currPosition.x][currPosition.y] = "o";
      prevPosition = { ...currPosition };
      debugMsg("-----", debug);
      if (debug) printGrid(grid);
    } else {
      debugMsg(
        `${grid[currPosition.x][currPosition.y + 1]},${
          grid[currPosition.x - 1][currPosition.y + 1]
        },${grid[currPosition.x + 1][currPosition.y + 1]}`,
        debug,
      );
    }
    if (
      grid[currPosition.x][currPosition.y + 1] === "o" ||
      grid[currPosition.x][currPosition.y + 1] === "#"
    ) {
      if (
        grid[currPosition.x - 1][currPosition.y + 1] !== "o" &&
        grid[currPosition.x - 1][currPosition.y + 1] !== "#"
      ) {
        currPosition.x -= 1;
      } else if (
        grid[currPosition.x + 1][currPosition.y + 1] !== "o" &&
        grid[currPosition.x + 1][currPosition.y + 1] !== "#"
      ) {
        currPosition.x += 1;
      } else {
        break;
      }
    }

    if (
      grid[currPosition.x][currPosition.y + 1] === "#" &&
      currPosition.x - 1 in grid &&
      grid[currPosition.x - 1][currPosition.y + 1] === "#" &&
      currPosition.x + 1 in grid &&
      grid[currPosition.x + 1][currPosition.y + 1] === "#"
    ) {
      break;
    }
  }
  return true;
};

const part1 = (rawInput: string) => {
  const { grid, drop, lowestRock } = parseInput(rawInput);
  let success = dropSand(grid, drop, lowestRock, false);
  let count = 1;
  while (success) {
    success = dropSand(grid, drop, lowestRock, false);
    if (success) {
      count++;
    }
  }
  return count;
};

const part2 = (rawInput: string) => {
  const { grid, drop } = parseInput(rawInput, true);
  let count = 0;
  while (grid[500][0] !== "o") {
    dropSand2(grid, drop, false);
    count++;
  }
  return count;
};

run({
  part1: {
    tests: [
      {
        input: `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `498,4 -> 498,6 -> 496,6
  503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
