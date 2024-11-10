class Promotion {
  constructor(name, buy, get, startDate, endDate) {
    this.name = name;
    this.buy = buy;
    this.get = get;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  isApplicable(date) {
    return date >= this.startDate && date <= this.endDate;
  }
}

export default Promotion;
