import React, { useContext } from 'react';
import styled from 'styled-components';

import { Address } from '../apis/search/useKakaoSearchQuery';
import { AddressContext } from '../context/AddressContext';

import Icon from './common/Icon';

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 8px 20px;
  z-index: 10;
  height: 44px;
`;

const Input = styled.input<{ isError: boolean }>`
  height: 44px;
  padding: 10px 12px 10px 8px;
  ${({ theme }) => theme.typography.Title_1_Bold}
  border: 1px solid
    ${({ theme, isError }) =>
    isError ? `${theme.colors.secondary}` : 'transparent'};
  width: 100%;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12);
`;

const Wrapper = styled.div<{ direction: 'left' | 'right'; value: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: inline-flex;
  ${({ direction, value }) =>
    direction === 'left' ? `left: ${value};` : `right: ${value};`}
`;

const Button = styled.button`
  display: inline-flex;
  cursor: pointer;
`;

type SearchBarProps = {
  searchValue: string;
  onClick?: () => void;
  onClickBtnBackward?: () => void;
  onEnter?: () => void;
  isSearchPage: boolean;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onClick = () => {},
  onClickBtnBackward = () => {},
  searchValue,
  isSearchPage,
  setSearchValue,
}) => {
  const { dispatch } = useContext(AddressContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isError = searchValue.length > 0 && searchValue.length < 2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchValue('');
    dispatch({ type: 'SET_CURRENT_ADDRESS', payload: {} as Address });
  };

  const handleBtnBackward = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClickBtnBackward();
  };

  return (
    <SearchBarContainer onClick={onClick}>
      {isSearchPage && (
        <Wrapper direction="left" value="8px">
          <Button onClick={handleBtnBackward}>
            <Icon name="chevron-left" />
          </Button>
        </Wrapper>
      )}

      <Input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="장소를 입력해주세요"
        style={{ paddingLeft: isSearchPage ? '42px' : '12px' }}
        isError={isError}
      />

      <Wrapper direction="right" value="16px">
        {searchValue ? (
          <Button onClick={handleClear}>
            <Icon name="close" />
          </Button>
        ) : (
          <Icon name="finder" />
        )}
      </Wrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;
