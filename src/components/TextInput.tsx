import { useMemo } from 'react';
import { Text } from '../constants';

type TextInputProps = {
  handleEnter?: (...args: any[]) => void;
  icon: JSX.Element;
  input: string;
  onChange: (...args: any[]) => void;
  placeholder?: string;
};

const defaultProps = {
  handleEnter: () => null,
  placeholder: Text.O_QUE_ESTAO_PENSANDO_SOBRE,
};

const TextInput = ({
  handleEnter,
  icon,
  input,
  onChange,
  placeholder,
}: TextInputProps): JSX.Element => {
  const textColor = useMemo(
    () => (input ? 'text-gray' : 'text-gray-light'),
    [input]
  );

  return (
    <div className="relative flex items-center">
      <input
        className={`
          appearance-none w-full border-gray border-1 rounded-16px
          shadow text-lg ${textColor} sm:text-sm md:text-lg
          pl-16px pr-40px py-8px
          focus focus:border-green focus:outline-none
        `}
        onChange={onChange}
        onKeyPress={handleEnter}
        placeholder={placeholder}
        type="text"
        value={input}
      />
      <span className="absolute leading-none right-1 pr-8px">{icon}</span>
    </div>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
