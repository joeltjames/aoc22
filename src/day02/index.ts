import run from "aocrunner";
import { execFile } from "child_process";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((v) => v.split(" "));

const elfMapping: any = {
  A: 1,
  B: 2,
  C: 3,
};

const youMapping: any = {
  X: 1,
  Y: 2,
  Z: 3,
};

const calculateScore = ({ elf, you }: { elf: number; you: number }) => {
  let score = you;
  const diff = you - elf;
  if (diff === 0) {
    score += 3;
  }
  if (diff === 1 || diff === -2) {
    score += 6;
  }
  return score;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map(([elf, you]) => ({
    elf: elfMapping[elf],
    you: youMapping[you],
  }));
  const scores = input.map(calculateScore);
  return scores.reduce((prev, curr) => prev + curr, 0);
};

const resultMap: any = {
  X: -1,
  Y: 0,
  Z: 1,
};

const determineYou = ({ elf, result }: { elf: number; result: number }) => {
  let maybeYou = elf + result;
  if (maybeYou > 3) {
    maybeYou -= 3;
  }
  if (maybeYou < 1) {
    maybeYou += 3;
  }

  return {
    elf,
    you: maybeYou,
  };
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map(([elf, result]) => ({
    elf: elfMapping[elf],
    result: resultMap[result],
  }));

  return input
    .map(determineYou)
    .map(calculateScore)
    .reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
