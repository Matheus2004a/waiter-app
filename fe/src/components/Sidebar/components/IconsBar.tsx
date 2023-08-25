import { useNavigate } from 'react-router-dom';
import { Icons } from '../../../types/Icons';

interface IconsBarProps {
  icons: Icons[]
}

export function IconsBar({ icons }: IconsBarProps) {
  const navigate = useNavigate();

  return icons.map((icon) => (
    <button
      onClick={() => navigate(icon.href)}
      key={icon.title}
    >
      <li>
        <img src={icon.path} alt={icon.title} />
        {icon.title}
      </li>
    </button>
  ));
}
