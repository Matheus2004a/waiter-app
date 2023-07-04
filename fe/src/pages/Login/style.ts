import styled from 'styled-components';

export const Container = styled.main`
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  width: 30%;
  display: grid;

  button {
    border-radius: 44px;
    background: var(--brand-red, #D73035);
    padding: 14px 28px;
    color: var(--gray-0, #FFF);
    font-weight: 600;
    margin-top: 40px;
  }
`;

export const Fieldset = styled.fieldset`
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
    transition: border 0.2s ease-in;
    color: var(--gray-400, #666);
    caret-color: var(--brand-red, #D73035);

    &:focus {
      outline: none;
      border: 1px solid var(--gray-400, #666);
    }
  }

  span {
    position: absolute;
    right: 15px;
    bottom: 10px;
  }
`;
