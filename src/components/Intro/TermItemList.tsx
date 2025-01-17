import { styled } from 'styled-components';

import {
  defaultTermAgree,
  TERM_CONTENT,
  TermAgreeType,
  termClassification,
  TERM_TYPES,
} from '../../consts/terms';

import TermAllAgree from './TermAllAgree';
import TermItem from './TermItem';

interface TermItemListProps {
  termAgree: TermAgreeType;
  setTermAgree: React.Dispatch<React.SetStateAction<TermAgreeType>>;
}

const TermItemList = ({ termAgree, setTermAgree }: TermItemListProps) => {
  const handleTermAllAgree = () => {
    if (Object.values(termAgree).every(value => value)) {
      setTermAgree(defaultTermAgree);
    } else {
      setTermAgree({
        condition: true,
        personalInfo: true,
        location: true,
        notification: true,
      });
    }
  };
  const handleTermAgree = (key: keyof TermAgreeType) => {
    setTermAgree(
      (prev: TermAgreeType): TermAgreeType => ({
        ...prev,
        [key]: !prev[key],
      }),
    );
  };

  return (
    <Container>
      <TermAllAgree
        termContent="이용약관 전체 동의"
        isChecked={Object.values(termAgree).every(value => value)}
        onToggleClick={() => handleTermAllAgree()}
      />
      <TermItemListContainer>
        {(
          Object.entries(termClassification) as [
            keyof TermAgreeType,
            (typeof TERM_TYPES)[keyof typeof TERM_TYPES],
          ][]
        ).map(([key, type]) => (
          <TermItem
            key={key}
            termKey={key}
            termType={type === TERM_TYPES.MANDATORY ? '필수' : '선택'}
            termContent={TERM_CONTENT[key]}
            isChecked={termAgree[key]}
            onToggleClick={() => handleTermAgree(key)}
          />
        ))}
      </TermItemListContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

const TermItemListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  padding: 20px 0;
`;

export default TermItemList;
