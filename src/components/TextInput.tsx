import { Text } from '../constants';
import { Search } from '../svgs';

type TextInputProps = {
  icon: JSX.Element;
  placeholder?: string;
};

const defaultProps = {
  icon: <Search />,
  placeholder: Text.O_QUE_ESTAO_PENSANDO_SOBRE,
};

const TextInput = ({ icon, placeholder }: TextInputProps): JSX.Element => {
  return (
    <div className="relative flex items-center">
      <input
        className="appearance-none w-full border-gray border-1 rounded-16px px-16px py-8px shadow text-lg text-gray-light focus focus:border-green focus:outline-none"
        id="username"
        type="text"
        placeholder={placeholder}
      />
      <span className="absolute leading-none right-0 pr-8px">{icon}</span>
    </div>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
