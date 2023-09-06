import "./Button.scss";

const Button = ({ text, SVG, onClick,style, classVar }) => {
  return (
    <button className={`btn__primary ${"btn"} ${classVar}`} style={style} onClick={onClick}>
      {SVG}
      {text}
    </button>
  );
};

export default Button;
