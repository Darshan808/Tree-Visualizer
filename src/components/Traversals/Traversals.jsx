import "./Traversals.css";

const Traversals = ({ onClick }) => {
  return (
    <div className="button-container traversals">
      <div className="visualize button" onClick={() => onClick(1)}>
        In-order
      </div>
      <div className="visualize button" onClick={() => onClick(2)}>
        Pre-order
      </div>
      <div className="visualize button" onClick={() => onClick(3)}>
        Post-order
      </div>
      <div className="visualize button" onClick={() => onClick(4)}>
        Level-order
      </div>
    </div>
  );
};

export default Traversals;
