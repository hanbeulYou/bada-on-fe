import React, { useContext } from 'react';
import styled from 'styled-components';

import { AddressContext } from '../context/AddressContext';

import ColList from './common/ColList';
import Icon from './common/Icon';
import SearchItem from './common/SearchItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px 20px; // TODO: padding-top을 검색바 높이만큼 조절하기!
  position: absolute;
  z-index: 3;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
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
  onClick?: (address: string) => void;
  onDeleteHistory?: (id: number) => void;
  isSearching: boolean;
};

const Search: React.FC<SearchProps> = ({
  onClick,
  onDeleteHistory,
  isSearching,
}) => {
  const { state } = useContext(AddressContext);

  return (
    <Container>
      {isSearching ? (
        <>
          {state.searchResults?.length === 0 ? (
            <NoResult />
          ) : (
            <ColList>
              {state.searchResults?.map((result, index) => (
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
                    onDelete={() => onDeleteHistory(history.id)}
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
