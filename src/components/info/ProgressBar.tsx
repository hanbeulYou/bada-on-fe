import styled from 'styled-components';

interface BarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: BarProps) => {
  return (
    <BarContainer>
      <EmptyBar />
      <GradientBar percentage={percentage} />
    </BarContainer>
  );
};

export default ProgressBar;

const BarContainer = styled.div`
  position: relative;
  width: 28px;
  height: 60px;
  overflow: hidden;
  border-radius: 4px;
`;

const EmptyBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const GradientBar = styled.div<BarProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #b2cbe9 0%, #83a4ca 50%, #0f437f 100%);
  clip-path: inset(${props => 100 - props.percentage}% 0 0 0);
  transition: clip-path 0.5s ease-in-out;
  z-index: 1;
  animation: clipUp 0.5s ease-in-out;

  @keyframes clipUp {
    from {
      clip-path: inset(100% 0 0 0);
    }
    to {
      clip-path: inset(${props => 100 - props.percentage}% 0 0 0);
    }
  }
`;
