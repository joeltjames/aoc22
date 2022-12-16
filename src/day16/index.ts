import run from "aocrunner";
import lodash from "lodash";
const { trim } = lodash;

class Graph {
  private adjacencyList: Map<string, Set<string>>;
  private scoreList: Map<string, number>;

  constructor() {
    this.adjacencyList = new Map();
    this.scoreList = new Map();
  }

  addVertex(vertex: string, score: number) {
    this.adjacencyList.set(vertex, new Set());
    this.scoreList.set(vertex, score);
  }

  setScore(vertex: string, score: number) {
    this.scoreList.set(vertex, score);
  }

  addEdges(vertex1: string, ...neighbors: string[]) {
    neighbors.forEach((neighbor) => {
      this.adjacencyList.get(vertex1)!.add(neighbor);
    });
  }

  getScore(vertex: string) {
    return this.scoreList.get(vertex)!;
  }

  getTotalScore(vertex: string, toIgnore: string[], modifier = 1): number {
    let score = this.scoreList.get(vertex)! / modifier;
    if (toIgnore.includes(vertex)) {
      return 0;
    }
    this.getAdjacents(vertex)
      .filter((adj) => !toIgnore.includes(adj))
      .forEach((adj, _, rest) => {
        const thisScore = this.getTotalScore(
          adj,
          [vertex, ...rest.filter((v) => v !== adj), ...toIgnore],
          modifier * 2,
        );
        score += thisScore;
      });
    return score;
  }

  getAdjacents(vertex: string) {
    return Array.from(this.adjacencyList.get(vertex)!);
  }
}

const parseInput = (rawInput: string) => {
  const nodes: {
    [key: string]: {
      node: string;
      flow: number;
      adjacents: string[];
      weight: number;
    };
  } = {};

  rawInput.split("\n").forEach((row) => {
    let [rest, neighbors] = row.split("; tunnels lead to valves ");
    if (!row.includes("; tunnels lead to valves ")) {
      [rest, neighbors] = row.split("; tunnel leads to valve ");
    }
    const adjacents = neighbors.split(",").map(trim);
    const parts = rest.split(" ");
    const node = parts[1];
    const flow = parseInt(parts[4].split("=")[1]);
    nodes[node] = {
      node,
      flow,
      adjacents,
      weight: 0,
    };
    return { node, flow, adjacents };
  });

  Object.values(nodes).map((v) => {
    const { flow, adjacents } = v;
    let weight = flow;
    weight += adjacents
      .map((a) => nodes[a].flow)
      .reduce((prev, curr) => prev + curr, 0);
    v.weight = weight;
  });

  const graph = new Graph();
  Object.values(nodes).map(({ flow, adjacents, node }) => {
    graph.addVertex(node, flow);
    graph.addEdges(node, ...adjacents);
  });

  return graph;
};

const getChoices = (graph: Graph, currentNode: string) => {
  const choices = graph.getAdjacents(currentNode).map((adj, _, siblings) => {
    const score = graph.getTotalScore(adj, [
      currentNode,
      ...siblings.filter((v) => v !== adj),
    ]);
    return { node: adj, score };
  });
  return choices.sort((a, b) => b.score - a.score);
};

const part1 = (rawInput: string) => {
  const graph = parseInput(rawInput);
  console.log(graph);
  let enabledNodes: { [node: string]: number } = {};
  let score = 0;
  let currentNode = "AA";
  let minute = 0;

  while (minute < 30) {
    console.log(`------- Minute ${minute + 1}`);
    const toAdd = Object.values(enabledNodes).reduce(
      (prev, curr) => prev + curr,
      0,
    );
    // console.log(Object.keys(enabledNodes));
    // console.log(`Adding ${toAdd}`);
    score += toAdd;
    const currentScore = graph.getScore(currentNode);
    const choices = getChoices(graph, currentNode);
    console.log(`Currently at: ${currentNode} (${currentScore})`);
    // console.log(choices.map((a) => `${a.node} (${a.score})`));
    const choice = choices.shift()!;
    if (currentScore > 0) {
      console.log(`opening ${currentNode}`);
      enabledNodes[currentNode] = graph.getScore(currentNode);
      graph.setScore(currentNode, 0);
    } else if (choice.score > 0) {
      console.log(`moving to ${choice.node} (${choice.score})`);
      currentNode = choice.node;
    } else {
      console.log(
        `Nothing to do, none of our neighbors matter and ${currentNode} already opened!`,
      );
    }
    minute++;
  }
  return score;
};

const part2 = (rawInput: string) => {
  const graph = parseInput(rawInput);
  console.log(graph);
  let enabledNodes: { [node: string]: number } = {};
  let score = 0;
  let currentNode = "AA";
  let elephantCurrentNode = "AA";
  let minute = 0;

  while (minute < 26) {
    console.log(`------- Minute ${minute + 1}`);
    const toAdd = Object.values(enabledNodes).reduce(
      (prev, curr) => prev + curr,
      0,
    );

    score += toAdd;
    const currentScore = graph.getScore(currentNode);
    const elephantCurrentScore = graph.getScore(elephantCurrentNode);
    const choices = getChoices(graph, currentNode);
    const elephantChoices = getChoices(graph, elephantCurrentNode);
    console.log(`Currently at: ${currentNode} (${currentScore})`);
    const choice = choices.shift()!;
    let elephantChoice = elephantChoices.shift()!;
    while (elephantChoice.node === choice.node && elephantChoices.length > 0) {
      elephantChoice = elephantChoices.shift()!;
    }

    if (currentScore > 0) {
      console.log(`We are opening ${currentNode}`);
      enabledNodes[currentNode] = graph.getScore(currentNode);
      graph.setScore(currentNode, 0);
    } else if (choice.score > 0) {
      console.log(`We are moving to ${choice.node} (${choice.score})`);
      currentNode = choice.node;
    } else {
      console.log(`We are not moving because ${currentNode} already opened!`);
    }

    if (elephantCurrentScore > 0) {
      console.log(`Elephant opening ${elephantCurrentNode}`);
      enabledNodes[elephantCurrentNode] = graph.getScore(elephantCurrentNode);
      graph.setScore(elephantCurrentNode, 0);
    } else if (elephantChoice.score > 0) {
      console.log(
        `Elephant moving to ${elephantChoice.node} (${elephantChoice.score})`,
      );
      elephantCurrentNode = elephantChoice.node;
    } else {
      console.log(
        `Elephant not moving because ${elephantCurrentNode} already opened!`,
      );
    }
    minute++;
  }
  return score;
};

run({
  part1: {
    tests: [
      {
        input: `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`,
        expected: 1651,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`,
        expected: 1707,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
