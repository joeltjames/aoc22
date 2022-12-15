import run from "aocrunner";

interface Point {
  x: number;
  y: number;
}

interface Interval {
  start: number;
  end: number;
}

const manhattanDistance = (point1: Point, point2: Point) => {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
};

const reduceIntervals = (intervals: Interval[]) => {
  return intervals
    .sort((a, b) => a.start - b.start)
    .reduce((prev, curr) => {
      const last = prev.pop();
      if (!last) {
        return [curr];
      }
      if (
        (last.start === curr.start && last.end === curr.end) ||
        (last.start <= curr.start && last.end >= curr.end)
      ) {
        prev.push(last);
        return prev;
      }
      if (last.end >= curr.start) {
        prev.push({ start: last.start, end: curr.end });
        return prev;
      }
      if (last.end < curr.start) {
        prev.push(last, curr);
        return prev;
      }
      return prev;
    }, [] as Interval[])
    .reduce((prev, curr) => {
      const last = prev.pop();
      if (!last) {
        return [curr];
      }
      if (last.end + 1 === curr.start) {
        const new1 = { start: last.start, end: curr.end };
        prev.push(new1);
      } else {
        prev.push(last, curr);
      }
      return prev;
    }, [] as Interval[]);
};

const countIntervals = (intervals: Interval[]) => {
  return intervals;
};

const generateIntervalAtRow = (
  sensor: Point,
  beacon: Point,
  rowNum: number,
) => {
  const taxicab = manhattanDistance(sensor, beacon);
  const offsetFromTargetRow = taxicab - Math.abs(sensor.y - rowNum);
  if (offsetFromTargetRow >= 0) {
    return {
      start: sensor.x - offsetFromTargetRow,
      end: sensor.x + offsetFromTargetRow,
    } as Interval;
  }
  return undefined;
};

const intervalsForRow = (
  data: { sensor: Point; beacon: Point }[],
  rowNum: number,
) => {
  const intervals: Interval[] = [];
  data.forEach(({ sensor, beacon }) => {
    const theseIntervals = generateIntervalAtRow(sensor, beacon, rowNum);
    if (theseIntervals) {
      intervals.push(theseIntervals as Interval);
    }
  });
  intervals.sort((a, b) => a.start - b.start);
  return reduceIntervals(intervals);
};

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((row) => {
    const [sensorX, sensorY, beaconX, beaconY] = row
      .replace(/x=/g, "")
      .replace(/y=/g, "")
      .replace(/:/g, "")
      .split(" ")
      .map((v) => parseInt(v))
      .filter((v) => !isNaN(v));
    return {
      sensor: {
        x: sensorX,
        y: sensorY,
      } as Point,
      beacon: {
        x: beaconX,
        y: beaconY,
      } as Point,
    };
  });
};

const part1 = (rawInput: string) => {
  const data = parseInput(rawInput);
  let rowNum = 10;
  if (data.length > 14) {
    rowNum = 2000000;
  }
  const intervals = intervalsForRow(data, rowNum);
  const intervalCount = countIntervals(intervals).reduce((prev, curr) => {
    return prev + (curr.end - curr.start);
  }, 0);
  return intervalCount;
};

const part2 = (rawInput: string) => {
  const data = parseInput(rawInput);
  let bound = 20;
  if (data.length > 20) {
    bound = 4000000;
  }

  for (let rowNum = 0; rowNum <= bound; rowNum++) {
    let intervals = intervalsForRow(data, rowNum);
    if (intervals[1]) {
      return (intervals[1].end + 1) * 4000000 + rowNum;
    }
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
      Sensor at x=9, y=16: closest beacon is at x=10, y=16
      Sensor at x=13, y=2: closest beacon is at x=15, y=3
      Sensor at x=12, y=14: closest beacon is at x=10, y=16
      Sensor at x=10, y=20: closest beacon is at x=10, y=16
      Sensor at x=14, y=17: closest beacon is at x=10, y=16
      Sensor at x=8, y=7: closest beacon is at x=2, y=10
      Sensor at x=2, y=0: closest beacon is at x=2, y=10
      Sensor at x=0, y=11: closest beacon is at x=2, y=10
      Sensor at x=20, y=14: closest beacon is at x=25, y=17
      Sensor at x=17, y=20: closest beacon is at x=21, y=22
      Sensor at x=16, y=7: closest beacon is at x=15, y=3
      Sensor at x=14, y=3: closest beacon is at x=15, y=3
      Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
      Sensor at x=9, y=16: closest beacon is at x=10, y=16
      Sensor at x=13, y=2: closest beacon is at x=15, y=3
      Sensor at x=12, y=14: closest beacon is at x=10, y=16
      Sensor at x=10, y=20: closest beacon is at x=10, y=16
      Sensor at x=14, y=17: closest beacon is at x=10, y=16
      Sensor at x=8, y=7: closest beacon is at x=2, y=10
      Sensor at x=2, y=0: closest beacon is at x=2, y=10
      Sensor at x=0, y=11: closest beacon is at x=2, y=10
      Sensor at x=20, y=14: closest beacon is at x=25, y=17
      Sensor at x=17, y=20: closest beacon is at x=21, y=22
      Sensor at x=16, y=7: closest beacon is at x=15, y=3
      Sensor at x=14, y=3: closest beacon is at x=15, y=3
      Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
        expected: 104000011,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
