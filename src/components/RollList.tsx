import React from 'react';
import styled from 'styled-components';

import RollButton from './common/RollButton';

// 검색바 바로 아래에 떠있는 필터 버튼들을 나열합니다.
const RollList: React.FC = () => {
  const dummyData = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <RollListContainer>
      {dummyData.map((item, index) => (
        <RollButton key={index} text={item} />
      ))}
    </RollListContainer>
  );
};

const RollListContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;

  /* 스크롤 바 숨기기 (웹킷 브라우저) */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default RollList;
