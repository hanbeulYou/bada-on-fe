import { styled } from 'styled-components';

import CheckToggle from '../common/CheckToggle';

interface TermAllAgreeProps {
  termContent: string;
  isChecked?: boolean;
  onToggleClick: () => void;
}

const TermAllAgree = ({
  termContent,
  isChecked,
  onToggleClick,
}: TermAllAgreeProps) => {
  return (
    <TermAllAgreeContainer>
      <CheckToggle isChecked={isChecked} handleToggle={onToggleClick} />
      <TermContentContainer>
        <TermContent>{termContent}</TermContent>
      </TermContentContainer>
    </TermAllAgreeContainer>
  );
};

const TermAllAgreeContainer = styled.div`
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

const TermContent = styled.span`
  ${({ theme }) => theme.typography.Title_1_Bold};
  color: ${({ theme }) => theme.colors.gray600};
`;

export default TermAllAgree;
