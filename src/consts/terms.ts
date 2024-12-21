import { Document } from '../types/terms';

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

export const TERM_CONTENT = {
  condition: '바다온 이용약관',
  personalInfo: '개인정보 수집 및 이용 동의',
  location: '위치기반서비스 이용약관',
  notification: '알림 메시지 수신 동의',
};

export const TERM_DOCUMENTS: Record<keyof TermAgreeType, Document> = {
  condition: {
    title: '이용약관 (Terms of Service)',
    sections: [
      {
        title: '1. 서비스 목적',
        content:
          "본 약관은 '바다ON' 어플리케이션(이하 '서비스')의 이용 조건, 사용자 권리와 의무, 그리고 책임 사항을 규정하여 사용자와 서비스 제공자 간의 신뢰를 증진하고 안전하고 효율적인 서비스 이용 환경을 제공하기 위해 마련되었습니다.",
      },
      {
        title: '2. 회원가입 및 계정 관리',
        content:
          '서비스를 이용하기 위해 사용자는 실명과 정확한 정보를 제공해야 합니다. 허위 정보 제공 시 서비스 이용이 제한되거나 계정이 삭제될 수 있습니다. 사용자는 자신의 계정 정보를 안전하게 관리해야 하며, 계정을 타인에게 양도하거나 대여해서는 안 됩니다. 계정이 도용되거나 부정 사용이 발견될 경우, 사용자는 즉시 서비스 운영팀에 이를 신고해야 합니다. 또한, 사용자는 언제든 계정을 해지할 수 있으며, 계정이 삭제되면 서비스 이용이 즉시 중단됩니다.',
      },
      {
        title: '3. 서비스 사용 시 금지사항',
        content:
          '사용자는 서비스 이용 중 타인의 개인정보를 도용하거나 허위 정보를 제공해서는 안 됩니다. 또한, 불법적인 목적으로 서비스를 이용하거나, 서비스 시스템 및 데이터를 무단으로 접근, 변조하는 행위를 금지합니다. 혐오 표현, 음란물 등 부적절한 콘텐츠를 게시하는 행위 역시 엄격히 금지됩니다.',
      },
      {
        title: '4. 서비스 이용 제한 및 해지 조건',
        content:
          '사용자가 약관을 위반하거나 부정 사용 및 불법 행위가 적발될 경우, 서비스 제공자는 사전 경고 없이 계정을 제한하거나 해지할 권한을 갖습니다.',
      },
      {
        title: '5. 손해배상 및 면책 조항',
        content:
          '서비스는 실시간 데이터를 기반으로 정보를 제공하지만, 데이터의 정확성이나 완전성을 보장하지 않습니다.',
      },
      {
        title: '6. 데이터 출처',
        content:
          '서비스는 기상청 API와 바다누리 API를 활용하여 실시간 데이터를 제공합니다. 제공되는 데이터는 공공 API를 기반으로 하지만, 기술적 한계로 인해 정보가 실제와 다를 수 있습니다.',
      },
      {
        title: '7. 데이터 한계',
        content:
          '공급된 정보는 참고용으로만 사용되며, 데이터 오류로 인해 발생한 문제에 대해 책임을 지지 않습니다.',
      },
    ],
  },
  personalInfo: {
    title: '개인정보처리방침 (Privacy Policy)',
    sections: [
      {
        title: '1. 수집하는 개인정보의 항목',
        content:
          '서비스는 사용자가 제공하는 위치 정보, 디바이스 정보, 접속 기록과 같은 자동 수집 정보를 포함하여 서비스 제공에 필요한 데이터를 수집합니다.',
      },
      {
        title: '2. 개인정보 수집 목적',
        content:
          '개인정보는 사용자 맞춤형 정보 제공, 위치 기반 해양 정보 및 추천 제공, 서비스 품질 향상, 그리고 법적 의무 이행을 목적으로 수집됩니다.',
      },
      {
        title: '3. 개인정보 보유 및 이용 기간',
        content:
          '사용자가 계정을 삭제하거나 동의를 철회하면 개인정보는 지체 없이 삭제됩니다.',
      },
      {
        title: '4. 개인정보 보호 조치',
        content:
          '개인정보는 암호화 및 접근 통제 기술을 통해 안전하게 보호됩니다.',
      },
      {
        title: '5. 제3자 제공 여부',
        content:
          '사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법적 요청이 있거나 공공의 이익을 위해 필요한 경우 예외적으로 제공될 수 있습니다.',
      },
    ],
  },
  location: {
    title: '위치정보 이용약관 (Location Information Terms)',
    sections: [
      {
        title: '1. 위치 정보의 수집 및 이용 목적',
        content:
          '서비스는 사용자의 현재 위치를 기반으로 주변 해양 환경 정보 및 활동 추천을 제공합니다.',
      },
      {
        title: '2. 위치 정보 제공 방식',
        content:
          '위치 정보는 GPS 및 네트워크를 통해 수집되며, 실시간으로 처리됩니다.',
      },
      {
        title: '3. 위치 정보 제공 동의 철회',
        content:
          '사용자는 언제든 위치 정보 제공에 대한 동의를 철회할 수 있습니다.',
      },
    ],
  },
  notification: {
    title: '알림 메시지 수신 동의서',
    sections: [
      {
        title: '1. 제공 정보 항목',
        content:
          '서비스는 안전 알림과 사용자가 관심을 가질 수 있는 이벤트, 프로모션, 신규 기능에 대한 정보를 제공합니다.',
      },
      {
        title: '2. 정보 제공 방법',
        content:
          '이메일, 문자 메시지, 앱 푸시 알림을 통해 정보를 제공합니다. 사용자는 선호하는 방식으로 정보를 받을 수 있습니다.',
      },
      {
        title: '3. 동의 및 철회 방법',
        content:
          '사용자는 마케팅 정보 수신에 대해 동의하거나 언제든 철회할 수 있습니다. 철회는 앱 설정 메뉴에서 가능합니다.',
      },
    ],
  },
};
