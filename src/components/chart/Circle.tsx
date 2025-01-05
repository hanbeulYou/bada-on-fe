import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

import { Activity } from '../../consts/label';
import theme from '../../styles/theme';
import Icon from '../common/Icon';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircleChartProps {
  activity: Activity;
  chartValue: number;
  recommendColor: string;
}

const CircleChart = ({
  activity,
  chartValue,
  recommendColor,
}: CircleChartProps) => {
  const data = {
    datasets: [
      {
        data: [chartValue, 100 - chartValue],
        backgroundColor: [recommendColor, theme.colors.gray300],
        hoverBackgroundColor: [recommendColor, theme.colors.gray300],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    events: [],
    rotation: 0,
    cutout: '80%',
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <ChartWrapper>
      <Doughnut data={data} options={options} />
      <IconWrapper>
        <Icon name={activity} width={28} height={28} fill={recommendColor} />
      </IconWrapper>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  position: absolute;
`;

export default CircleChart;
