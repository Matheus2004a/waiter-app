import { ReactNode } from 'react';

import { ModalBody, Overlay } from './styles';

interface ModalProps {
  children: JSX.Element | string | ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <Overlay>
      <ModalBody>
        {children}
      </ModalBody>
    </Overlay>
  );
}
