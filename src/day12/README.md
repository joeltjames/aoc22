# 🎄 Advent of Code 2022 - day 12 🎄

## Info

Task description: [link](https://adventofcode.com/2022/day/12)

## Notes
Just do a BFS from S => Z where the edges of the graph are first of all directed and second of all only exist if the (v2 - v1) <= 1. That solves part 1.

For part 2, find all of the a's, then just run part 1 for each A instead of the S position.
...