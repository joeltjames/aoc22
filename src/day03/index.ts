import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((val) => val.split(""));

const intersection = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  return new Set([...set1].filter((x) => set2.has(x)));
};

const getPriority = (letter: string) => {
  const code = letter.charCodeAt(0);

  if (code >= uppercaseA && code <= uppercaseZ) {
    return code - uppercaseA + 27;
  }

  return code - lowercaseA + 1;
};

const lowercaseA = "a".charCodeAt(0);
const uppercaseA = "A".charCodeAt(0);
const uppercaseZ = "Z".charCodeAt(0);

const part1 = (rawInput: string) => {
  return parseInput(rawInput)
    .map((chars) => ({
      first: new Set(chars.slice(0, chars.length / 2)),
      second: new Set(chars.slice(chars.length / 2)),
    }))
    .map(({ first, second }) => intersection(first, second))
    .map((set) => new Array(...set.values()).map((val) => getPriority(val)))
    .reduce((prev, curr) => prev.concat(curr), [])
    .reduce((prev, curr) => prev + curr, 0);
};

let groupByN = <T>(n: number, data: T[]) => {
  let result = [];
  for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
  return result;
};

const part2 = (rawInput: string) => {
  return groupByN(3, parseInput(rawInput))
    .map((group) => group.map((arr) => new Set(arr)))
    .map((group) => {
      let intersect = intersection(group[0], group[1]);
      intersect = intersection(intersect, group[2]);
      return new Array([...intersect.values()])[0];
    })
    .reduce((prev, curr) => prev.concat(curr), [])
    .map((val) => getPriority(val))
    .reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
