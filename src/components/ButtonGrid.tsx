import { styled } from 'styled-components';

import { DISABLED_LABELS, Label, LABELS } from '../consts/label';

import IntroButton from './common/IntroButton';

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
  const handleButtonClick = (label: Label) => {
    setClickedLabels(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <ButtonContainer>
      {LABELS.map(label => (
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
