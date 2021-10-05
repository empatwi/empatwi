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
      flex items-center justify-between px-16px
      bg-black text-white
    `}
    >
      {/* <p>oi</p> */}
      {leftItems}
      <div>{rightItems}</div>
    </div>
  );
};

Footer.defaultProps = defaultProps;

export default Footer;
