import styled from 'styled-components';

import { Section, Document } from '../types/terms';

const RenderSection = ({ section }: { section: Section }) => (
  <SectionList>
    <SectionTitle>{section.title}</SectionTitle>
    <SectionContent>{section.content}</SectionContent>
  </SectionList>
);
const TermsAndConditions = ({ data }: { data: Document }) => {
  return (
    <DocumentContainer>
      <DocumentTitle>{data.title}</DocumentTitle>
      <ul>
        {data.sections.map((section, index) => (
          <RenderSection key={index} section={section} />
        ))}
      </ul>
    </DocumentContainer>
  );
};

export default TermsAndConditions;

const DocumentTitle = styled.h3`
  ${({ theme }) => theme.typography.Title_2_Bold}
`;

const SectionTitle = styled.p`
  ${({ theme }) => theme.typography.Body}
`;

const SectionContent = styled.p`
  ${({ theme }) => theme.typography.Body}
  word-break: keep-all;
`;

const DocumentContainer = styled.div`
  margin-bottom: 24px;
`;

const SectionList = styled.li`
  margin-top: 16px;
`;
