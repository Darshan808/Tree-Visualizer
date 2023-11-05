export function visualize(arr) {
  reset();
  d3.select("#container").append("svg");
  createTree(arr);
}

function reset() {
  d3.selectAll("svg").remove();
}

function parent(i) {
  return Math.floor((i - 1) / 2);
}
function leftChild(i) {
  return 2 * i + 1;
}
function rightChild(i) {
  return 2 * i + 2;
}

function TreeNode() {
  this.cx = 0;
  this.cy = 0;
  this.value = 0;
}

//Visualizes tree from given array
const createTree = (arr = []) => {
  const len = arr.length;
  if (arr[0] === "") return;
  const height = Math.floor(Math.log2(len)) + 1;
  const ySpacing = 100;
  let xSpacing = 200;
  const radius = 35;
  let width = 2 * radius + 20;
  xSpacing = height > 3 ? xSpacing + (height - 3) * 100 : xSpacing;
  for (let i = 1; i < height; i++) width += (2 * xSpacing) / i;
  let svg = d3
    .select("svg")
    .attr("height", (height - 1) * ySpacing + radius * 2 + 20)
    .attr("width", width)
    .attr("class", "tree-container");

  let myNodes = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null) continue;
    let node = new TreeNode();
    let depth = Math.floor(Math.log2(i + 1));
    node.value = arr[i];
    if (i === 0) {
      node.cx = width / 2;
      node.cy = radius + 10;
    } else {
      if (leftChild(parent(i)) === i)
        node.cx = myNodes[parent(i)].cx - xSpacing / depth;
      else node.cx = myNodes[parent(i)].cx + xSpacing / depth;
      node.cy = myNodes[parent(i)].cy + ySpacing;
    }
    myNodes.push(node);
  }
  let tIn = 0;
  for (let i = 0; i < myNodes.length; i++) {
    // let depth = Math.floor(Math.log2(i + 1)) + 1;
    let node = myNodes[i];
    let lc = leftChild(i) < myNodes.length ? myNodes[leftChild(i)] : null;
    let rc = rightChild(i) < myNodes.length ? myNodes[rightChild(i)] : null;
    if (lc) {
      let lLine = svg
        .append("line")
        .attr("x1", node.cx)
        .attr("y1", node.cy)
        .attr("x2", lc.cx)
        .attr("y2", lc.cy)
        .attr("stroke", "white")
        .attr("class", "tree-line hide");
      setTimeout(
        () => {
          lLine.attr("class", "tree-line");
        },
        // depth * 200
        tIn + 100
      );
    }
    if (rc) {
      let rLine = svg
        .append("line")
        .attr("x1", node.cx)
        .attr("y1", node.cy)
        .attr("x2", rc.cx)
        .attr("y2", rc.cy)
        .attr("stroke", "white")
        .attr("class", "tree-line hide");
      setTimeout(
        () => {
          rLine.attr("class", "tree-line");
        },
        lc ? tIn + 200 : tIn + 100
        // depth * 200
      );
    }
    let circle = svg
      .append("circle")
      .attr("cx", node.cx)
      .attr("cy", node.cy)
      .attr("r", radius)
      .attr("fill", "green")
      .attr("stroke", "black")
      .attr("class", `c${i} hide`)
      .on("click", () => addHighlight(i));
    let text = svg
      .append("text")
      .attr("x", node.cx - arr[i].toString().length * 4 - 2)
      .attr("y", node.cy + 4)
      .attr("fill", "white")
      .text(arr[i])
      .attr("class", `t${i} node-text hide`);
    setTimeout(
      () => {
        circle.attr("class", `c${i}`);
        text.attr("class", `t${i} node-text`);
      },
      // depth * 200
      tIn
    );
    if (lc && rc) tIn += 200;
    else if (lc || rc) tIn += 100;
    tIn += 100;
  }
};

export function addHighlight(index) {
  let currCircle = document.querySelector(`.c${index}`);
  let currCText = document.querySelector(`.t${index}`);
  let currRect = document.querySelector(`.a${index}`);
  let currRText = document.querySelector(`.at${index}`);

  let removeHighlight = currCircle.getAttribute("fill") === "aqua";

  let allCircles = document.querySelectorAll("circle");
  let allRect = document.querySelectorAll("rect");
  let allTexts = document.querySelectorAll("text");
  for (let node of allCircles) node.setAttribute("fill", "green");
  for (let node of allRect) node.setAttribute("fill", "green");
  for (let text of allTexts) text.setAttribute("fill", "white");
  if (!removeHighlight) {
    currCircle.setAttribute("fill", "aqua");
    currCText.setAttribute("fill", "black");
    if (currRect) {
      currRect.setAttribute("fill", "aqua");
      currRText.setAttribute("fill", "black");
    }
  }
}

// let svg = d3
//   .select("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth)
//   .attr("class", "mySvg");

// let line = svg
//   .append("line")
//   .attr("x1", 250)
//   .attr("y1", 100)
//   .attr("x2", 150)
//   .attr("y2", 200)
//   .attr("stroke", "black");
// let cirlce = svg
//   .append("circle")
//   .attr("cx", 250)
//   .attr("cy", 100)
//   .attr("r", 35)
//   .attr("fill", "green");
// let cirlce2 = svg
//   .append("circle")
//   .attr("cx", 150)
//   .attr("cy", 200)
//   .attr("r", 35)
//   .attr("fill", "green");
// let text1 = svg
//   .append("text")
//   .attr("x", 250 - 3 * 4)
//   .attr("y", 100 + 4)
//   .text(100)
//   .attr("fill", "white");
//   .attr("class", "nodeText");
