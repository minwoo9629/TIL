function solution(nodeinfo) {
  for (let i = 0; i < nodeinfo.length; i++) {
    nodeinfo[i] = [...nodeinfo[i], i + 1];
  }

  const nodes = nodeinfo
    .map((item, idx) => [...item, idx + 1])
    .sort((a, b) => {
      if (a[1] !== b[1]) {
        return b[1] - a[1];
      } else {
        return a[0] - b[0];
      }
    });
  const root = new Node(nodes[0][0], nodes[0][2]);
  for (const [x, y, value] of nodes.splice(1)) {
    insert(root, x, value);
  }
  const pre = preOrder([], root);
  const post = postOrder([], root);
  return [pre, post];
}

const Node = function (x, value) {
  this.x = x;
  this.value = value;
  this.left = null;
  this.right = null;
};

const insert = (parent, x, value) => {
  parent.x > x
    ? (parent.left = _toLeft(parent.left, x, value))
    : (parent.right = _toRight(parent.right, x, value));
  return parent;
};

const _toLeft = (curNode, x, value) => {
  return curNode ? insert(curNode, x, value) : new Node(x, value);
};

const _toRight = (curNode, x, value) => {
  return curNode ? insert(curNode, x, value) : new Node(x, value);
};

const preOrder = (order, node) => {
  if (!node) {
    return;
  }
  order.push(node.value);
  preOrder(order, node.left);
  preOrder(order, node.right);
  return order;
};

const postOrder = (order, node) => {
  if (!node) {
    return;
  }
  postOrder(order, node.left);
  postOrder(order, node.right);
  order.push(node.value);
  return order;
};
