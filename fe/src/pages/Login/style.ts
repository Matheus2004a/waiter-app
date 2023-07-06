import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface InvalidFields {
  isInvalid: FieldError | undefined;
}

export const Container = styled.main`
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const SectionWelcome = styled.section`
  text-align: center;
  margin-bottom: 40px;

  h4 {
    opacity: 0.85;
  }

  p {
    font-size: 32px;
    text-transform: uppercase;
  }
`;

export const Form = styled.form`
  display: grid;
  width: calc(100% - 70%);
`;

export const Fieldset = styled.fieldset<InvalidFields>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  & + & {
    margin-top: 32px;
  }

  input {
    font-size: 14px;
    height: 56px;
    padding: 0px 16px;
    border-radius: 8px;
    border: 1px solid var(--gray-200, #CCC);
    border-color: ${({ isInvalid }) => isInvalid && 'var(--brand-red, #D73035)'};
    color: var(--gray-400, #666);
    caret-color: var(--brand-red, #D73035);

    &:focus {
      outline: none;
      border: 1px solid var(--gray-400, #666);
      border-color: ${({ isInvalid }) => isInvalid && 'var(--brand-red, #D73035)'};
    }
  }

  .feedback-error {
    font-size: 14px;
    color: var(--brand-red, #D73035);
  }

  .eye {
    cursor: pointer;
    position: absolute;
    right: 15px;
    bottom: ${({ isInvalid }) => isInvalid ? '35px' : '10px'};
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledButton = styled.button`
  border-radius: 44px;
  padding: 14px 28px;
  color: var(--gray-0, #FFF);
  font-weight: 600;
  margin-top: 40px;
  background: var(--brand-red, #D73035);
  transition: background 0.3s ease-in-out;

  &:hover {
    background: var(--brand-red-dark, #8A1114);
  }

  &:disabled {
    background: var(--gray-200, #CCC);
    cursor: not-allowed;
  }
`;
