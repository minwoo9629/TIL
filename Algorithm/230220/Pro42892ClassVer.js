function solution(nodeinfo) {
  for (let i = 0; i < nodeinfo.length; i++) {
    nodeinfo[i] = [...nodeinfo[i], i + 1];
  }

  nodeinfo.sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    } else {
      return a[0] - b[0];
    }
  });
  const tree = new BinaryTree(nodeinfo[0][0], nodeinfo[0][2]);
  for (const [x, y, value] of nodeinfo.splice(1)) {
    tree.insert(x, value);
  }
  const pre = preOrder([], tree);
  const post = postOrder([], tree);
  return [pre, post];
}

class BinaryTree {
  constructor(x, value) {
    this.x = x;
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(x, value) {
    this.x > x ? this._toLeft(x, value) : this._toRight(x, value);
  }

  _toLeft(x, value) {
    this.left
      ? this.left.insert(x, value)
      : (this.left = new BinaryTree(x, value));
  }

  _toRight(x, value) {
    this.right
      ? this.right.insert(x, value)
      : (this.right = new BinaryTree(x, value));
  }
}

const preOrder = (order, tree) => {
  if (!tree) {
    return;
  }
  order.push(tree.value);
  preOrder(order, tree.left);
  preOrder(order, tree.right);
  return order;
};

const postOrder = (order, tree) => {
  if (!tree) {
    return;
  }
  postOrder(order, tree.left);
  postOrder(order, tree.right);
  order.push(tree.value);
  return order;
};
