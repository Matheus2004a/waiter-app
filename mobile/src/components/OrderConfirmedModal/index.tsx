import { Modal } from 'react-native';

import { Text } from '../Text';
import { CheckCircle } from '../Icons/CheckCircle';

import { Container, OkButton } from './styles';

interface OrderConfirmedModalProps {
  visible: boolean;
  onCheckOrder: () => void;
}

export function OrderConfirmedModal({ visible, onCheckOrder }: OrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <Container>
        <CheckCircle />
        <Text size={18} color='#fff' weight='600'>Pedido confirmado</Text>
        <Text color='#fff' opacity={0.9}>Acompanhe na home o status de produção</Text>

        <OkButton onPress={onCheckOrder}>
          <Text color='#D73035' weight='600'>OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
