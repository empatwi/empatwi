type TouchableIconProps = {
  icon: JSX.Element;
  onClick: (...args: any[]) => void;
};

const ShadowBox = ({ icon, onClick }: TouchableIconProps): JSX.Element => {
  return (
    <button className="appearance-none" onClick={onClick}>
      {icon}
    </button>
  );
};

export default ShadowBox;
