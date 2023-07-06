import { icons } from './icons';

import { Nav } from './styles';

export default function Sidebar() {
  return (
    <Nav>
      <h2>WA</h2>

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
