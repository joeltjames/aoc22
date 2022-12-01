require 'spec_helper'

RSpec.describe Year2022::Day01 do
  it "solves part1" do
    d = Year2022::Day01.new
    expect(d.part1('1000
2000
3000

4000

5000
6000

7000
8000
9000

10000')).to eq(24000)
  end

  it "solves part2" do
    d = Year2022::Day01.new
    expect(d.part2('1000
2000
3000

4000

5000
6000

7000
8000
9000

10000')).to eq(45000)
  end
end
