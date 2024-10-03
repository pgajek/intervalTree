class Interval {
  constructor(low, high) {
    this.low = low;
    this.high = high;
  }

  toString() {
    return `[${this.low}, ${this.high}]`;
  }
}

class Node {
  constructor(interval) {
    this.interval = interval;
    this.max = interval.high;
    this.left = null;
    this.right = null;
  }
}

class IntervalTree {
  constructor() {
    this.root = null;
  }

  insert(root, interval) {
    if (!root) {
      return new Node(interval);
    }

    if (interval.low < root.interval.low) {
      root.left = this.insert(root.left, interval);
    } else {
      root.right = this.insert(root.right, interval);
    }

    if (root.max < interval.high) {
      root.max = interval.high;
    }

    return root;
  }

  searchOverlapping(root, interval, result = []) {
    if (!root) {
      return result;
    }

    if (
      root.interval.low <= interval.high &&
      interval.low <= root.interval.high
    ) {
      result.push(root.interval);
    }

    if (root.left && root.left.max >= interval.low) {
      this.searchOverlapping(root.left, interval, result);
    }

    this.searchOverlapping(root.right, interval, result);

    return result;
  }

  insertInterval(interval) {
    if (!this.root) {
      this.root = new Node(interval);
    } else {
      this.root = this.insert(this.root, interval);
    }
  }

  search(interval) {
    return this.searchOverlapping(this.root, interval);
  }
}

const intervals = [
  new Interval(15, 20),
  new Interval(10, 30),
  new Interval(17, 19),
  new Interval(5, 20),
  new Interval(12, 15),
  new Interval(30, 40),
];

const tree = new IntervalTree();

intervals.forEach((interval) => tree.insertInterval(interval));

const searchInterval = new Interval(14, 16);

const overlappingIntervals = tree.search(searchInterval);

console.log(
  `Przedziały przecinające się z ${searchInterval.toString()}:`,
  overlappingIntervals.map((i) => i.toString())
);
