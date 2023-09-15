import Portal from '../Portal';
import { ModalBody, Overlay } from './styles';

interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  isLoong?: boolean;
}

export default function Modal({ children, isVisible, isLoong }: ModalProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Portal containerId="portal-root">
      <Overlay>
        <ModalBody isLoong={isLoong}>
          {children}
        </ModalBody>
      </Overlay>
    </Portal>
  );
}
