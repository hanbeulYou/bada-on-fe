import { styled } from 'styled-components';

import TimeButton from '../common/TimeButton';

const TimeSelectRow = () => {
  return (
    <TimeSelectWindow>
      <TimeSelectRowContainer>
        <TimeButton time="오전 10시" status="invalid" onClick={() => {}} />
        <TimeButton time="오전 11시" status="invalid" onClick={() => {}} />
        <TimeButton time="오전 12시" status="invalid" onClick={() => {}} />
        <TimeButton time="오후 1시" status="selected" onClick={() => {}} />
        <TimeButton time="오후 2시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 3시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 4시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 5시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 6시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 7시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 8시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 9시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 10시" status="valid" onClick={() => {}} />
        <TimeButton time="오후 11시" status="valid" onClick={() => {}} />
      </TimeSelectRowContainer>
    </TimeSelectWindow>
  );
};

const TimeSelectWindow = styled.div`
  display: flex;
  width: 100vw;
  position: relative;
  left: 0;
  overflow: hidden;
`;

const TimeSelectRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0px 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default TimeSelectRow;
