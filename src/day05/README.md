# 🎄 Advent of Code 2022 - day 5 - Supply Stacks 🎄

## Info

Task description: [link](https://adventofcode.com/2022/day/5)

## Notes
Hardest part here was definitely parsing the input file. Th trick I used, was that if you replaced 4 spaces with a single space, and removed the brackets, then split on spaces, you end up with perfectly formatted arrays in row major form. A simple matrix transpose + reversal of each row gets you to a neat array of stacks, where the last items in the list are top of the stacks. 

Next, to determine the moves, we just split on spaces, convert each item to an integer, and filter everything that isn't a valid number. This always gives us an array like: [count, start, end].

Finally, we just work through the list of moves. For part one, for each crate we need to move, just pop and push. For part two, splice and concat.
...