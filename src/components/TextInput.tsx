import { useCallback, useMemo, useState } from 'react';
import { Text } from '../constants';

type TextInputProps = {
  icon: JSX.Element;
  placeholder?: string;
};

const defaultProps = {
  placeholder: Text.O_QUE_ESTAO_PENSANDO_SOBRE,
};

const TextInput = ({ icon, placeholder }: TextInputProps): JSX.Element => {
  const [input, setInput] = useState('');

  const textColor = useMemo(
    () => (input ? 'text-gray' : 'text-gray-light'),
    [input]
  );

  const handleChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  return (
    <div className="relative flex items-center">
      <input
        className={`appearance-none w-full border-gray border-1 rounded-16px px-16px py-8px shadow text-lg ${textColor} focus focus:border-green focus:outline-none`}
        onChange={handleChange}
        placeholder={placeholder}
        type="text"
        value={input}
      />
      <span className="absolute leading-none right-0 pr-8px">{icon}</span>
    </div>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
