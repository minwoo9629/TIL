function solution(n, k, cmd) {
  let root = new Node(0, null);
  let cur = root;
  let prev = root;
  for (let i = 1; i < n; i++) {
    const node = new Node(i, prev);
    prev.next = node;
    prev = node;

    if (i === k) {
      cur = node;
    }
  }
  const stack = [];

  for (const str of cmd) {
    const [alpha, num] = str.split(" ");
    let cnt = 0;
    if (alpha === "U") {
      while (cnt < num && cur.prev) {
        cur = cur.prev;
        cnt++;
      }
    } else if (alpha === "D") {
      while (cnt < num && cur.next) {
        cur = cur.next;
        cnt++;
      }
    } else if (alpha === "C") {
      stack.push(cur);
      const prev = cur.prev;
      const next = cur.next;
      if (prev && next) {
        prev.next = next;
        next.prev = prev;
        cur = next;
      }
      if (prev && !next) {
        prev.next = null;
        cur = prev;
      }

      if (!prev && next) {
        next.prev = null;
        cur = next;
      }
    } else {
      const node = stack.pop();
      const prev = node.prev;
      const next = node.next;
      if (prev) {
        prev.next = node;
      }
      if (next) {
        next.prev = node;
      }
    }
  }
  const answer = Array(n).fill("O");
  while (stack.length !== 0) {
    const node = stack.pop();
    answer[node.index] = "X";
  }
  return answer.join("");
}

const Node = function (index, prev) {
  this.index = index;
  this.prev = prev;
  this.next = null;
};
