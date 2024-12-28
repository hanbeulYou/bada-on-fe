import { styled } from 'styled-components';

import Icon from './Icon';

interface MapButtonProps {
  onClick: () => void;
  iconName: string;
  className?: string;
  style?: React.CSSProperties;
}

const StyledButton = styled.button<{ style?: React.CSSProperties }>`
  position: ${({ style }) => style?.position || 'absolute'};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 1;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray50};
  }
`;

export const MapButton = ({
  onClick,
  iconName,
  className,
  style,
}: MapButtonProps) => {
  return (
    <StyledButton onClick={onClick} className={className} style={style}>
      <Icon name={iconName} />
    </StyledButton>
  );
};
