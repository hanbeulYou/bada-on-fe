import React from 'react';
import styled from 'styled-components';

import Icon from './common/Icon';

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Input = styled.input`
  padding: 12px 48px 12px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  width: 100%;
  border-radius: 0.8rem;
  background: #fff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);
`;

const Wrapper = styled.div`
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
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
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
        placeholder="제주"
        style={{ paddingLeft: isSearchPage ? '40px' : '12px' }}
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
