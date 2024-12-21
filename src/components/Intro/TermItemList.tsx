import { styled } from 'styled-components';

import { defaultTermAgree, TermAgreeType } from '../../consts/terms';

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
        <TermItem
          termType="필수"
          termContent="바다온 이용약관"
          isChecked={termAgree.condition}
          onToggleClick={() => handleTermAgree('condition')}
        />
        <TermItem
          termType="필수"
          termContent="개인정보 수집 및 이용 동의"
          isChecked={termAgree.personalInfo}
          onToggleClick={() => handleTermAgree('personalInfo')}
        />
        <TermItem
          termType="필수"
          termContent="위치기반서비스 이용약관"
          isChecked={termAgree.location}
          onToggleClick={() => handleTermAgree('location')}
        />
        <TermItem
          termType="선택"
          termContent="알림 메시지 수신 동의"
          isChecked={termAgree.notification}
          onToggleClick={() => handleTermAgree('notification')}
        />
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
