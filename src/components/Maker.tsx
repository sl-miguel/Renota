import { ChangeEvent, useRef, useState } from 'react';
import useKeyPress from '../hooks/useKeyPress';
import useOutsideClick from '../hooks/useOutsideClick';
import SizableArea from './SizableArea';

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

	const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		console.log('Handling input', event.target.value);
		setContent(event.target.value);
	};

	return (
		<div ref={ref}>
			{isEditing && <SizableArea text={content} handleChange={handleInput} />}
			{/* {isEditing && <textarea className='max-w-full text-black' value={content} onChange={handleInput}></textarea>} */}
			{/* {isEditing && <input onChange={handleInput} autoFocus={true} value={content} className='block w-full p-0 m-0 border-none bg-transparent' />} */}
			{/* {!isEditing && <p onDoubleClick={handleDoubleClick} dangerouslySetInnerHTML={{ __html: content }}></p>} */}
			{!isEditing && <p onDoubleClick={handleDoubleClick}>{content}</p>}
		</div>
	);
}

export default Maker;
