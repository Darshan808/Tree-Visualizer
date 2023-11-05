import { addHighlight } from "./visualize";

export const inOrderTraversal = (arr) => {
  let inArr = [];
  fillInArr(arr, inArr, 0);
  animateArray(inArr, arr);
};
export const preOrderTraversal = (arr) => {
  let preArr = [];
  fillPreArr(arr, preArr, 0);
  animateArray(preArr, arr);
};
export const postOrderTraversal = (arr) => {
  let postArr = [];
  fillPostArr(arr, postArr, 0);
  animateArray(postArr, arr);
};
export const levelOrderTraversal = (arr) => {
  let levelArr = [];
  for (let i = 0; i < arr.length; i++) levelArr.push(i);
  animateArray(levelArr, arr);
};

const leftChild = (i) => 2 * i + 1;
const rightChild = (i) => 2 * i + 2;

function fillInArr(arr = [], inArr = [], i) {
  if (i >= arr.length) return;
  fillInArr(arr, inArr, leftChild(i));
  inArr.push(i);
  fillInArr(arr, inArr, rightChild(i));
}
function fillPreArr(arr = [], preArr = [], i) {
  if (i >= arr.length) return;
  preArr.push(i);
  fillPreArr(arr, preArr, leftChild(i));
  fillPreArr(arr, preArr, rightChild(i));
}
function fillPostArr(arr = [], postArr = [], i) {
  if (i >= arr.length) return;
  fillPostArr(arr, postArr, leftChild(i));
  fillPostArr(arr, postArr, rightChild(i));
  postArr.push(i);
}

function animateArray(arr, mainArr) {
  document.querySelector("#array-container").innerHTML = "";
  let svg = createArrayContainer(arr.length);
  window.scroll({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
  let currRect, currCircle, currRText, currCText;
  for (let i = 0; i <= arr.length; i++) {
    let index = arr[i];
    setTimeout(() => {
      if (i > 0) {
        currCircle.setAttribute("fill", "green");
        currRect.setAttribute("fill", "green");
        currCText.setAttribute("fill", "white");
        currRText.setAttribute("fill", "white");
      }
      if (i < arr.length) {
        svg
          .append("rect")
          .attr("x", i * 50)
          .attr("y", 0)
          .attr("width", 50)
          .attr("height", 50)
          .attr("fill", "green")
          .attr("stroke", "black")
          .attr("class", `a${index}`)
          .on("click", () => addHighlight(index));
        svg
          .append("text")
          .text(mainArr[index])
          .attr("x", i * 50 + 25 - arr[i].toString().length * 5)
          .attr("y", 25 + 5)
          .attr("fill", "white")
          .attr("class", `at${index} node-text`);
        currCircle = document.querySelector(`.c${index}`);
        currCText = document.querySelector(`.t${index}`);
        currRect = document.querySelector(`.a${index}`);
        currRText = document.querySelector(`.at${index}`);
        currCircle.setAttribute("fill", "aqua");
        currRect.setAttribute("fill", "aqua");
        currCText.setAttribute("fill", "black");
        currRText.setAttribute("fill", "black");
      }
    }, (i + 1) * 400);
  }
}

function createArrayContainer(n) {
  let svg = d3
    .select("#array-container")
    .append("svg")
    .attr("height", 50)
    .attr("width", 50 * n)
    .attr("class", "array-container");
  return svg;
}
