import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

import theme from '../../styles/theme';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  chartValue: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ chartValue }) => {
  let data;

  if (chartValue <= 25) {
    data = {
      datasets: [
        {
          data: [chartValue, 100 - chartValue],
          backgroundColor: [theme.colors.blue100, theme.colors.gray50],
          hoverBackgroundColor: [theme.colors.blue100, theme.colors.gray50],
          borderWidth: 0,
        },
      ],
    };
  } else if (chartValue <= 50) {
    data = {
      datasets: [
        {
          data: [25, chartValue - 25, 100 - chartValue],
          backgroundColor: [
            theme.colors.blue100,
            theme.colors.blue300,
            theme.colors.gray50,
          ],
          hoverBackgroundColor: [
            theme.colors.blue100,
            theme.colors.blue300,
            theme.colors.gray50,
          ],
          borderWidth: 0,
        },
      ],
    };
  } else if (chartValue <= 75) {
    data = {
      datasets: [
        {
          data: [25, 25, chartValue - 50, 100 - chartValue],
          backgroundColor: [
            theme.colors.blue100,
            theme.colors.blue300,
            theme.colors.blue500,
            theme.colors.gray50,
          ],
          hoverBackgroundColor: [
            theme.colors.blue100,
            theme.colors.blue300,
            theme.colors.blue500,
            theme.colors.gray50,
          ],
          borderWidth: 0,
        },
      ],
    };
  } else if (chartValue <= 100) {
    data = {
      datasets: [
        {
          data: [25, 25, 25, chartValue - 75, 100 - chartValue],
          backgroundColor: [
            theme.colors.blue100,
            theme.colors.blue300,
            theme.colors.blue500,
            theme.colors.blue700,
            theme.colors.gray50,
          ],
          hoverBackgroundColor: [
            theme.colors.blue100,
            theme.colors.blue300,
            theme.colors.blue500,
            theme.colors.blue700,
            theme.colors.gray50,
          ],
          borderWidth: 0,
        },
      ],
    };
  } else {
    throw new Error('chartValue must be between 0 and 100');
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    events: [],
    cutout: '60%',
  };

  return (
    <ChartWrapper>
      <Doughnut data={data} options={options} />
      <ChartLabel>
        <ValueLabel>추천 점수</ValueLabel>
        <Value>{chartValue}</Value>
      </ChartLabel>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  display: flex;
  position: relative;
  width: 208px;
  height: 104px;
`;

const ChartLabel = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
`;

const ValueLabel = styled.span`
  ${theme.typography.Body};
`;

const Value = styled.span`
  ${theme.typography.Heading};
`;

export default DoughnutChart;
