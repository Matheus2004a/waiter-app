import { icons } from './icons';

import { Nav } from './styles';

export default function Sidebar() {
  return (
    <Nav>
      <p className='brand-name'><strong>W</strong>A</p>

      <ul>
        {icons.map((icon) => (
          <li key={icon.title}>
            <img src={icon.path} alt={icon.title} />
            {icon.title}
          </li>
        ))}
      </ul>
    </Nav>
  );
}
