export type Label =
  | '스노클링'
  | '다이빙'
  | '해수욕'
  | '서핑'
  | '스쿠버다이빙'
  | '스냅촬영'
  | '일출/일몰';

export type Activity =
  | 'snorkeling'
  | 'diving'
  | 'swimming'
  | 'surfing'
  | 'scubaDiving'
  | 'snap'
  | 'sunset';

export const LABELS: Label[] = [
  '스노클링',
  '다이빙',
  '스냅촬영',
  '해수욕',
  '서핑',
  '스쿠버다이빙',
  '일출/일몰',
];

export const DISABLED_LABELS: Label[] = [
  '해수욕',
  '서핑',
  '스쿠버다이빙',
  '일출/일몰',
];

export const LABEL_MAPPING: Record<Label, Activity> = {
  스노클링: 'snorkeling',
  다이빙: 'diving',
  해수욕: 'swimming',
  서핑: 'surfing',
  스쿠버다이빙: 'scubaDiving',
  스냅촬영: 'snap',
  '일출/일몰': 'sunset',
};
