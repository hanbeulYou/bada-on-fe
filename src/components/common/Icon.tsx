import SVG, { Props as SVGProps } from 'react-inlinesvg';

interface IconProps extends Omit<SVGProps, 'src'> {
  name: string;
}

const Icon = (props: IconProps) => {
  const { name, ...rest } = props;
  const baseURL = '/src/assets/icons';
  const src = `${baseURL}/${name}.svg`;

  return <SVG src={src} {...rest} />;
};

export default Icon;
