import { useNavigate } from 'react-router-dom';
import { Icons } from '../../../types/Icons';
import Button from '../../Button';

interface IconsBarProps {
  icons: Icons[]
}

export function IconsBar({ icons }: IconsBarProps) {
  const navigate = useNavigate();

  return icons.map((icon) => (
    <Button
      onClick={() => navigate(icon.href)}
      key={icon.title}
    >
      <li>
        <img src={icon.path} alt={icon.title} />
        {icon.title}
      </li>
    </Button>
  ));
}
