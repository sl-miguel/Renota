import Bin from './Bin';
import Bulb from './Bulb';
import Circle from './Circle';
import More from './More';
import Palette from './Palette';
import Send from './Send';

type IconProps = {
	name: 'palette' | 'bulb' | 'more' | 'circle' | 'bin' | 'send';
	size?: number;
	color?: string;
};

function Icon({ name, size = 45, color = 'white' }: IconProps) {
	let Component: React.FC<React.SVGProps<SVGSVGElement>> = () => null;

	switch (name) {
		case 'palette':
			Component = () => <Palette size={size} color={color} />;
			break;
		case 'bulb':
			Component = () => <Bulb size={size} color={color} />;
			break;
		case 'more':
			Component = () => <More size={size} color={color} />;
			break;
		case 'circle':
			Component = () => <Circle size={size} color={color} />;
			break;
		case 'bin':
			Component = () => <Bin size={size} color={color} />;
			break;
		case 'send':
			Component = () => <Send size={size} color={color} />;
			break;
	}

	return <Component />;
}

export default Icon;
