import Lottie from 'lottie-react';
import styled, { keyframes } from 'styled-components';

import loadingAnimation from '../../assets/Loading.json';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const SuspenseFallback = () => {
  console.log('SuspenseFallback');

  return (
    <SuspenseContainer>
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ width: '100px', height: '100px' }}
      />
    </SuspenseContainer>
  );
};

const SuspenseContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: white;
  animation: ${fadeOut} 1s ease 1s forwards;
`;

export default SuspenseFallback;
