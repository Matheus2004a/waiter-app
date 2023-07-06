interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  children: string | JSX.Element;
  isDisabled: boolean;
}

export default function Button({ type, children, isDisabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
