export interface Section {
  title: string;
  content: string;
}

export interface Document {
  title: string;
  sections: Section[];
}

// 전체 JSON 데이터 타입 정의
export interface TermsData {
  condition: Document;
  personalInfo: Document;
  location: Document;
  notification: Document;
}
