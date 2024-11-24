import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <LayoutBox>
        <Outlet />
      </LayoutBox>
    </LayoutContainer>
  );
};

export { Layout };

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
`;

const LayoutBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;
