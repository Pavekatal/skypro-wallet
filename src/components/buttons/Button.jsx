import { SButton } from "./SButton.styled";

const Button = ({ children }) => {
  return <SButton $isActive={true}>{children}</SButton>;
};

export default Button;
