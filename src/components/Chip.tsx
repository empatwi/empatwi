import { ColorOptions } from '../constants';

type ColorOptionsType = `${ColorOptions}`;

type ShadowBoxProps = {
  color?: ColorOptionsType;
  text: string;
};

const defaultProps = {
  color: ColorOptions.WHITE,
};

const ShadowBox = ({ color, text }: ShadowBoxProps): JSX.Element => {
  const background =
    color === ColorOptions.GREEN ? 'bg-green-light' : 'bg-white';

  return (
    <span className={`${background} rounded-32px px-16px text-gray`}>
      {text}
    </span>
  );
};

ShadowBox.defaultProps = defaultProps;

export default ShadowBox;
