import React from 'react';
import styled from 'styled-components';

interface RollButtonProps {
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 150px;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  svg {
    margin-right: 10px;
  }
`;

// 검색바 바로 아래에 떠있는 필터 버튼입니다.
const RollButton: React.FC<RollButtonProps> = ({ icon, text, onClick }) => {
  return (
    <Button onClick={onClick}>
      {icon}
      {text}
    </Button>
  );
};

export default RollButton;
