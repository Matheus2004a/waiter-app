interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  isDisabled?: boolean;
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
