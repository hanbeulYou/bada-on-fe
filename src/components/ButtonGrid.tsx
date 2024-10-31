import { styled } from 'styled-components';

import IntroButton, { Label } from './common/IntroButton';

interface ButtonGridProps {
  clickedLabels: Record<string, boolean>;
  setClickedLabels: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ButtonGrid: React.FC<ButtonGridProps> = ({
  clickedLabels,
  setClickedLabels,
}) => {
  const labels: Label[] = [
    '스노클링',
    '다이빙',
    '스냅촬영',
    '해수욕',
    '서핑',
    '스쿠버다이빙',
    '일출/일몰',
  ];

  const DISABLED_LABELS: Label[] = [
    '해수욕',
    '서핑',
    '스쿠버다이빙',
    '일출/일몰',
  ];

  const handleButtonClick = (label: Label) => {
    setClickedLabels(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <ButtonContainer>
      {labels.map(label => (
        <IntroButton
          key={label}
          label={label}
          onClick={handleButtonClick}
          isClicked={!!clickedLabels[label]}
          disabled={DISABLED_LABELS.includes(label)}
        />
      ))}
    </ButtonContainer>
  );
};

export default ButtonGrid;
