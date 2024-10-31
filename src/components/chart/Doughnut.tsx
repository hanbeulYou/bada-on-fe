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
          backgroundColor: [theme.colors.blue700, theme.colors.gray50],
          hoverBackgroundColor: [theme.colors.blue700, theme.colors.gray50],
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
            theme.colors.blue700,
            theme.colors.blue300,
            theme.colors.gray50,
          ],
          hoverBackgroundColor: [
            theme.colors.blue700,
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
            theme.colors.blue700,
            theme.colors.blue300,
            theme.colors.red300,
            theme.colors.gray50,
          ],
          hoverBackgroundColor: [
            theme.colors.blue700,
            theme.colors.blue300,
            theme.colors.red300,
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
            theme.colors.blue700,
            theme.colors.blue300,
            theme.colors.red300,
            theme.colors.red700,
            theme.colors.gray50,
          ],
          hoverBackgroundColor: [
            theme.colors.blue700,
            theme.colors.blue300,
            theme.colors.red300,
            theme.colors.red700,
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
  };

  return (
    <ChartWrapper>
      <Doughnut data={data} options={options} />
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  width: 150px;
  height: 150px;
`;

export default DoughnutChart;
