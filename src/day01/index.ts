import run from "aocrunner";
import { sum } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  return rawInput
    .split("\n\n")
    .map((vals) => vals.split("\n").map((val) => parseInt(val)));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let max = 0;
  input.forEach((set) => {
    const result = sum(set);
    if (result > max) {
      max = result;
    }
  });
  return max;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sums = input.map((set) => sum(set)).sort((a, b) => b - a);
  return sum(sums.slice(0, 3));
};

run({
  part1: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
