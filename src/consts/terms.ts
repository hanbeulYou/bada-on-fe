export const TERM_TYPES = {
  MANDATORY: 'MANDATORY',
  OPTIONAL: 'OPTIONAL',
} as const;

export type TermType = (typeof TERM_TYPES)[keyof typeof TERM_TYPES];

export interface TermAgreeType {
  condition: boolean;
  personalInfo: boolean;
  location: boolean;
  notification: boolean;
}

export const termClassification: Record<keyof TermAgreeType, TermType> = {
  condition: TERM_TYPES.MANDATORY,
  personalInfo: TERM_TYPES.MANDATORY,
  location: TERM_TYPES.MANDATORY,
  notification: TERM_TYPES.OPTIONAL,
};

export const defaultTermAgree: TermAgreeType = {
  condition: false,
  personalInfo: false,
  location: false,
  notification: false,
};
