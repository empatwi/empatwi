type FooterProps = {
  leftItems?: React.ReactNode;
  rightItems?: React.ReactNode;
};

const defaultProps = {};

const Footer = ({ leftItems, rightItems }: FooterProps): JSX.Element => {
  return (
    <div
      className={`
        h-footer w-full
        flex items-center justify-between
        px-16px py-40px sm:py-0
      bg-black text-white
      `}
    >
      {leftItems}
      <div>{rightItems}</div>
    </div>
  );
};

Footer.defaultProps = defaultProps;

export default Footer;
