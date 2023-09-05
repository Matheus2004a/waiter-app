import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useProductsModal from '../../../../hooks/useProductsModal';
import ProductServices from '../../../../services/ProductServices';
import { api } from '../../../../services/api';
import { Product } from '../../../../types/Product';
import { handleImageFallback } from '../../../../utils/fallbackImg';
import { formatCurrency } from '../../../../utils/formatCurrency';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { Spinner } from '../../../../components/Spinner';

import { Footer, Form } from '../../../../components/Form/styles';

import closeIcon from '../../../../assets/images/close-icon.svg';
import { ContainerProduct, Paragraph } from './styles';

async function deleteProduct({ _id }: Product) {
  const product = await ProductServices.delete(_id);

  return product;
}

export function ModalRemove({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  const { handleModalVisible, productSelected } = useProductsModal();

  const { handleSubmit } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteProduct, {
    onSuccess: (data) => {
      toast.success(data.message);
      handleModalVisible('deleteProduct', !isVisible);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('products');
    }
  });

  return (
    <Modal isVisible={isVisible}>
      <header>
        <h2>Excluir Produto</h2>

        <Button onClick={() => handleModalVisible('deleteProduct', !isVisible)}>
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Paragraph>Tem certeza que deseja excluir o produto?</Paragraph>

      <Form onSubmit={handleSubmit(() => mutate(productSelected))}>
        <ContainerProduct>
          <img
            src={`${api.defaults.baseURL}/uploads/${productSelected.imagePath}`}
            alt={productSelected.name}
            onError={handleImageFallback}
          />

          <figcaption>
            <strong>{productSelected.name}</strong>
            <p>{formatCurrency(productSelected.price)}</p>
          </figcaption>
        </ContainerProduct>

        <Footer isCenter>
          <Button
            type='reset'
            onClick={() => handleModalVisible('deleteProduct', !isVisible)}
          >
            Manter Produto
          </Button>
          <Button type='submit' isDisabled={isLoading}>
            {isLoading ? <Spinner /> : 'Excluir Produto'}
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}
