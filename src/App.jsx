import "./App.css";
import Heading from "./components/Heading/Heading";
import Input from "./components/Input/Input";
import {
  TreeContainer,
  ArrayContainer,
} from "./components/Container/Container";
import { visualize } from "./algorithms/visualize";
import { getBinaryTree, getMaxHeap, getBST } from "./algorithms/convert";
import Traversals from "./components/Traversals/Traversals";
import { useState } from "react";
import {
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
  levelOrderTraversal,
} from "./algorithms/traverse";
import InfoBox from "./components/InfoBox/InfoBox";

function App() {
  const [treeArr, setTreeArr] = useState([]);
  const [isVisualized, setIsVisualized] = useState(false);
  const [text, setText] = useState(null);

  const handleInfoText = (type) => {
    let infoText =
      type === 1
        ? "Every node has at most two children!"
        : type === 2
        ? "Every node's value is greater than its children's!"
        : "Every node has smaller nodes on left and greater nodes on right!";
    // let i = 0;
    // for (let char of infoText) {
    //   if (char === "E") setText("");
    //   setTimeout(() => {
    //     setText((text) => text + char);
    //   }, 20 * i++);
    // }
    setText(infoText);
  };

  const handleVisualizeClick = (value, type) => {
    let arr;
    switch (type) {
      case 1:
        arr = getBinaryTree(value);
        break;
      case 2:
        arr = getMaxHeap(value);
        break;
      case 3:
        arr = getBST(value);
        break;
      default:
        arr = ["E", "R", "R", "O", "R"];
        setIsVisualized(false);
    }
    if (isNaN(arr[0]) || arr[0] === "") return;
    visualize(arr);
    setTreeArr(arr);
    handleInfoText(type);
    setIsVisualized(true);
  };

  const handleTraverseClick = (type) => {
    switch (type) {
      case 1:
        inOrderTraversal(treeArr);
        break;
      case 2:
        preOrderTraversal(treeArr);
        break;
      case 3:
        postOrderTraversal(treeArr);
        break;
      case 4:
        levelOrderTraversal(treeArr);
    }
  };

  return (
    <>
      <Heading text={"Tree Visualizer"} />
      <Input onClick={handleVisualizeClick} />
      {isVisualized && <InfoBox infoText={text} />}
      <TreeContainer />
      {isVisualized && <Traversals onClick={handleTraverseClick} />}
      <ArrayContainer />
    </>
  );
}

export default App;
