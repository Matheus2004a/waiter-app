import { createPortal } from 'react-dom';

interface PortalProps {
  containerId: string;
  children: React.ReactNode;
}

export default function Portal({ containerId, children }: PortalProps) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }

  return createPortal(children, container);
}
