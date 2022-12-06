import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("");

const findWindow = (windowSize: number) => {
  return (rawInput: string) => {
    const input = parseInput(rawInput);

    for (let i = windowSize; i < input.length; i++) {
      if (
        input
          .slice(i - windowSize, i)
          .filter((val, idx, arr) => arr.indexOf(val) === idx).length ===
        windowSize
      ) {
        return i;
      }
    }
    return 0;
  };
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: findWindow(4),
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
    ],
    solution: findWindow(14),
  },
  trimTestInputs: true,
  // onlyTests: true,
});
