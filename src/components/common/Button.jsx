
function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="lume-button"
    >
      {children}
    </button>
  );
}

export default Button;
