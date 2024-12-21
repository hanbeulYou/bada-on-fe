import { styled } from 'styled-components';

import CheckToggle from '../common/CheckToggle';
import Icon from '../common/Icon';

interface TermItemProps {
  termType: '필수' | '선택';
  termContent: string;
  isChecked?: boolean;
  onToggleClick: () => void;
}

const TermItem = ({
  termType,
  termContent,
  isChecked,
  onToggleClick,
}: TermItemProps) => {
  return (
    <TermItemContainer>
      <CheckToggle isChecked={isChecked} handleToggle={onToggleClick} />
      <TermContentContainer>
        <TermType>[{termType}]</TermType>
        <TermContent>{termContent}</TermContent>
      </TermContentContainer>
      <Icon name="chevron-right" width={18} height={18} />
    </TermItemContainer>
  );
};

const TermItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

const TermContentContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 4px;
`;

const TermType = styled.span`
  ${({ theme }) => theme.typography.Body};
  color: ${({ theme }) => theme.colors.gray600};
`;

const TermContent = styled.span`
  ${({ theme }) => theme.typography.Body};
  color: ${({ theme }) => theme.colors.gray600};
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

export default TermItem;
