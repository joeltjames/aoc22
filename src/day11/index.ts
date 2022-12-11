import run from "aocrunner";
import lodash from "lodash";
const { isEqual } = lodash;

interface Monkey {
  id: number;
  items: number[];
  op: (worryStart: number) => number;
  test: (worry: number) => number;
  testNum: number;
  inspections: number;
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n\n").map((monkeyData, idx) => {
    let monkey: Monkey = {
      id: idx,
      items: [],
      op: () => 0,
      test: () => 0,
      inspections: 0,
      testNum: 0,
    };

    monkeyData
      .split("\n")
      .map((val) => val.trim())
      .forEach((line, idx, list) => {
        if (line.startsWith("Starting")) {
          monkey.items = line
            .split(":")[1]
            .trim()
            .split(",")
            .map((v) => Number(v));
        } else if (line.startsWith("Operation")) {
          const operation = line.split("=")[1].trim();
          monkey.op = (worry: number) => {
            return eval(operation.replace(/old/g, worry.toString()));
          };
        } else if (line.startsWith("Test")) {
          monkey.testNum = parseInt(line.split(" ").at(-1) || "");
          const positiveResult = parseInt(
            list[idx + 1].split(" ").at(-1) || "",
          );
          const negativeResult = parseInt(
            list[idx + 2].split(" ").at(-1) || "",
          );
          monkey.test = (worry: number) => {
            const matches = worry % monkey.testNum === 0;
            return matches ? positiveResult : negativeResult;
          };
        }
      });
    return monkey;
  });

const part1 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  for (let i = 0; i < 20; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length) {
        const worry = monkey.items.shift() || 0;
        let newWorry = monkey.op(worry);
        newWorry = Math.floor(newWorry / 3);
        monkey.inspections++;
        const target = monkey.test(newWorry);
        monkeys[target].items.push(newWorry);
      }
    });
  }

  const sorted = monkeys.map((m) => m.inspections).sort((a, b) => b - a);
  return sorted[0] * sorted[1];
};

const part2 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  const superMod = monkeys.reduce((prev, monkey) => monkey.testNum * prev, 1);

  for (let round = 0; round < 10000; round++) {
    monkeys.forEach((monkey) => {
      monkey.inspections += monkey.items.length;
      while (monkey.items.length) {
        const worry = monkey.items.shift() || 0;
        let newWorry = monkey.op(worry) % superMod;
        const target = monkey.test(newWorry);
        monkeys[target].items.push(newWorry);
      }
    });
  }

  const sorted = monkeys.map((m) => m.inspections).sort((a, b) => b - a);
  return sorted[0] * sorted[1];
};

run({
  part1: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
