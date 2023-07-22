import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
`;

export const ModalBody = styled.div`
  width: 480px;
  background: #fff;
  padding: 32px;
  border-radius: 8px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 24px;
    }
  }

  > button {
    line-height: 0;
  }

  button {
    border: none;
    background: transparent;
  }

  .status-container {
    margin-top: 2rem;

    small {
      font-size: 14px;
      opacity: 0.8;
    }

    figure {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }
`;
