import { styled } from 'styled-components';

import Icon from '../common/Icon';

interface PinProps {
  icon: 'beach' | 'star' | 'search';
  hasAlert?: boolean;
  hasLabel?: boolean;
  label?: string;
  onClick?: () => void;
}

const Pin = ({
  icon,
  hasAlert = false,
  hasLabel = false,
  label = '',
  onClick,
}: PinProps) => {
  return (
    <PinContainer onClick={onClick}>
      {icon === 'search' ? (
        <Icon name={icon} width={48} height={48} />
      ) : (
        <IconContainer icon={icon} hasAlert={hasAlert}>
          <Icon name={icon} width={28} height={28} />
        </IconContainer>
      )}
      {hasAlert && (
        <PinAlert>
          <Icon name="alert" width={16} height={16} />
        </PinAlert>
      )}
      {hasLabel && <PinLabel>{label}</PinLabel>}
    </PinContainer>
  );
};

const PinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 48px;
  height: 48px;
  gap: 2px;
`;

const IconContainer = styled.div<{
  icon: 'beach' | 'star';
  hasAlert: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  background-color: ${({ theme, icon }) =>
    icon === 'beach' ? theme.colors.primary : theme.colors.star};
  border-radius: 14px;
  border: 1.111px solid
    ${({ theme, icon }) =>
      icon === 'beach' ? theme.colors.primary : theme.colors.star};
  box-shadow: 0px 0px 1.111px 0px rgba(8, 33, 63, 0.16);
`;

const PinAlert = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const PinLabel = styled.span`
  ${({ theme }) => theme.typography.Body_Bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

export default Pin;
