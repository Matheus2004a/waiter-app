import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { icons } from './icons';
import logout from '../../assets/images/log-off.svg';

import { Nav } from './styles';

export default function Sidebar() {
  const navigate = useNavigate();

  const { signout } = useAuth();

  return (
    <Nav>
      <p className='brand-name'><strong>W</strong>A</p>

      <ul>
        {icons.map((icon) => (
          <button
            onClick={() => navigate(icon.href)}
            key={icon.title}
          >
            <li>
              <img src={icon.path} alt={icon.title} />
              {icon.title}
            </li>
          </button>
        ))}

        <button onClick={signout}>
          <li>
            <img src={logout} alt="icon-logout" />
            Sair
          </li>
        </button>
      </ul>
    </Nav>
  );
}
