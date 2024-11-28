import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Flexbox para centralizar */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Usando position fixed para ocupar toda a tela */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Fundo semitransparente */
  background-color: rgba(0, 0, 0, 0);
  z-index: 9999; 

  /* Estilo do loader */
  .loader {
    border: 4px solid #205f2a;
    border-left-color: transparent;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 1s linear infinite;
  }

  /* Animação de rotação */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
