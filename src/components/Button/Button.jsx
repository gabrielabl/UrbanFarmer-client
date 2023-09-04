import "./Button.scss";

const Button = ({ text, SVG, onClick,style }) => {
  return (
    <button className={`btn__primary ${"btn"}`} style={style} onClick={onClick}>
      {SVG}
      {text}
    </button>
  );
};

export default Button;
