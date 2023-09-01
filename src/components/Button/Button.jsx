import "./Button.scss";

const Button = ({ text, SVG, onClick }) => {
  return (
    <button onClick={onClick}>
      {SVG}
      {text}
    </button>
  );
};

export default Button;
