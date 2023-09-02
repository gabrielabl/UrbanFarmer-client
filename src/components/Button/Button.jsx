import "./Button.scss";

const Button = ({ text, SVG, onClick,style }) => {
  return (
    <button style={style} onClick={onClick}>
      {SVG}
      {text}
    </button>
  );
};

export default Button;
