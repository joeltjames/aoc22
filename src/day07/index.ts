import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const cdRegex = /^\$ cd/;
const dirRegex = /^dir/;
const fileRegex = /^(\d+)/;

interface Node {
  name: string;
  parent: Directory;
}

interface File extends Node {
  name: string;
  parent: Directory;
  size: number;
}

interface Directory extends Node {
  name: string;
  parent: Directory;
  children: { [name: string]: Directory | File };
  size?: number;
}

const isDirectory = (x: Directory | File | undefined): x is Directory => {
  return x && (x as any).children;
};

const calculateSize = (x: Directory): { size: number; sizes: number[] } => {
  const sizes: number[] = [];

  const recurse = (x: Directory): number => {
    if (x.size) {
      return x.size;
    }

    const size = Object.values(x.children)
      .map((child) => {
        if (isDirectory(child)) {
          return recurse(child);
        } else if (child) {
          return child.size;
        } else {
          return 0;
        }
      })
      .reduce((prev, curr) => prev + curr, 0);

    x.size = size;

    sizes.push(size);

    return size;
  };
  const size = recurse(x);
  return {
    size,
    sizes,
  };
};

const populateFileStructure = (input: string[]) => {
  let current_dir: Directory = {
    name: "/",
    children: {},
    parent: null as any,
  };

  const root = current_dir;

  input.forEach((line) => {
    const parts = line.split(" ");
    if (line.match(cdRegex)) {
      const [_, __, dir] = parts;
      switch (dir) {
        case "/":
          current_dir = root;
          break;
        case "..":
          current_dir = current_dir.parent;
          break;
        default:
          if (dir) {
            const child = current_dir.children[dir];
            if (isDirectory(child)) {
              current_dir = child;
            }
          }
      }
    } else if (line.match(dirRegex)) {
      const [_, name] = parts;
      if (name) {
        const dir: Directory = {
          name,
          parent: current_dir,
          children: {},
        };
        current_dir.children[name] = dir;
      }
    } else if (line.match(fileRegex)) {
      const [size, name] = parts;
      if (size && name) {
        const file: File = {
          name,
          size: parseInt(size),
          parent: current_dir,
        };
        current_dir.children[name] = file;
      }
    }
  });

  return root;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).slice(1);
  const root = populateFileStructure(input);
  const { sizes } = calculateSize(root);

  return sizes
    .filter((size) => size < 100000)
    .reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const root = populateFileStructure(input);
  const { size, sizes } = calculateSize(root);
  const unusedSpace = 70000000 - size;
  const neededSpace = 30000000 - unusedSpace;
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
    solution: part1,
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
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
