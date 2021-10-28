type FooterProps = {
  leftItems?: React.ReactNode;
  rightItems?: React.ReactNode;
};

const defaultProps = {};

const Footer = ({ leftItems, rightItems }: FooterProps): JSX.Element => {
  return (
    <div className="flex items-center justify-between w-full text-white bg-black h-footer px-16px py-40px sm:py-0">
      {leftItems}
      <div>{rightItems}</div>
    </div>
  );
};

Footer.defaultProps = defaultProps;

export default Footer;
