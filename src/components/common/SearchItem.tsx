import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';

interface SearchItemProps {
  children: React.ReactNode;
  isHistory: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const Container = styled.div`
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray50}`};
`;

const HistoryIcon = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  fill: currentColor;
`;

const DeleteButton = styled.button`
  display: inline-flex;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

// 검색 결과 & 히스토리 창에서 사용되는 아이템 컴포넌트입니다.
const SearchItem: React.FC<SearchItemProps> = ({
  children,
  isHistory,
  onClick,
  onDelete = () => {},
}) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Container
      onClick={() => onClick && onClick()}
      style={{ paddingRight: isHistory ? '40px' : '0' }}
    >
      {isHistory && (
        <HistoryIcon
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flex: 'none' }}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12H0l4 4 4-4H4c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8c-1.85 0-3.55-.63-4.9-1.69l-1.45 1.45C8.55 21.37 10.22 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 5v6l5.25 3.15.75-1.23-4.5-2.67V7H11z" />
        </HistoryIcon>
      )}
      {children}
      {isHistory && (
        <DeleteButton onClick={handleDelete}>
          <Icon name="close" />
        </DeleteButton>
      )}
    </Container>
  );
};

export default SearchItem;
