import { StyleButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isDisabled?: boolean;
  hasChildren?: boolean;
}

export default function Button({ type, children, isDisabled, onClick, hasChildren }: ButtonProps) {
  return (
    <StyleButton
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      hasChildren={hasChildren}
    >
      {children}
    </StyleButton>
  );
}
