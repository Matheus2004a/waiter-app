import styled from 'styled-components';

interface NavProps {
  isActive: boolean;
}

export const Nav = styled.nav`
  width: 100%;
  border-bottom: 1px solid var(--gray-40, rgba(204, 204, 204, 0.40));
  margin-bottom: 37px;

  ul {
    display: flex;
    gap: 40px;
  }
`;

export const MenuItem = styled.li<NavProps>`
  cursor: pointer;
  border-radius: 8px 8px 0px 0px;
  padding: 16px 40px;
  font-weight: ${({ isActive }) => isActive && 600};
  background: ${({ isActive }) => isActive && 'var(--gray-0, #FFF)'};
  color: ${({ isActive }) => isActive ? 'var(--brand-red, #D73035)' : 'var(--gray-400, #666)'};
`;
