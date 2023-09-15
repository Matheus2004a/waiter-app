import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useProductsModal from '../../../../hooks/useProductsModal';
import ProductServices from '../../../../services/ProductServices';
import { Category } from '../../../../types/Categories';
import { Product } from '../../../../types/Product';
import { handleImageFallback } from '../../../../utils/fallbackImg';
import { schemaProduct } from '../../../../validations/schemaProduct';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { Spinner } from '../../../../components/Spinner';

import { ContentSearch, Fieldset, Footer } from '../../../../components/Form/styles';
import { Item, List } from './ListIngredients/styles';
import {
  ContainerPreview, FormGrid, GridCategory,
  HeaderIngredient, PreviewImg, TagCategory
} from './styles';

import closeIcon from '../../../../assets/images/close-icon.svg';
import searchIcon from '../../../../assets/images/search.svg';

async function createProduct(data: Product) {
  const newProduct = await ProductServices.create(data);

  return newProduct;
}

interface ModalRegisterProps {
  isVisible: boolean;
  categories: Category[];
}

export function ModalRegister({ isVisible, categories }: ModalRegisterProps) {
  if (!isVisible) return null;

  const {
    isModalVisible, handleModalVisible, productSelected,
    previewUrl, handleFileChange
  } = useProductsModal();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Product>({
    resolver: zodResolver(schemaProduct)
  });

  const { fields } = useFieldArray({
    name: 'ingredients',
    control
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: (data) => {
      toast.success(data.message);
      handleModalVisible('newProduct', !isVisible);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('products');
    }
  });

  function handleToggleModals() {
    handleModalVisible('newProduct', !isModalVisible.newProduct);
    handleModalVisible('newIngredients', !isModalVisible.newIngredients);
  }

  const isDisabled = Object.values(errors).length > 0;

  return (
    <Modal isVisible={isVisible} isLoong>
      <header>
        <h2>Novo Produto</h2>

        <Button onClick={() => handleModalVisible('newProduct', !isVisible)}>
          <img src={closeIcon} alt="icon-close" />
        </Button>
      </header>

      <FormGrid onSubmit={handleSubmit(() => mutate(productSelected))}>
        <Fieldset isInvalid={errors.imagePath}>
          <legend>Imagem</legend>

          <label htmlFor="imagePath">
            <ContainerPreview>
              <PreviewImg
                src={previewUrl}
                alt="preview"
                onError={handleImageFallback}
                isEmpty={!previewUrl}
              />
            </ContainerPreview>
          </label>
          <input
            type="file"
            id="imagePath"
            placeholder='Quatro Queijos'
            {...register('imagePath')}
            onChange={handleFileChange}
          />
          {errors.imagePath && <span>{errors.imagePath.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.name}>
          <label htmlFor="name">Nome do Produto</label>
          <input
            type="text"
            id="name"
            placeholder='Quatro Queijos'
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.description}>
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            placeholder='Pizza de Quatro Queijos com borda tradicional'
            {...register('description')}
          />
          <p>Máximo 110 caracteres</p>
          {errors.description && <span>{errors.description.message}</span>}
        </Fieldset>

        <Fieldset isInvalid={errors.category}>
          <legend>Categoria</legend>

          <GridCategory>
            {categories?.map((category) => (
              <Fragment key={category._id}>
                <TagCategory>
                  <input
                    type="radio"
                    id={category._id}
                    {...register('category')}
                    name="category"
                  />
                  <span>{category.icon}</span>
                  <label htmlFor={category._id}>{category.name}</label>
                </TagCategory>
                {errors.category && <span>{errors.category.message}</span>}
              </Fragment>
            ))}
          </GridCategory>
        </Fieldset>

        <Fieldset isInvalid={errors.ingredients}>
          <HeaderIngredient>
            <legend>Ingredientes</legend>
            <Button type='reset' onClick={handleToggleModals}>
              Novo Ingrediente
            </Button>
          </HeaderIngredient>

          <label htmlFor="ingredients">Busque o ingrediente</label>
          <ContentSearch>
            <input
              type="search"
              id="ingredients"
              placeholder='Ex: Quatro Queijos'
            />
            <img src={searchIcon} alt="icon-search" />
          </ContentSearch>
          {errors.ingredients && <span>{errors.ingredients.message}</span>}

          <List>
            {fields.map((field, index) => (
              <Item key={field.id}>
                <span>{field.icon}</span>
                <label htmlFor="plate">
                  {field.name}
                  <input
                    type="checkbox"
                    id="plate"
                    {...register(`ingredients.${index}.value`)}
                    name="plate"
                  />
                </label>
              </Item>
            ))}
          </List>
        </Fieldset>

        <Footer isCenter>
          <Button type='submit' isDisabled={isLoading || isDisabled}>
            {isLoading ? <Spinner /> : 'Salvar Alterações'}
          </Button>
        </Footer>
      </FormGrid>
    </Modal>
  );
}
