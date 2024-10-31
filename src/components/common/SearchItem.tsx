import React from 'react';
import styled from 'styled-components';

interface SearchItemProps {
  content: string;
  isHistory: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`;

const HistoryIcon = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  fill: currentColor;
`;

// 검색 결과 & 히스토리 창에서 사용되는 아이템 컴포넌트입니다.
const SearchItem: React.FC<SearchItemProps> = ({ content, isHistory }) => {
  return (
    <Container>
      {isHistory && (
        <HistoryIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12H0l4 4 4-4H4c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8c-1.85 0-3.55-.63-4.9-1.69l-1.45 1.45C8.55 21.37 10.22 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 5v6l5.25 3.15.75-1.23-4.5-2.67V7H11z" />
        </HistoryIcon>
      )}
      <span>{content}</span>
    </Container>
  );
};

export default SearchItem;
