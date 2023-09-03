import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface FieldsetProps {
  isInvalid?: FieldError | undefined;
}

export const Form = styled.form`
  display: grid;
  gap: 32px;

  fieldset {
    display: grid;
  }

  button {
    background: var(--brand-red, #D73035);
    color: var(--gray-0, #FFF);
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 44px;

    &:disabled {
      background: var(--gray-200, #CCC);
      cursor: not-allowed;
    }
  }
`;

export const Fieldset = styled.fieldset<FieldsetProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  input {
    max-width: 100%;
    padding: 1rem;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    border: 1px solid var(--gray-200, #CCC);
    border-color: ${({ isInvalid }) => isInvalid && 'var(--brand-red, #D73035)'};
  }

  span {
    color: var(--brand-red, #D73035);
  }

  .eye {
    cursor: pointer;
    position: absolute;
    right: 15px;
    bottom: ${({ isInvalid }) => isInvalid ? '35px' : '10px'};
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 8px;

  label + label {
    margin-left: 32px;
  }

  input {
    margin-right: 8px;
    accent-color: var(--brand-red, #D73035);
  }

  input:checked + label {
    color: var(--brand-red, #D73035);
  }
`;

export const Content = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 8px;
  padding: 11.5px 14px;
  border-radius: 75px;
  background: var(--White, #FFF);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.10);
`;

export const Footer = styled.footer<{ isCenter?: boolean }>`
  display: flex;
  justify-content: ${({ isCenter }) => isCenter ? 'space-between' : 'flex-end'};
  align-items: center;
`;
