import { Text } from '../constants';

type TextInputProps = {
  placeholder?: string;
};

const defaultProps = {
  placeholder: Text.O_QUE_ESTAO_PENSANDO_SOBRE,
};

const TextInput = ({ placeholder }: TextInputProps): JSX.Element => {
  return (
    // <>
    //   <input
    //     className={`h-56px flex items-center bg-white border-gray border-1 rounded-16px px-16px shadow`}
    //   />
    //   <p className="text-lg text-gray-light">{placeholder}</p>
    // </>
    <div>
      <input
        className="appearance-none w-full border-gray border-1 rounded-16px px-16px py-8px shadow text-lg text-gray-light focus focus:border-green focus:outline-none focus:text-gray"
        id="username"
        type="text"
        placeholder={placeholder}
      />
      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
        <i className="fas fa-user"></i>
      </span>
    </div>
    // <div className="shadow-xl p-10 bg-white max-w-xl rounded">
    //   <input
    //     className="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
    //     id="email"
    //     type="text"
    //   />
    //   <button className="bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded">
    //     Submit
    //   </button>
    //   <input
    //     className="appearance-none shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //     id="username"
    //     type="text"
    //     placeholder={placeholder}
    //   />
    //   <input
    //     className="appearance-none h-56px border-gray border-1 rounded-16px px-16px shadow w-full text-lg text-gray-light focus:outline-none focus:shadow-outline"
    //     id="username"
    //     type="text"
    //     placeholder={placeholder}
    //   />
    // </div>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
