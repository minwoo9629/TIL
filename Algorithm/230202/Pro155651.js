class PriorityQueue {
  constructor(comp) {
    this.heap = [];
    this.comp = comp;
    if (comp === undefined) {
      this.comp = (a, b) => {
        return a - b;
      };
    }
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.heap[0];
  }

  poll() {
    if (this.isEmpty()) {
      return null;
    }

    let min = this.heap[0];
    let last = this.heap.pop();
    if (this.size() != 0) {
      this.heap[0] = last;
      this.downHeap(0);
    }

    return min;
  }
  downHeap(pos) {
    while (this.isInternal(pos)) {
      let s = null;

      //왼쪽과 오른쪽 자식중에 작은 것을 s에 넣는다.
      if (!this.hasRight(pos)) {
        s = this.left(pos);
      } else if (
        this.comp(this.heap[this.left(pos)], this.heap[this.right(pos)]) <= 0
      ) {
        s = this.left(pos);
      } else {
        s = this.right(pos);
      }
      if (this.comp(this.heap[s], this.heap[pos]) < 0) {
        this.swap(pos, s);
        pos = s;
      } else {
        break;
      }
    }
  }
  upHeap(pos) {
    while (!this.isRoot(pos)) {
      let p = this.parent(pos);
      if (this.comp(this.heap[p], this.heap[pos]) <= 0) {
        break;
      }
      this.swap(p, pos);
      pos = p;
    }
  }
  parent(pos) {
    return parseInt((pos - 1) / 2);
  }

  left(parentIndex) {
    return parentIndex * 2 + 1;
  }
  right(parentIndex) {
    return parentIndex * 2 + 2;
  }

  size() {
    return this.heap.length;
  }
  min() {
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  hasLeft(pos) {
    if (this.left(pos) < this.size()) {
      return true;
    }
    return false;
  }
  hasRight(pos) {
    if (this.right(pos) < this.size()) {
      return true;
    }
    return false;
  }
  isEmpty() {
    return this.heap.length == 0;
  }
  add(value) {
    this.heap.push(value);
    this.upHeap(this.size() - 1);
  }
  isInternal(pos) {
    return this.hasLeft(pos);
  }
  isRoot(pos) {
    if (pos == 0) return true;
    return false;
  }
}

function solution(book_time) {
  book_time.sort(compareFunc);
  var answer = 0;

  const pq = new PriorityQueue();
  while (book_time.length !== 0) {
    const [startTime, endTime] = book_time.pop();
    const endTimeTomin = hourToMin(endTime);
    if (pq.isEmpty()) {
      answer++;
      pq.add(endTimeTomin);
    } else {
      const minEndTime = pq.peek();
      const startTimeTomin = hourToMin(startTime);
      if (minEndTime + 10 <= startTimeTomin) {
        pq.poll();
      } else {
        answer++;
      }
      pq.add(endTimeTomin);
    }
  }
  return answer;
}

const compareFunc = (a, b) => {
  if (a[0] > b[0]) {
    return -1;
  } else if (a[0] < b[0]) {
    return 1;
  } else {
    if (a[1] > b[1]) {
      return -1;
    } else {
      return 1;
    }
  }
};

const hourToMin = (time) => {
  let [hour, min] = time.split(":");
  const calcedMin = Number.parseInt(hour) * 60 + Number.parseInt(min);
  return calcedMin;
};
