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

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((val) => val.split(","))
    .map((vals) => {
      return vals.map((val) => {
        const [start, end] = val.split("-").map((v) => parseInt(v));
        const set = new Set();
        for (let i = start; i <= end; i++) {
          set.add(i);
        }
        return set;
      });
    });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matches = input.filter(([first, second]) => {
    isSubset(first, second) || isSubset(second, first);
  });
  return matches.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matches = input
    .map(([first, second]) => {
      return hasAnyIntersection(first, second);
    })
    .filter((val) => val);
  return matches.length;
};

const testSolution = (method: "every" | "some") => {
  const testFn = (set1: Set<any>, set2: Set<any>) => {
    return Array.from(set1)[method]((element: any) => {
      return set2.has(element);
    });
  };
  return (rawInput: string) => {
    return parseInput(rawInput).filter(
      ([first, second]) => testFn(first, second) || testFn(second, first),
    ).length;
  };
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: testSolution("every"),
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: testSolution("some"),
  },
  trimTestInputs: true,
  // onlyTests: true,
});
