import { useState } from "react";
import "./Input.css";

const Input = ({ onClick }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <input
        placeholder="Input Array"
        value={value}
        onChange={handleChange}
        id="array-input"
      />
      <div className="button-container">
        <div className="visualize button" onClick={() => onClick(value, 1)}>
          Binary Tree
        </div>
        <div className="visualize button" onClick={() => onClick(value, 2)}>
          Max Heap
        </div>
        <div className="visualize button" onClick={() => onClick(value, 3)}>
          Binary Search Tree
        </div>
      </div>
    </>
  );
};

export default Input;
