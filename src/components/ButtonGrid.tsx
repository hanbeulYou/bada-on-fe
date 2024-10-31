import { styled } from 'styled-components';

import { DISABLED_LABELS, Label, LABELS } from '../consts/label';

import IntroButton from './common/IntroButton';

interface ButtonGridProps {
  clickedLabel: Label | '';
  setClickedLabel: (label: Label) => void;
}

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ButtonGrid = ({ clickedLabel, setClickedLabel }: ButtonGridProps) => {
  const handleButtonClick = (label: Label) => {
    setClickedLabel(label);
  };

  return (
    <ButtonContainer>
      {LABELS.map(label => (
        <IntroButton
          key={label}
          label={label}
          onClick={handleButtonClick}
          isClicked={!!clickedLabel && clickedLabel === label}
          disabled={DISABLED_LABELS.includes(label)}
        />
      ))}
    </ButtonContainer>
  );
};

export default ButtonGrid;
