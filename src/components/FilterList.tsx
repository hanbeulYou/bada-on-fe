import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { Activity, LABEL_MAPPING, LABELS } from '../consts/label';
import { SafeAreaContext } from '../context/SafeAreaContext';

import FilterButton from './common/FilterButton';

interface FilterListProps {
  onFilterChange: (selected: Activity) => void;
}

const FilterList = (props: FilterListProps) => {
  const { onFilterChange = () => {} } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get('selected') as Activity;
  const { state: safeAreaState } = useContext(SafeAreaContext);

  useEffect(() => {
    if (selected) onFilterChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleFilterButtonClick = (item: string) => {
    const mappedItem = LABEL_MAPPING[item];
    if (selected === mappedItem) {
      return; // 이미 선택된 항목이면 아무 작업도 하지 않음
    }
    setSearchParams({ selected: mappedItem }); // 새로운 값으로 대체
  };

  return (
    <FilterListContainer safeArea={safeAreaState}>
      {LABELS.map((item, index) => (
        <FilterButton
          key={index}
          label={item}
          isClicked={selected === LABEL_MAPPING[item]}
          onClick={() => handleFilterButtonClick(item)}
        />
      ))}
    </FilterListContainer>
  );
};

const FilterListContainer = styled.div<{ safeArea: SafeAreaState }>`
  width: 100%;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  position: absolute;
  z-index: 2;
  top: calc(
    76px + ${({ safeArea }) => safeArea.top}px
  ); // TODO: 헤더 높이를 변수로 주도록
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
