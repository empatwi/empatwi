import { ColorOptions } from '../constants';

type ColorOptionsType = `${ColorOptions}`;

type ShadowBoxProps = {
  children: React.ReactNode;
  color?: ColorOptionsType;
  padding?: string;
};

const defaultProps = {
  color: ColorOptions.WHITE,
  padding: 'px-16px py-24px',
};

const ShadowBox = ({
  children,
  color,
  padding,
}: ShadowBoxProps): JSX.Element => {
  const background =
    color === ColorOptions.GREEN ? 'bg-green-light' : 'bg-white';

  return (
    <div
      className={`${background} border-gray border-1 rounded-16px ${padding} shadow`}
    >
      {children}
    </div>
  );
};

ShadowBox.defaultProps = defaultProps;

export default ShadowBox;
