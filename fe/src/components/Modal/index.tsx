import Portal from '../Portal';
import { ModalBody, Overlay } from './styles';

interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export default function Modal({ children, isVisible }: ModalProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Portal containerId="portal-root">
      <Overlay>
        <ModalBody>
          {children}
        </ModalBody>
      </Overlay>
    </Portal>
  );
}
