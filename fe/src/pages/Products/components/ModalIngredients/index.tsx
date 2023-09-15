import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import useProductsModal from '../../../../hooks/useProductsModal';
import { FormDataCategory } from '../../../../types/Categories';
import { schemaCategories } from '../../../../validations/schemaCategories';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

import { Fieldset, Form } from '../../../../components/Form/styles';
import { Flex } from '../../../../pages/History/styles';

import closeIcon from '../../../../assets/images/close-icon.svg';

export function ModalIngredients({ isVisible }: { isVisible: boolean }) {
  const { handleModalVisible } = useProductsModal();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataCategory>({
    resolver: zodResolver(schemaCategories)
  });

  const isDisableButton = Object.values(errors).length > 0;

  return (
    <Modal isVisible={isVisible}>
      <header>
        <h2>Novo Ingrediente</h2>

        <Button
          type='button'
          onClick={() => handleModalVisible('newIngredients', !isVisible)}
        >
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <Form onSubmit={handleSubmit((data) => console.log(data))}>
        <Fieldset isInvalid={errors.icon}>
          <label htmlFor="emoji">Emoji</label>
          <input
            type="text"
            id="emoji"
            placeholder='Ex: 🧀'
            {...register('icon')}
          />
          {errors.icon && <span>{errors.icon.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.name}>
          <label htmlFor="category">Nome do Ingrediente</label>
          <input
            type="text"
            id="category"
            placeholder='Ex: Quatro Queijos'
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </Fieldset>

        <Flex style={{ justifyContent: 'flex-end', margin: 0 }}>
          <Button
            type='submit'
            isDisabled={isDisableButton}
          >
            Salvar Alterações
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}
