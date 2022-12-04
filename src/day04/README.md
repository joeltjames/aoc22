# 🎄 Advent of Code 2022 - Day 4 - Camp Cleanup🎄

## Info

Task description: [link](https://adventofcode.com/2022/day/4)

## Notes
Pretty simple task here. I start off by converting the `X-Z` notation to `Set([X...Z])`. Then for part 1, we are looking for subsets, meaning that every item in `Set([X...Z])` is included in `Set([A...C])` or vice versa. Part 2 is actually even simpler, using the same Sets, just look for any intersection. Any item in `Set([X...Z])` is included in `Set([A...C])`

At first, I solved this in two distinct ways with two distinct methods, but realized the solution could be collapsed down to one function which either calls `every` or `some` on the underlying Sets.

```
const testSolution = (method: "every" | "some") => {
  const testFn = (set1: Set<any>, set2: Set<any>) => {
    return Array.from(set1)[method]((element: any) => {
      return set2.has(element);
    });
  };
  return (rawInput: string) => {
    return parseInput(rawInput).filter(
      ([first, second]) => testFn(first, second) || testFn(second, first),
    ).length;
  };
};
```


...