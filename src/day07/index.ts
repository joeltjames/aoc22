import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const fileRegex = /^(\d+)/;

const calculateSizes = (input: string[]) => {
  let currentPath = ["/"];

  const sizes: { [key: string]: number } = {};

  input.forEach((line) => {
    const parts = line.split(" ");
    if (line.includes("$ cd")) {
      const dir = parts[2] || "";
      switch (dir) {
        case "/":
          currentPath = ["/"];
          break;
        case "..":
          currentPath.pop();
          break;
        default:
          currentPath.push(dir);
      }
    } else if (line.match(fileRegex)) {
      const size = parts[0];
      const workingPath = [...currentPath];
      while (workingPath.length > 0) {
        const thisPath = workingPath.join("/");
        sizes[thisPath] = (sizes[thisPath] || 0) + +(size || 0);
        workingPath.pop();
      }
    }
  });

  return {
    rootSize: sizes["/"] || 0,
    sizes: Object.values(sizes),
  };
};

const part1Fast = (rawInput: string) => {
  const input = parseInput(rawInput).slice(1);
  const { sizes } = calculateSizes(input);
  return sizes
    .filter((size) => size < 100000)
    .reduce((prev, curr) => prev + curr, 0);
};

const part2Fast = (rawInput: string) => {
  const input = parseInput(rawInput).slice(1);
  const { rootSize, sizes } = calculateSizes(input);
  const neededSpace = -40000000 + rootSize;
  return sizes.filter((s) => s >= neededSpace).sort((a, b) => a - b)[0];
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1Fast,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2Fast,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
