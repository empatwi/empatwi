import { ColorOptions } from '../constants';

type ColorOptionsType = `${ColorOptions}`;

type ShadowBoxProps = {
  children: React.ReactNode;
  color?: ColorOptionsType;
};

const defaultProps = {
  color: ColorOptions.WHITE,
};

const ShadowBox = ({ children, color }: ShadowBoxProps): JSX.Element => {
  const background =
    color === ColorOptions.GREEN ? 'bg-green-light' : 'bg-white';

  return (
    <div
      className={`${background} border-gray border-1 rounded-16px px-16px py-24px shadow`}
    >
      {children}
    </div>
  );
};

ShadowBox.defaultProps = defaultProps;

export default ShadowBox;
