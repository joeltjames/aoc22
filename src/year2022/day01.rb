require 'pp'

module Year2022
  class Day01
    def part1(input)
      calorie_sums(input).max
    end

    def part2(input)
      calorie_sums(input).slice(0, 3).sum
    end

    def calorie_sums(input)
      input.split("\n\n").map { |group| group.split("\n").map(&:to_i).sum }.sort.reverse!
    end
  end
end
