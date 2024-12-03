export type Label = '스노클링' | '다이빙' | '해수욕' | '서핑' | '카약/패들보드';

export type Activity =
  | 'snorkeling'
  | 'diving'
  | 'swimming'
  | 'surfing'
  | 'kayakingPaddleBoarding';

export const LABELS: Label[] = [
  '스노클링',
  '다이빙',
  '해수욕',
  '서핑',
  '카약/패들보드',
];

export const DISABLED_LABELS: Label[] = [];

export const LABEL_MAPPING: Record<Label, Activity> = {
  스노클링: 'snorkeling',
  다이빙: 'diving',
  해수욕: 'swimming',
  서핑: 'surfing',
  '카약/패들보드': 'kayakingPaddleBoarding',
};

export const LABEL_MAPPING_REVERSE: Record<Activity, Label> = {
  snorkeling: '스노클링',
  diving: '다이빙',
  swimming: '해수욕',
  surfing: '서핑',
  kayakingPaddleBoarding: '카약/패들보드',
};
