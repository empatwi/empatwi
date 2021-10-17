type SearchProps = {
  color?: string;
  size?: number;
};

const defaultProps = {
  color: '#6A6A6A',
  size: 6,
};

const Search = ({ color, size }: SearchProps): JSX.Element => {
  return (
    <svg
      fill="none"
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

Search.defaultProps = defaultProps;

export default Search;
