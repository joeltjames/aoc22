import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput
    .split("\n\n")
    .map((vals) => vals.split("\n").map((val) => parseInt(val)));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let max = 0;
  input.forEach((set) => {
    const sum = set.reduce((partialSum, a) => partialSum + a, 0);
    if (sum > max) {
      max = sum;
    }
  });
  return max;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sums = input
    .map((set) => set.reduce((partialSum, a) => partialSum + a, 0))
    .sort((a, b) => b - a);
  return sums.slice(0, 3).reduce((partialSum, a) => partialSum + a, 0);
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
