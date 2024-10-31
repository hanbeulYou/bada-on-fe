// array
import { styled } from 'styled-components';

interface Item {
  label: string;
  value: string;
}

type Variant = 'default' | 'warning';

interface ContentBoxProps {
  title?: string;
  data: Array<Item>;
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

const Container = styled.div<{ variant: Variant }>`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 12px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.014rem;
  background-color: ${props => colorVarMap[props.variant].background};
`;

const Text = styled.span<{ variant: Variant }>`
  font-weight: 600;
  color: ${props => colorVarMap[props.variant].color};
  font-size: 14px;
  letter-spacing: -0.014rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
`;

const Title = styled.h3<{ variant: Variant }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => colorVarMap[props.variant].title};
  padding-bottom: 12px;
`;

const ContentBox = (props: ContentBoxProps) => {
  const { title, data, variant = 'default' } = props;
  return (
    <>
      {title && <Title variant={variant}>{title}</Title>}
      <Container variant={variant}>
        {data.map(item => (
          <Item key={item.label}>
            <Text variant={variant}>{item.label}</Text>
            <Text variant={variant}>{item.value}</Text>
          </Item>
        ))}
      </Container>
    </>
  );
};

export default ContentBox;
