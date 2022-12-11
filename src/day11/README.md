# 🎄 Advent of Code 2022 - day 11 🎄

## Info

Task description: [link](https://adventofcode.com/2022/day/11)

## Notes
This was an interesting problem. The "trick" to the first part was just parsing the data. The trick to the second part was figuring out the math. At first, I tried to brute force the operation we needed, which actually felt like the right solution, because it was pretty simple to get started and it made sense as to why we were given so much output for the second part. 

Once I got to 3 operands and 20k results, I realized it might not be this, so I actually thought about it for a bit. Since the only thing that matters is the modulo tests that we are doing, the actual value doesn't matter (like it would with a strict comparison). So the obvious thing is to do some `mod` operation. But the value was the tricky part. Obviously if you mod something, and then mod that result, you get the same value. But we can't just do that for one of the monkey tests, we have to do it across the board. Doing `mod` with a multiple of the value you care about still results in the same value at the end. So we just multiple all of the test values together and we end up with a drastically smaller number that has the same modulo math as our original number.

...