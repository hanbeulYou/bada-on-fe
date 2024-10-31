import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { LABEL_MAPPING, LABELS } from '../consts/label';

import FilterButton from './common/FilterButton';

export const LABEL_MAPPING_REVERSE: Record<string, string> = {
  snorkeling: '스노클링',
  diving: '다이빙',
  swimming: '해수욕',
  surfing: '서핑',
  scubaDiving: '스쿠버다이빙',
  snap: '스냅촬영',
  sunset: '일출/일몰',
};

const FilterList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.getAll('selected');

  const handleFilterButtonClick = (item: string) => {
    const currentSelected = new Set(selected);
    const mappedItem = LABEL_MAPPING[item];
    if (currentSelected.has(mappedItem)) {
      currentSelected.delete(mappedItem);
    } else {
      currentSelected.add(mappedItem);
    }
    setSearchParams({ selected: Array.from(currentSelected) });
  };

  return (
    <FilterListContainer>
      {LABELS.map((item, index) => (
        <FilterButton
          key={index}
          label={item}
          isClicked={selected.includes(LABEL_MAPPING[item])}
          onClick={() => handleFilterButtonClick(item)}
        />
      ))}
    </FilterListContainer>
  );
};

const FilterListContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  position: absolute;
  z-index: 2;
  top: 92px; // TODO: 헤더 높이를 변수로 주도록
  gap: 6px;
  padding: 0 24px;

  /* 스크롤 바 숨기기 (웹킷 브라우저) */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default FilterList;
