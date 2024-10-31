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
  width: 375px;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LayoutBox = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;
