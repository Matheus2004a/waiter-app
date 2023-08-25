import useAuth from '../../hooks/useAuth';

import logout from '../../assets/images/log-off.svg';
import { icons } from './icons';

import { useMemo } from 'react';
import { IconsBar } from './components/IconsBar';
import { Nav } from './styles';

export default function Sidebar() {
  const { isAdmin, signout } = useAuth();

  const newIconsToWaiter = useMemo(() => {
    return [
      ...icons.slice(0, 3),
      ...icons.slice(3 + 1)
    ];
  }, [isAdmin]);

  return (
    <Nav>
      <p className='brand-name'><strong>W</strong>A</p>

      <ul>
        {isAdmin
          ? <IconsBar icons={icons} />
          : <IconsBar icons={newIconsToWaiter} />
        }

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
