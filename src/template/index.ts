import run from "aocrunner";

/*
 * Reducers
 */
export const sum = (arr: number[]) =>
  arr.reduce((a: number, b: number) => a + b, 0);

/*
 * Set math
 */

export const hasAnyIntersection = (set1: Set<any>, set2: Set<any>): boolean => {
  return Array.from(set1).some((element) => {
    return set2.has(element);
  });
};

export const intersection = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  return new Set([...set1].filter((x) => set2.has(x)));
};

export const isSubset = <T>(set1: Set<T>, set2: Set<T>): boolean => {
  return Array.from(set1).every((element) => {
    return set2.has(element);
  });
};

/*
 * END Set math
 */

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);
  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
