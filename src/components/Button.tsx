type ButtonProps = {
  onClick: (...args: any[]) => void;
  render: JSX.Element;
};

const Button = ({ onClick, render }: ButtonProps): JSX.Element => {
  return (
    <button className="appearance-none" onClick={onClick}>
      {render}
    </button>
  );
};

export default Button;
