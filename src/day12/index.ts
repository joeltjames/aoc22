import run from "aocrunner";

interface Point {
  x: number;
  y: number;
}

const parseInput = (rawInput: string) => {
  let start: Point = {
    x: 0,
    y: 0,
  };
  let end: Point = {
    x: 0,
    y: 0,
  };
  let aPositions: string[] = [];
  const grid = rawInput.split("\n").map((v, rowIdx) => {
    return v.split("").map((part, colIdx) => {
      if (part === "S") {
        start = {
          x: rowIdx,
          y: colIdx,
        };
        return 97; // 'a' char code
      } else if (part === "E") {
        end = {
          x: rowIdx,
          y: colIdx,
        };
        return 122; // 'z' char code
      } else if (part === "a") {
        aPositions.push(`${rowIdx},${colIdx}`);
      }
      return part.charCodeAt(0);
    });
  });

  return {
    start,
    end,
    grid,
    aPositions,
  };
};

type Vertex = string;

class Graph {
  edges: { [vertex: Vertex]: Vertex[] } = {};

  addEdge(vertex1: Vertex, vertex2: Vertex) {
    if (!(vertex1 in this.edges)) {
      this.edges[vertex1] = [];
    }
    this.edges[vertex1].push(vertex2);
  }
}

const shortestPath = (graph: Graph, start: Vertex, end: Vertex) => {
  if (start == end) {
    return [];
  }

  const queue = [start];
  const visited: { [vertex: Vertex]: boolean } = { start: true };
  const walkedEdges: { [key: Vertex]: Vertex } = {};

  while (queue.length > 0) {
    let thisVertex = queue.shift();

    if (thisVertex) {
      for (const edge of graph.edges[thisVertex]) {
        if (visited[edge]) {
          continue;
        }

        visited[edge] = true;

        if (edge === end) {
          const path = [];
          while (thisVertex !== start) {
            path.push(thisVertex);
            thisVertex = walkedEdges[thisVertex];
          }
          path.push(thisVertex);
          path.reverse();
          return path;
        }

        walkedEdges[edge] = thisVertex;

        queue.push(edge);
      }
    }
  }

  return [];
};

const shortestPathToAny = (graph: Graph, start: Vertex, ends: Vertex[]) => {
  if (ends.includes(start)) {
    return [];
  }

  const queue = [start];
  const visited: { [vertex: Vertex]: boolean } = { start: true };
  const walkedEdges: { [key: Vertex]: Vertex } = {};

  while (queue.length > 0) {
    let thisVertex = queue.shift();

    if (thisVertex) {
      for (const edge of graph.edges[thisVertex]) {
        if (visited[edge]) {
          continue;
        }

        visited[edge] = true;

        if (ends.includes(edge)) {
          const path = [];
          while (thisVertex !== start) {
            path.push(thisVertex);
            thisVertex = walkedEdges[thisVertex];
          }
          path.push(thisVertex);
          path.reverse();
          return path;
        }

        walkedEdges[edge] = thisVertex;

        queue.push(edge);
      }
    }
  }

  return [];
};

const buildGraph = (grid: number[][]) => {
  const graph = new Graph();
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      const thisVertex = `${rowIdx},${colIdx}`;
      if (rowIdx > 0 && grid[rowIdx - 1][colIdx] - cell <= 1) {
        graph.addEdge(thisVertex, `${rowIdx - 1},${colIdx}`);
      }
      if (rowIdx < grid.length - 1 && grid[rowIdx + 1][colIdx] - cell <= 1) {
        graph.addEdge(thisVertex, `${rowIdx + 1},${colIdx}`);
      }
      if (colIdx < row.length - 1 && grid[rowIdx][colIdx + 1] - cell <= 1) {
        graph.addEdge(thisVertex, `${rowIdx},${colIdx + 1}`);
      }
      if (colIdx > 0 && grid[rowIdx][colIdx - 1] - cell <= 1) {
        graph.addEdge(thisVertex, `${rowIdx},${colIdx - 1}`);
      }
    });
  });
  return graph;
};

const buildReverseGraph = (grid: number[][]) => {
  const graph = new Graph();
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      const thisVertex = `${rowIdx},${colIdx}`;
      if (rowIdx > 0 && cell - grid[rowIdx - 1][colIdx] <= 1) {
        graph.addEdge(thisVertex, `${rowIdx - 1},${colIdx}`);
      }
      if (rowIdx < grid.length - 1 && cell - grid[rowIdx + 1][colIdx] <= 1) {
        graph.addEdge(thisVertex, `${rowIdx + 1},${colIdx}`);
      }
      if (colIdx < row.length - 1 && cell - grid[rowIdx][colIdx + 1] <= 1) {
        graph.addEdge(thisVertex, `${rowIdx},${colIdx + 1}`);
      }
      if (colIdx > 0 && cell - grid[rowIdx][colIdx - 1] <= 1) {
        graph.addEdge(thisVertex, `${rowIdx},${colIdx - 1}`);
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

const part2optimized = (rawInput: string) => {
  const input = parseInput(rawInput);
  const graph = buildReverseGraph(input.grid);
  const path = shortestPathToAny(
    graph,
    `${input.end.x},${input.end.y}`,
    input.aPositions,
  );
  return path.length;
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
    solution: part2optimized,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
