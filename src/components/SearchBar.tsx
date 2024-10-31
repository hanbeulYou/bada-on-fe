import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  width: 100%;
`;

type SearchBarProps = {
  searchValue: string;
  onClick?: () => void;
  onEnter?: () => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

// 검색바 컴포넌트입니다.
const SearchBar: React.FC<SearchBarProps> = ({
  onClick,
  onEnter,
  searchValue,
  setSearchValue,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      inputRef.current?.blur();
      onEnter();
    }
  };

  return (
    <SearchBarContainer onClick={onClick}>
      <Input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeydown}
        placeholder="Search..."
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
