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

const parseInput = (rawInput: string) => rawInput.split("\n");

function determineMoveFn(target: Point, knot: Point): (point: Point) => Point {
  const distance = Math.floor(
    Math.sqrt(Math.pow(target.x - knot.x, 2) + Math.pow(target.y - knot.y, 2)),
  );

  const x = target.x - knot.x;
  const y = target.y - knot.y;

  let direction = "S";

  if (distance > 1) {
    if (x > 1 && y === 0) {
      direction = "R";
    } else if (x < -1 && y === 0) {
      direction = "L";
    } else if (x === 0 && y > 1) {
      direction = "U";
    } else if (x === 0 && y < -1) {
      direction = "D";
    } else if (x > 0 && y > 0) {
      direction = "RU";
    } else if (x < 0 && y > 0) {
      direction = "LU";
    } else if (x > 0 && y < 0) {
      direction = "RD";
    } else if (x < 0 && y < 0) {
      direction = "LD";
    }
  }

  return functionMap[direction];
}

const checkAndMove = (target: Point, knot: Point) => {
  const moveFn = determineMoveFn(target, knot);
  return moveFn(knot);
};

const solution = (knotCount: number) => {
  return (rawInput: string) => {
    const steps = parseInput(rawInput);
    let headPosition = { x: 0, y: 0 };
    let knotPositions = Array(knotCount).fill({ ...headPosition });
    const positions = new Set([`${headPosition.x},${headPosition.y}`]);
    steps.forEach((step) => {
      const [direction, cnt] = step.split(" ");
      const directionFn = functionMap[direction];
      const count = Number(cnt);
      for (let i = 0; i < count; i++) {
        headPosition = directionFn(headPosition);
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
