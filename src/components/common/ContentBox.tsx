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
  padding: ${props => (props.title ? '16px 12px' : '12px')};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.014rem;
  background-color: ${props => colorVarMap[props.$variant].background};
  margin-bottom: 24px;
`;

const Text = styled.span<{ $variant: Variant }>`
  font-weight: 600;
  color: ${props => colorVarMap[props.$variant].color};
  font-size: 14px;
  letter-spacing: -0.014rem;
`;

const Item = styled.div<{ $justify: justifyContent }>`
  display: flex;
  justify-content: ${props => props.$justify};
  gap: 12px;
`;

const Title = styled.h3<{ $variant: Variant }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => colorVarMap[props.$variant].title};
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
                <Text $variant={variant}>{item.label}</Text>
                <Text $variant={variant}>{item.value}</Text>
              </>
            ) : (
              <Text $variant={variant}>{item}</Text>
            )}
          </Item>
        ))}
      </Container>
    </>
  );
};

export default ContentBox;
