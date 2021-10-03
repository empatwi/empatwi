import { ColorOptions } from '../constants';

type ColorOptionsType = `${ColorOptions}`;

type ShadowBoxProps = {
  children: React.ReactNode;
  color?: ColorOptionsType;
  paddingX?: boolean;
  paddingY?: boolean;
};

const defaultProps = {
  color: ColorOptions.WHITE,
  paddingX: false,
  paddingY: false,
};

const ShadowBox = ({
  children,
  color,
  paddingX,
  paddingY,
}: ShadowBoxProps): JSX.Element => {
  const background =
    color === ColorOptions.GREEN ? 'bg-green-light' : 'bg-white';

  const pX = 'px-16px';
  const pY = 'py-24px';

  const padding =
    paddingX && paddingY ? `${pX} ${pY}` : paddingX ? pX : paddingY ? pY : '';

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
