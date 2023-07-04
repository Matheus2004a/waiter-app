interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element;
}

export default function Button({ type, children }: ButtonProps) {
  return (
    <button type={type}>{children}</button>
  );
}
