import { StyleButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  isDisabled?: boolean;
  hasChildren?: boolean;
}

export default function Button({ type, children, isDisabled, hasChildren }: ButtonProps) {
  return (
    <StyleButton
      type={type}
      disabled={isDisabled}
      hasChildren={hasChildren}
    >
      {children}
    </StyleButton>
  );
}
