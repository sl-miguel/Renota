import { useEffect, useState } from 'react';
import Icon from './icons';

interface TooltipProps {
	noteId: number;
	usedColor?: string;
	handleClick: (id: number, color: string) => void;
}

function Tooltip({ noteId, usedColor = '', handleClick }: TooltipProps) {
	const [colors] = useState(['#0a72ef', '#00ddd7', '#7c28c8', '#eb367f', '#fc6d26', '#fac92b']);
	const [display, setDisplay] = useState(false);
	const [translate, setTranslate] = useState(false);
	const [visible, setVisible] = useState(false);
	const availableColors = colors.filter((color) => color !== usedColor);

	useEffect(() => {
		if (visible) {
			setDisplay(true);
			setTimeout(() => setTranslate(true));
		} else {
			setTimeout(() => setDisplay(false), 300);
			setTranslate(false);
		}
	}, [visible]);

	const handleVisibility = () => {
		setVisible((prev) => !prev);
	};

	return (
		<div className='flex items-center justify-center gap-1 overflow-hidden'>
			<div
				style={{ display: display ? 'flex' : 'none' }}
				className={`flex transition-transform ease-linear duration-300 ${translate ? 'translate-x-0' : 'translate-x-full'}`}>
				{availableColors.map((color) => (
					<div key={color} className='cursor-pointer' onClick={() => handleClick(noteId, color)}>
						<Icon name='circle' size={20} color={color} />
					</div>
				))}
			</div>

			<div style={{ background: usedColor }} className='shake relative flex items-center justify-center p-1 rounded cursor-pointer' onClick={handleVisibility}>
				<Icon name='palette' size={20} />
			</div>
		</div>
	);
}

export default Tooltip;
