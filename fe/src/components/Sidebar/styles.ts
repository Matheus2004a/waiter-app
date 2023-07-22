import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--gray-0, #FFF);
  padding-top: 40px;

  .brand-name {
    margin-bottom: 56px;
    color: var(--gray-400, #666);
    font-size: 24px;
  }

  ul {
    display: grid;
    gap: 8px;
  }

  li {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    color: var(--gray-400, #666);
    font-weight: 500;
  }
`;
