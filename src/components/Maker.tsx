import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

interface MakerProps {
	text: string;
	keyName: string;
	save: (content: string, key: string) => void;
}

function Maker({ text, keyName, save }: MakerProps) {
	const ref = useRef<HTMLDivElement>(null);

	const [content, setContent] = useState(text);
	const [isEditing, setIsEditing] = useState(false);

	const handleSave = useCallback(() => {
		setIsEditing(false);
		save(content, keyName);
	}, [content, save]);

	useEffect(() => {
		if (!isEditing) return;
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				console.log('Handling save..', content);
				setIsEditing(false);
				save(content, keyName);
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [content, isEditing, keyName, save]);

	useEffect(() => {
		document.addEventListener('mousedown', handleOutside);
		return () => document.removeEventListener('mousedown', handleOutside);
	}, []);

	useEffect(() => {
		if (isEditing) return;
		handleSave();
	}, [isEditing, handleSave]);

	const handleOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsEditing(false);
		}
	};

	const handleInput = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			console.log('Handling input', event.target.value);
			setContent(event.target.value);
		},
		[setContent]
	);

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	return (
		<div ref={ref}>
			{isEditing && <input onChange={handleInput} value={content} className='block w-full p-0 m-0 border-none bg-transparent' />}
			{!isEditing && <p onDoubleClick={handleDoubleClick} dangerouslySetInnerHTML={{ __html: content }}></p>}
		</div>
	);
}

export default Maker;
