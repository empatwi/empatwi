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
      className={`border-gray border-1 ${background} rounded-16px py-24px px-16px`}
    >
      {children}
    </div>
  );
};

ShadowBox.defaultProps = defaultProps;

export default ShadowBox;
