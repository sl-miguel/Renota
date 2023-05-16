// Credits: https://codepen.io/shshaw/pen/bGNJJBE
import { ChangeEvent, useEffect, useRef } from 'react';

interface SizableAreaProps {
	text: string;
	handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function SizableArea({ text, handleChange }: SizableAreaProps) {
	const labelRef = useRef<HTMLLabelElement>(null);

	useEffect(() => {
		if (labelRef.current) {
			labelRef.current.dataset.value = text;
		}
	}, []);

	return (
		<label ref={labelRef} className='input-sizer stacked '>
			<textarea autoFocus={true} onChange={handleChange} value={text} rows={1} placeholder='hi'></textarea>
		</label>
	);
}

export default SizableArea;
