import React from 'react';
import styled from 'styled-components';

interface GrayBoxProps {
  children: React.ReactNode;
}

const GrayBoxContainer = styled.div`
  display: flex;
  padding: 16px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const GrayBox: React.FC<GrayBoxProps> = ({ children }) => {
  return (
    <GrayBoxContainer>
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
    </GrayBoxContainer>
  );
};

export default GrayBox;
