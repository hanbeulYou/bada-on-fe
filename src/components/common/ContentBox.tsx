// array
import { styled } from 'styled-components';

interface Item {
  label: string;
  value: string;
}

type Variant = 'default' | 'warning';
type justifyContent = 'flex-start' | 'space-between';

interface ContentBoxProps {
  title?: string;
  data: Array<Item | string | number>;
  justifyContent?: justifyContent;
  variant?: Variant;
}

const colorVarMap = {
  default: { color: '#4C5555', background: '#F7F7F8', title: '#1764BE' },
  warning: {
    color: '#4C5555',
    background: 'rgba(229, 73, 73, 0.08)',
    title: '#E54949',
  },
};

const Container = styled.div<{ $variant: Variant; $title: string }>`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 12px;
  background-color: ${props => colorVarMap[props.$variant].background};
  margin-bottom: 24px;
`;

const KeyText = styled.span<{ $variant: Variant }>`
  width: 56px;
  ${({ theme }) => theme.typography.Body_Bold}
  color: ${({ theme }) => theme.colors.gray600};
`;

const ValueText = styled.span<{ $variant: Variant }>`
  ${({ theme }) => theme.typography.Body}
  color: ${({ theme }) => theme.colors.gray600};
`;

const Item = styled.div<{ $justify: justifyContent }>`
  display: flex;
  justify-content: ${props => props.$justify};
  gap: 12px;
`;

const Title = styled.h3<{ $variant: Variant }>`
  ${({ theme }) => theme.typography.Body_Bold}
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 12px;
`;

const ContentBox = (props: ContentBoxProps) => {
  const {
    title,
    data,
    variant = 'default',
    justifyContent = 'flex-start',
  } = props;
  return (
    <>
      {title && <Title $variant={variant}>{title}</Title>}
      <Container $variant={variant} $title={title || ''}>
        {data.map((item, index) => (
          <Item key={index} $justify={justifyContent}>
            {typeof item === 'object' ? (
              <>
                <KeyText $variant={variant}>{item.label}</KeyText>
                <ValueText $variant={variant}>{item.value}</ValueText>
              </>
            ) : (
              <ValueText $variant={variant}>{item}</ValueText>
            )}
          </Item>
        ))}
      </Container>
    </>
  );
};

export default ContentBox;
