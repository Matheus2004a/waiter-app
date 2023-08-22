import { TableCustom } from './styles';

interface TableProps {
  children: React.ReactNode
}

export default function Table({ children }: TableProps) {
  return (
    <TableCustom>
      {children}
    </TableCustom>
  );
}
