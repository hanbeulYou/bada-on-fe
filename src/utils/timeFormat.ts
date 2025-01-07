/**
 * 시간을 00 형식으로 변환
 * @param hour 시간
 * @returns 00 형식의 시간
 */
export const HourFormat = (hour: string) => {
  const hourNumber = parseInt(hour);
  if (hourNumber < 10) return `0${hourNumber}`;
  return hourNumber;
};

/**
 * 시간을 오전/오후 형식으로 변환
 * @param hour 시간
 * @returns 오전/오후 형식의 시간
 */
export const HourFormatWithAmPm = (hour: string) => {
  const hourNumber = parseInt(hour);
  if (hourNumber < 12) return `오전 ${HourFormat(hour)}`;
  return `오후 ${HourFormat(hour)}`;
};

/**
 * 날짜와 시간을 오전/오후 형식으로 변환
 * @param time 날짜와 시간
 * @param format 오전/오후 형식
 * @returns 날짜와 시간
 */
export const TimeFormatWithYMDHM = (
  time: string,
  format: 'withAmPm' | 'withoutAmPm' = 'withAmPm',
) => {
  const [YYYY, MM, DD] = time.split('T')[0].split('-');
  const [hour, minute] = time.split('T')[1].split(':');
  if (format === 'withAmPm')
    return `${YYYY}년 ${MM}월 ${DD}일 ${HourFormatWithAmPm(hour)}:${minute}`;
  return `${YYYY}년 ${MM}월 ${DD}일 ${HourFormat(hour)}:${minute}`;
};
