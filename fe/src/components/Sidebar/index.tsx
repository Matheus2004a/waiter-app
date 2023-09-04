import useAuth from '../../hooks/useAuth';

import logout from '../../assets/images/log-off.svg';
import { icons } from './icons';

import { IconsBar } from './components/IconsBar';
import { Nav } from './styles';

export default function Sidebar() {
  const { signout } = useAuth();

  return (
    <Nav>
      <p className='brand-name'><strong>W</strong>A</p>

      <ul>
        <IconsBar icons={icons} />

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
