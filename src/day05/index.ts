import run from "aocrunner";

/*
 * Reducers
 */
export const sum = (arr: number[]) =>
  arr.reduce((a: number, b: number) => a + b, 0);

export const transpose = <T>(matrix: Array<Array<T>>) => {
  let res: any[][] = Array(matrix[0].length)
    .fill(0)
    .map(() => []);
  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      res[i][j] = matrix[j][i];
    }
  }
  return res;
};
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

const regex = /move (\d+) from (\d+) to (\d+)/gm;

const parseInput = (rawInput: string) => {
  const [stacks, moves] = rawInput.split("\n\n");
  let stacks2 = stacks.split("\n").map((val) =>
    val
      .replace(/    /g, " ")
      .replace(/[\[\]]/g, "")
      .split(" "),
  );
  stacks2 = transpose(stacks2.slice(0, stacks2.length - 1)).map((val) =>
    val.reverse().filter((v) => !!v),
  );
  return {
    stacks: stacks2,
    moves: moves
      .split("\n")
      .filter((val) => !!val.trim())
      .map((val) => {
        const [count, start, end] = val
          .split(" ")
          .map((val) => parseInt(val))
          .filter((val) => !!val);
        return { count, start: start - 1, end: end - 1 };
      }),
  };
};

const part1 = (rawInput: string) => {
  const { stacks, moves } = parseInput(rawInput);
  for (let move of moves) {
    for (let i = 0; i < move.count; i++) {
      const item = stacks[move.start].pop();
      if (item) {
        stacks[move.end].push(item);
      }
    }
  }
  return stacks
    .map((stack) => stack.pop())
    .reduce((a, b) => a?.concat(b || ""), "");
};

const part2 = (rawInput: string) => {
  const { stacks, moves } = parseInput(rawInput);
  for (let move of moves) {
    const toAdd = stacks[move.start].splice(
      stacks[move.start].length - move.count,
    );
    stacks[move.end] = stacks[move.end].concat(toAdd);
  }
  return stacks
    .map((stack) => stack.pop())
    .reduce((a, b) => a?.concat(b || ""), "");
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  // onlyTests: true,
});
