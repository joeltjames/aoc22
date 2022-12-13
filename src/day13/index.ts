import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((pairs) => pairs.split("\n").map((val) => JSON.parse(val)));

enum Result {
  IN_ORDER,
  NOT_IN_ORDER,
  UNSURE,
}

const compare = (left: any[], right: any[]) => {
  const inOrder = areInOrder(left, right);

  if (inOrder === Result.IN_ORDER) {
    return -1;
  }

  if (inOrder === Result.NOT_IN_ORDER) {
    return 11;
  }

  return 0;
};

const areInOrder = (
  listOne: (number | any)[],
  listTwo: (number | any)[],
): Result => {
  for (let i = 0; i < listOne.length; i++) {
    const left = listOne[i];
    const right = listTwo[i];

    if (!(i in listTwo)) {
      return Result.NOT_IN_ORDER;
    }

    if (!Array.isArray(left) && !Array.isArray(right)) {
      if (left === right) {
        continue;
      }

      if (left < right) {
        return Result.IN_ORDER;
      } else {
        return Result.NOT_IN_ORDER;
      }
    } else {
      let leftToCompare = Array.isArray(left) ? left : [left];
      let rightToCompare = Array.isArray(right) ? right : [right];

      const inOrder = areInOrder(leftToCompare, rightToCompare);

      if (inOrder === Result.UNSURE) {
        continue;
      } else {
        return inOrder;
      }
    }
  }

  if (listOne.length < listTwo.length) {
    return Result.IN_ORDER;
  }

  return Result.UNSURE;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  input.forEach((pairs, idx) => {
    if (areInOrder(pairs[0], pairs[1]) === Result.IN_ORDER) {
      sum += idx + 1;
    }
  });
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).reduce(
    (prev, curr) => prev.concat(curr),
    [],
  );
  const divider1 = [[2]];
  const divider2 = [[6]];
  input.push(divider1, divider2);
  const sorted = input.sort(compare);
  return (sorted.indexOf(divider1) + 1) * (sorted.indexOf(divider2) + 1);
};

run({
  part1: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
