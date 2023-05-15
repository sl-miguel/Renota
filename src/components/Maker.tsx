import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

interface MakerProps {
	text: string;
	save: (text: string) => void;
}

function Maker({ text, save }: MakerProps) {
	const ref = useRef<HTMLDivElement>(null);

	const [content, setContent] = useState(text);
	const [isEditing, setIsEditing] = useState(false);

	const keyPress = useCallback((event: KeyboardEvent) => {
		if (event.key !== 'Enter') return;
		setIsEditing(false);
		save(content);
	}, []);

	useEffect(() => {
		document.addEventListener('mousedown', handleOutside);
		return () => document.removeEventListener('mousedown', handleOutside);
	}, []);

	useEffect(() => {
		if (!isEditing) return;
		document.addEventListener('keydown', keyPress, false);
		return () => document.removeEventListener('keydown', keyPress, false);
	}, [isEditing]);

	const handleOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) setIsEditing(false);
	};

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setContent(event.target.value);
	};

	return (
		<div ref={ref}>
			{isEditing && <input onChange={handleInput} value={content} className='block w-full p-0 m-0 border-none bg-transparent' />}
			{/* {isEditing && <p onInput={(event) => setContent(event.currentTarget.textContent || '')} contentEditable='true'></p>} */}
			{!isEditing && <p onDoubleClick={handleDoubleClick} dangerouslySetInnerHTML={{ __html: content }}></p>}
		</div>
	);
}

export default Maker;
