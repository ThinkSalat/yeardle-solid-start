export class YearRange {
  low: number;
  high: number;

  constructor(low: number, high: number) {
    this.low = low;
    this.high = high;
  }

  numberInRange(number: number): boolean {
    return number >= this.low && number <= this.high;
  }

  toString(): string {
    if (this.high === Infinity){
      return 'Over 200 years off'
    }
    if (this.low === 0) {
      return 'Great work!'
    }

    return `Between ${this.low} and ${this.high} years off`
  }
}