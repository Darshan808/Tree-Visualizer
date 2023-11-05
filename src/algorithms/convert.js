export const getBinaryTree = (value) => {
  let arr = value.split(",");
  for (let i = 0; i < arr.length; i++) arr[i] = parseInt(arr[i]);
  return arr;
};

export const getMaxHeap = (value) => {
  let arr = value.split(",");
  let n = arr.length;
  for (let i = 0; i < n; i++) arr[i] = parseInt(arr[i]);
  for (let i = Math.floor((n - 2) / 2); i >= 0; i--) heapify(arr, i, n);
  return arr;
};

export const getBST = (value) => {
  let arr = value.split(",");
  let n = arr.length;
  let bst = [];
  for (let i = 0; i < n; i++) {
    arr[i] = parseInt(arr[i]);
    bst[i] = arr[i];
  }
  arr.sort();
  fillBst(arr, bst, 0, arr.length - 1, 0);
  return bst;
};

const leftChild = (i) => 2 * i + 1;
const rightChild = (i) => 2 * i + 2;

function heapify(arr, i, n) {
  let lc = leftChild(i) >= n ? -Infinity : arr[leftChild(i)];
  let rc = rightChild(i) >= n ? -Infinity : arr[rightChild(i)];
  if (arr[i] >= lc && arr[i] >= rc) return;
  let gI;
  if (lc > rc) gI = leftChild(i);
  else gI = rightChild(i);
  let temp = arr[i];
  arr[i] = arr[gI];
  arr[gI] = temp;
  heapify(arr, gI, n);
}

function fillBst(arr, bst, low, high, ind) {
  let mid = Math.floor((low + high + 1) / 2);
  bst[ind] = arr[mid];
  if (low >= high) return;
  if (leftChild(ind) < arr.length)
    fillBst(arr, bst, low, mid - 1, leftChild(ind));
  if (rightChild(ind) < arr.length)
    fillBst(arr, bst, mid + 1, high, rightChild(ind));
}
