# 🎄 Advent of Code 2022 - day 6 - Tuning Trouble 🎄

## Info

Task description: [link](https://adventofcode.com/2022/day/6)

## Notes
This one was surprisingly simple. Convert the strings into a char array, start at the window size, look at the previous window size characters, filter to unique, check the size. If its the window size, return it. Otherwise, keep going.

...