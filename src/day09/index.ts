import run from "aocrunner";

interface Point {
  x: number;
  y: number;
}

const functionMap: {
  [dir: string]: (point: Point) => Point;
} = {
  R: ({ x, y }) => ({ x: x + 1, y }),
  L: ({ x, y }) => ({ x: x - 1, y }),
  U: ({ x, y }) => ({ x, y: y + 1 }),
  D: ({ x, y }) => ({ x, y: y - 1 }),
  RU: ({ x, y }) => ({ x: x + 1, y: y + 1 }),
  RD: ({ x, y }) => ({ x: x + 1, y: y - 1 }),
  LU: ({ x, y }) => ({ x: x - 1, y: y + 1 }),
  LD: ({ x, y }) => ({ x: x - 1, y: y - 1 }),
  S: ({ x, y }) => ({ x, y }),
};

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((v) => {
    const [direction, count] = v.split(" ");
    return {
      directionFn: functionMap[direction],
      count: Number(count),
    };
  });

const isKnotAdjacent = (head: Point, tail: Point) => {
  return (
    (head.x === tail.x && head.y === tail.y) ||
    (head.x === tail.x && Math.abs(head.y - tail.y) === 1) ||
    (head.y === tail.y && Math.abs(head.x - tail.x) === 1) ||
    (Math.abs(head.x - tail.x) === 1 && Math.abs(head.y - tail.y) === 1)
  );
};

function determineMoveFn(head: Point, tail: Point): (point: Point) => Point {
  const distance = Math.sqrt(
    Math.pow(head.x - tail.x, 2) + Math.pow(head.y - tail.y, 2),
  );
  const x = (head.x - tail.x) / distance;
  const y = (head.y - tail.y) / distance;

  if (x === 1 && y === 0) {
    return functionMap["R"];
  }
  if (x === -1 && y === 0) {
    return functionMap["L"];
  }
  if (x === 0 && y === 1) {
    return functionMap["U"];
  }
  if (x === 0 && y === -1) {
    return functionMap["D"];
  }
  if (x > 0 && y > 0) {
    return functionMap["RU"];
  }
  if (x < 0 && y > 0) {
    return functionMap["LU"];
  }
  if (x > 0 && y < 0) {
    return functionMap["RD"];
  }
  if (x < 0 && y < 0) {
    return functionMap["LD"];
  }

  return functionMap["S"];
}

const checkAndMove = (target: Point, knot: Point) => {
  if (!isKnotAdjacent(target, knot)) {
    const moveFn = determineMoveFn(target, knot);
    return moveFn(knot);
  }
  return knot;
};

const solution = (knotCount: number) => {
  return (rawInput: string) => {
    const steps = parseInput(rawInput);
    let headPosition = { x: 0, y: 0 };
    let knotPositions = Array(knotCount).fill({ ...headPosition });
    const positions = new Set([`${headPosition.x},${headPosition.y}`]);
    steps.forEach((step) => {
      for (let count = 0; count < step.count; count++) {
        headPosition = step.directionFn(headPosition);
        knotPositions[0] = checkAndMove(headPosition, knotPositions[0]);
        knotPositions.forEach((knot, idx) => {
          if (idx > 0) {
            knotPositions[idx] = checkAndMove(knotPositions[idx - 1], knot);
          }
        });
        positions.add(`${knotPositions.at(-1).x},${knotPositions.at(-1).y}`);
      }
    });

    return positions.size;
  };
};

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: solution(1),
  },
  part2: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 1,
      },
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: solution(9),
  },
  trimTestInputs: true,
  // onlyTests: true,
});
