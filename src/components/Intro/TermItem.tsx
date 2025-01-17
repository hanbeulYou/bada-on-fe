import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { TermAgreeType } from '../../consts/terms';
import CheckToggle from '../common/CheckToggle';
import Icon from '../common/Icon';

interface TermItemProps {
  termType: '필수' | '선택';
  termContent: string;
  termKey: keyof TermAgreeType;
  isChecked?: boolean;
  onToggleClick: () => void;
}

const TermItem = ({
  termType,
  termContent,
  termKey,
  isChecked,
  onToggleClick,
}: TermItemProps) => {
  const navigate = useNavigate();
  return (
    <TermItemContainer>
      <CheckToggle isChecked={isChecked} handleToggle={onToggleClick} />
      <TermContentContainer onClick={() => navigate(`/terms/${termKey}`)}>
        <TermType>[{termType}]</TermType>
        <TermContent>{termContent}</TermContent>
      </TermContentContainer>
      <Icon
        name="chevron-right"
        width={18}
        height={18}
        onClick={() => navigate(`/terms/${termKey}`)}
      />
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
