import run from "aocrunner";

interface Point {
  x: number;
  y: number;
}

const parseInput = (rawInput: string) => {
  let startPosition: Point = {
    x: 0,
    y: 0,
  };
  let endPosition: Point = {
    x: 0,
    y: 0,
  };
  let aPositions: string[] = [];
  const grid = rawInput.split("\n").map((v, rowIdx) => {
    const parts: string[] = v.split("");
    if (parts.includes("S")) {
      startPosition = {
        x: rowIdx,
        y: parts.indexOf("S"),
      };
      parts[startPosition.y] = "a";
    }
    if (parts.includes("E")) {
      endPosition = {
        x: rowIdx,
        y: parts.indexOf("E"),
      };
      parts[endPosition.y] = "z";
    }
    return parts.map((part, colIdx) => {
      if (part === "a") {
        aPositions.push(`${rowIdx},${colIdx}`);
      }
      return part.charCodeAt(0);
    });
  });

  return {
    start: startPosition,
    end: endPosition,
    grid,
    aPositions,
  };
};

class Graph {
  neighbors: { [key: string]: string[] } = {}; // Key = vertex, value = array of neighbors.

  addEdge(v1: string, v2: string) {
    if (this.neighbors[v1] === undefined) {
      this.neighbors[v1] = [];
    }
    this.neighbors[v1].push(v2);
  }
}

function shortestPath(graph: Graph, source: string, target: string) {
  if (source == target) {
    return [];
  }

  let toProcess = [source],
    visited = { [source]: true },
    predecessor: { [key: string]: string } = {},
    count = 0;

  while (count < toProcess.length) {
    let thisVertex = toProcess[count++];
    const neighbors = graph.neighbors[thisVertex];

    for (let neighbor of neighbors) {
      if (visited[neighbor]) {
        continue;
      }

      visited[neighbor] = true;

      if (neighbor === target) {
        const path = [];
        while (thisVertex !== source) {
          path.push(thisVertex);
          thisVertex = predecessor[thisVertex];
        }
        path.push(thisVertex);
        path.reverse();
        return path;
      }

      predecessor[neighbor] = thisVertex;

      toProcess.push(neighbor);
    }
  }

  return [];
}

const buildGraph = (grid: number[][]) => {
  const graph = new Graph();
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (rowIdx > 0 && grid[rowIdx - 1][colIdx] - cell <= 1) {
        graph.addEdge(`${rowIdx},${colIdx}`, `${rowIdx - 1},${colIdx}`);
      }
      if (rowIdx < grid.length - 1 && grid[rowIdx + 1][colIdx] - cell <= 1) {
        graph.addEdge(`${rowIdx},${colIdx}`, `${rowIdx + 1},${colIdx}`);
      }
      if (colIdx < row.length - 1 && grid[rowIdx][colIdx + 1] - cell <= 1) {
        graph.addEdge(`${rowIdx},${colIdx}`, `${rowIdx},${colIdx + 1}`);
      }
      if (colIdx > 0 && grid[rowIdx][colIdx - 1] - cell <= 1) {
        graph.addEdge(`${rowIdx},${colIdx}`, `${rowIdx},${colIdx - 1}`);
      }
    });
  });
  return graph;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const graph = buildGraph(input.grid);
  const path = shortestPath(
    graph,
    `${input.start.x},${input.start.y}`,
    `${input.end.x},${input.end.y}`,
  );
  return path.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const graph = buildGraph(input.grid);
  let min = Number.MAX_VALUE;
  input.aPositions.forEach((position) => {
    const path = shortestPath(graph, position, `${input.end.x},${input.end.y}`);
    if (path.length < min && path.length > 0) {
      min = path.length;
    }
  });
  return min;
};

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
