import { ChangeEvent, useRef, useState } from 'react';
import useKeyPress from '../hooks/useKeyPress';
import useOutsideClick from '../hooks/useOutsideClick';

interface MakerProps {
	text: string;
	keyName: string;
	save: (content: string, key: string) => void;
}

function Maker({ text, keyName, save }: MakerProps) {
	const ref = useRef<HTMLDivElement>(null);

	const [content, setContent] = useState(text);
	const [isEditing, setIsEditing] = useState(false);

	const handleSave = () => {
		if (!isEditing) return;
		console.log('Handling save..', content);
		setIsEditing(false);
		save(content, keyName);
	};

	useOutsideClick(handleSave, ref);
	useKeyPress('Enter', handleSave, [isEditing, content]);

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		console.log('Handling input', event.target.value);
		setContent(event.target.value);
	};

	return (
		<div ref={ref}>
			{isEditing && <input onChange={handleInput} autoFocus={true} value={content} className='block w-full p-0 m-0 border-none bg-transparent' />}
			{!isEditing && <p onDoubleClick={handleDoubleClick} dangerouslySetInnerHTML={{ __html: content }}></p>}
		</div>
	);
}

export default Maker;
