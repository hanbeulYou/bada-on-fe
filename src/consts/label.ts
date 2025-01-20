export type Label =
  | '스노클링'
  | '다이빙'
  | '해수욕'
  | '패들보드'
  | '서핑'
  | '스쿠버다이빙';

export type Activity =
  | 'snorkeling'
  | 'diving'
  | 'swimming'
  | 'paddling'
  | 'surfing'
  | 'scuba';

export const LABELS: Label[] = [
  '스노클링',
  '다이빙',
  '해수욕',
  '패들보드',
  '서핑',
  '스쿠버다이빙',
];

export const DISABLED_LABELS: Label[] = ['스쿠버다이빙'];

export const LABEL_MAPPING: Record<Label, Activity> = {
  스노클링: 'snorkeling',
  다이빙: 'diving',
  해수욕: 'swimming',
  패들보드: 'paddling',
  서핑: 'surfing',
  스쿠버다이빙: 'scuba',
};

export const LABEL_MAPPING_REVERSE: Record<Activity, Label> = {
  snorkeling: '스노클링',
  diving: '다이빙',
  swimming: '해수욕',
  paddling: '패들보드',
  surfing: '서핑',
  scuba: '스쿠버다이빙',
};
