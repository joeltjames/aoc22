import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let cycle = 1;
  let x = 1;
  let toAdd: number[] = [];

  input.forEach((step) => {
    const [command, value] = step.trim().split(" ");
    if (command === "addx") {
      toAdd.push(0);
      toAdd.push(parseInt(value));
    } else {
      toAdd.push(0);
    }
  });

  const results: number[] = [];
  toAdd.forEach((val) => {
    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      results.push(cycle * x);
    }
    x += val;
    cycle++;
  });

  console.log();
  return results.reduce((prev, curr) => prev + curr, 0);
};

const part1Improved = (rawInput: string) => {
  const input = parseInput(rawInput);
  let cycle = 0;
  let x = 1;
  const results: number[] = [];

  input.forEach((step) => {
    const [command, value] = step.trim().split(" ");
    const steps = command === "addx" ? 2 : 1;
    for (let i = 0; i < steps; i++) {
      cycle += 1;
      if ((cycle - 20) % 40 === 0) {
        results.push(cycle * x);
      }
    }
    if (command === "addx") {
      x += parseInt(value);
    }
  });

  return results.reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let cycle = 1;
  let x = 1;
  let toAdd: number[] = [];

  input.forEach((step) => {
    const [command, value] = step.trim().split(" ");
    if (command === "addx") {
      toAdd.push(0);
      toAdd.push(parseInt(value));
    } else {
      toAdd.push(0);
    }
  });

  const rows: string[] = [];
  let currentRow = "";
  toAdd.forEach((val) => {
    const visible = [x, x - 1, x + 1];
    if (visible.includes((cycle - 1) % 40)) {
      currentRow += "█";
    } else {
      currentRow += " ";
    }
    if (currentRow.length % 40 === 0) {
      rows.push(`${currentRow}`);
      currentRow = "";
    }
    x += val;
    cycle++;
  });
  console.log(rows.join("\n"));
  return "";
};

const part2Improved = (rawInput: string) => {
  const input = parseInput(rawInput);
  let cycle = 0;
  let x = 1;
  const results: number[] = [];
  const rows: string[] = [];
  let currentRow = "";

  input.forEach((step) => {
    const [command, value] = step.trim().split(" ");
    const steps = command === "addx" ? 2 : 1;
    for (let i = 0; i < steps; i++) {
      cycle += 1;
      if ((cycle - 20) % 40 === 0) {
        results.push(cycle * x);
      }

      if (Math.abs(((cycle - 1) % 40) - x) <= 1) {
        currentRow += "█";
      } else {
        currentRow += " ";
      }

      if (currentRow.length % 40 === 0) {
        rows.push(`${currentRow}`);
        currentRow = "";
      }
    }
    if (command === "addx") {
      x += parseInt(value);
    }
  });

  console.log(rows.join("\n"));
  return results.reduce((prev, curr) => prev + curr, 0);
};

run({
  part1: {
    tests: [
      //       {
      //         input: `noop
      // addx 3
      // addx -5`,
      //         expected: 1,
      //       },
      {
        input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35`,
        expected: 420,
      },
      {
        input: `addx 15
      addx -11
      addx 6
      addx -3
      addx 5
      addx -1
      addx -8
      addx 13
      addx 4
      noop
      addx -1
      addx 5
      addx -1
      addx 5
      addx -1
      addx 5
      addx -1
      addx 5
      addx -1
      addx -35
      addx 1
      addx 24
      addx -19
      addx 1
      addx 16
      addx -11
      noop
      noop
      addx 21
      addx -15
      noop
      noop
      addx -3
      addx 9
      addx 1
      addx -3
      addx 8
      addx 1
      addx 5
      noop
      noop
      noop
      noop
      noop
      addx -36
      noop
      addx 1
      addx 7
      noop
      noop
      noop
      addx 2
      addx 6
      noop
      noop
      noop
      noop
      noop
      addx 1
      noop
      noop
      addx 7
      addx 1
      noop
      addx -13
      addx 13
      addx 7
      noop
      addx 1
      addx -33
      noop
      noop
      noop
      addx 2
      noop
      noop
      noop
      addx 8
      noop
      addx -1
      addx 2
      addx 1
      noop
      addx 17
      addx -9
      addx 1
      addx 1
      addx -3
      addx 11
      noop
      noop
      addx 1
      noop
      addx 1
      noop
      noop
      addx -13
      addx -19
      addx 1
      addx 3
      addx 26
      addx -30
      addx 12
      addx -1
      addx 3
      addx 1
      noop
      noop
      noop
      addx -9
      addx 18
      addx 1
      addx 2
      noop
      noop
      addx 9
      noop
      noop
      noop
      addx -1
      addx 2
      addx -37
      addx 1
      addx 3
      noop
      addx 15
      addx -21
      addx 22
      addx -6
      addx 1
      noop
      addx 2
      addx 1
      noop
      addx -10
      noop
      noop
      addx 20
      addx 1
      addx 2
      addx 2
      addx -6
      addx -11
      noop
      noop
      noop`,
        expected: 13140,
      },
    ],
    solution: part1Improved,
  },
  part2: {
    tests: [
      {
        input: `addx 15
      addx -11
      addx 6
      addx -3
      addx 5
      addx -1
      addx -8
      addx 13
      addx 4
      noop
      addx -1
      addx 5
      addx -1
      addx 5
      addx -1
      addx 5
      addx -1
      addx 5
      addx -1
      addx -35
      addx 1
      addx 24
      addx -19
      addx 1
      addx 16
      addx -11
      noop
      noop
      addx 21
      addx -15
      noop
      noop
      addx -3
      addx 9
      addx 1
      addx -3
      addx 8
      addx 1
      addx 5
      noop
      noop
      noop
      noop
      noop
      addx -36
      noop
      addx 1
      addx 7
      noop
      noop
      noop
      addx 2
      addx 6
      noop
      noop
      noop
      noop
      noop
      addx 1
      noop
      noop
      addx 7
      addx 1
      noop
      addx -13
      addx 13
      addx 7
      noop
      addx 1
      addx -33
      noop
      noop
      noop
      addx 2
      noop
      noop
      noop
      addx 8
      noop
      addx -1
      addx 2
      addx 1
      noop
      addx 17
      addx -9
      addx 1
      addx 1
      addx -3
      addx 11
      noop
      noop
      addx 1
      noop
      addx 1
      noop
      noop
      addx -13
      addx -19
      addx 1
      addx 3
      addx 26
      addx -30
      addx 12
      addx -1
      addx 3
      addx 1
      noop
      noop
      noop
      addx -9
      addx 18
      addx 1
      addx 2
      noop
      noop
      addx 9
      noop
      noop
      noop
      addx -1
      addx 2
      addx -37
      addx 1
      addx 3
      noop
      addx 15
      addx -21
      addx 22
      addx -6
      addx 1
      noop
      addx 2
      addx 1
      noop
      addx -10
      noop
      noop
      addx 20
      addx 1
      addx 2
      addx 2
      addx -6
      addx -11
      noop
      noop
      noop`,
        expected: 13140,
      },
    ],
    solution: part2Improved,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
