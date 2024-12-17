import styled from 'styled-components';

import termsData from '../consts/terms.json';
import { Section, Document, TermsData } from '../types/terms';

const RenderSection = ({ section }: { section: Section }) => (
  <SectionList>
    <SectionTitle>{section.title}</SectionTitle>
    <SectionContent>{section.content}</SectionContent>
  </SectionList>
);

const RenderDocument = ({ data }: { data: Document }) => (
  <DocumentContainer>
    <DocumentTitle>{data.title}</DocumentTitle>
    <ul>
      {data.sections.map((section, index) => (
        <RenderSection key={index} section={section} />
      ))}
    </ul>
  </DocumentContainer>
);

const TermsAndConditions = () => {
  const data: TermsData = termsData;
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <RenderDocument key={key} data={value} />
      ))}
    </div>
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
`;

const DocumentContainer = styled.div`
  margin-bottom: 24px;
`;

const SectionList = styled.li`
  margin-top: 16px;
`;
