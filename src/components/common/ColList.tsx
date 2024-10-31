import React from 'react';
import { styled } from 'styled-components';

interface ColListProps {
  children: React.ReactNode[];
}

// 세로로 특정 노드를 나열할 때 사용합니다.
const ColList: React.FC<ColListProps> = ({ children }) => {
  return (
    <ListContainer>
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden auto;
  height: fit-content;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ColList;
