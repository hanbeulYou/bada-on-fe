import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  Address,
  useKakaoSearchQuery,
} from '../apis/search/useKakaoSearchQuery';
import { AddressContext } from '../context/AddressContext';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';

import ColList from './common/ColList';
import Icon from './common/Icon';
import SearchItem from './common/SearchItem';

const Container = styled.div<{ safeArea: SafeAreaState }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ safeArea }) => safeArea.top + 84}px 20px
    ${({ safeArea }) => safeArea.bottom + 20}px;
  position: absolute;
  z-index: 3;
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

const WarningText = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  position: absolute;
  top: 50%;
  ${({ theme }) => theme.typography.Body};
  color: ${({ theme }) => theme.colors.red500};
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.14px;
`;

const PlaceText = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.blue500};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const AddressText = styled.div`
  width: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.gray500};
  text-overflow: ellipsis;
  margin-top: 3px;

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchContent = ({ content, isHistory = false }) => {
  return (
    <div style={{ width: isHistory ? 'calc(100% - 20px)' : '100%', flex: 1 }}>
      <PlaceText>{content.place_name}</PlaceText>
      <AddressText>{content.address_name}</AddressText>
    </div>
  );
};

type SearchProps = {
  onClick?: (address: Address) => void;
  onDeleteHistory?: (id: number) => void;
  isSearching: boolean;
};

const Search: React.FC<SearchProps> = ({
  onClick,
  onDeleteHistory,
  isSearching,
}) => {
  const { state } = useContext(AddressContext);
  const { state: safeAreaState } = useContext(SafeAreaContext);
  // 검색어와 위치를 기반으로 쿼리 실행
  const { data: searchData, isLoading: searchIsLoading } = useKakaoSearchQuery(
    state.searchKeyword,
    state.location.longitude || 126.5311884, // 제주시청의 경도
    state.location.latitude || 33.4996213, // 제주시청의 위도
  );

  return (
    <Container safeArea={safeAreaState} style={{ zIndex: 5 }}>
      {isSearching ? (
        <>
          {searchIsLoading || searchData?.documents?.length === 0 ? (
            <NoResult />
          ) : (
            <ColList>
              {searchData?.documents?.map((result, index) => (
                <SearchItem
                  key={index}
                  isHistory={false}
                  onClick={() => onClick && onClick(result)}
                >
                  <SearchContent content={result} />
                </SearchItem>
              ))}
            </ColList>
          )}
        </>
      ) : (
        <>
          {state.histories?.length === 0 ? (
            <NoResult />
          ) : (
            <ColList>
              {state.histories?.map((history, index) => (
                <>
                  <SearchItem
                    key={index}
                    isHistory
                    onClick={() => onClick && onClick(history)}
                    onDelete={() =>
                      onDeleteHistory && onDeleteHistory(history.id)
                    }
                  >
                    <SearchContent isHistory content={history} />
                  </SearchItem>
                </>
              ))}
            </ColList>
          )}
        </>
      )}
    </Container>
  );
};

const NoResult = () => {
  return (
    <WarningText>
      <Icon name="alert-triangle" width={32} height={32} />
      <div>
        검색 결과가 없습니다.
        <br />
        다시 한번 확인해 주세요.
      </div>
    </WarningText>
  );
};

export default Search;
