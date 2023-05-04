import { useContext, useEffect, useRef, useState } from 'react';
import Editable from './Editable';
import Icon from './icons';
import { NoteContext } from '../context/NoteContext';
import { Note, NoteContextType } from '../types/Note';
import { uid } from '../utils/uid';
import { random } from '../utils/random';
import { colors } from '../utils/constants';

function Search() {
	const { saveNote } = useContext(NoteContext) as NoteContextType;

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [previousColor, setPreviousColor] = useState<string | undefined>(undefined);

	const [resetKey, setResetKey] = useState(0);

	const [focus, setFocus] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleOutside);
		return () => document.removeEventListener('mousedown', handleOutside);
	}, []);

	const handleOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) setFocus(false);
	};

	const expand = () => {
		if (!focus) setFocus(true);
	};

	const submitData = () => {
		if (!title && !content) return resetForm();

		const availableColors = colors.filter((color) => color !== previousColor);
		const color = random(availableColors);
		setPreviousColor(color);

		const newNote: Note = {
			id: uid(),
			title,
			content,
			color,
		};

		saveNote(newNote);
		resetForm();
	};

	const resetForm = () => {
		setTitle('');
		setContent('');
		setFocus(false);
		setResetKey((prev) => (prev += 1));
	};

	return (
		<div key={resetKey} ref={ref} className='flex flex-col-reverse bg-dark-900 border border-dark-800 rounded-xl max-w-4xl mx-auto'>
			<div className='relative' onFocus={expand}>
				<Editable content={content} setContent={setContent} placeholder='New Note..' order={1} />
				<div onClick={submitData} className='shake | absolute right-0 top-0 bottom-0 flex justify-center items-center pr-4 cursor-pointer'>
					<Icon name='send' size={20} />
				</div>
			</div>
			<div className={focus ? 'block' : 'hidden'}>
				<Editable content={title} setContent={setTitle} placeholder='Title' order={2} />
			</div>
		</div>
	);
}

export default Search;
