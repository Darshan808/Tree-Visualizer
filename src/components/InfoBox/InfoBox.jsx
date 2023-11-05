import "./InfoBox.css";

const InfoBox = ({ infoText }) => {
  if (!infoText) return;
  return <div className="info-box">{infoText}</div>;
};

export default InfoBox;
