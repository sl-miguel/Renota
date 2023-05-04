import { useContext, useEffect, useRef, useState } from 'react';
import Editable from './Editable';
import Icon from './icons';
import { NoteContext } from '../context/NoteContext';
import { Note, NoteContextType } from '../types/Note';
import Tooltip from './Tooltip';

function Search() {
	const { setNotes } = useContext(NoteContext) as NoteContextType;

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [color, setColor] = useState('');
	const [resetKey, setResetKey] = useState(0);

	const [focus, setFocus] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleOutside);
		return () => document.removeEventListener('mousedown', handleOutside);
	}, []);

	const handleOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setFocus(false);
		}
	};

	const expand = () => {
		if (!focus) setFocus(true);
	};

	const submitData = () => {
		console.log('Submiting data..');
		if (!title && !content) return resetForm();

		const newNote: Note = {
			id: Date.now(),
			title,
			content,
			color,
		};

		setNotes((prev) => [...prev, newNote]);
		resetForm();
	};

	const resetForm = () => {
		setTitle('');
		setContent('');
		setColor('');
		setResetKey((prev) => (prev += 1));
	};

	const handleColor = (_id: number, color: string) => {
		setColor(color);
	};

	console.log(title, content, color);

	return (
		<div key={resetKey} ref={ref} className='flex flex-col-reverse bg-dark-900 border border-dark-800 rounded-xl max-w-4xl mx-auto'>
			<div className={`p-4 flex items-center justify-end gap-4 ${focus ? 'block' : 'hidden'}`}>
				<div>
					<Tooltip noteId={0} handleClick={handleColor} />
				</div>
				<div onClick={submitData}>
					<Icon name='send' size={20} />
				</div>
			</div>
			<div onFocus={expand}>
				<Editable content={content} setContent={setContent} placeholder='New Note..' order={1} />
			</div>
			<div className={focus ? 'block' : 'hidden'}>
				<Editable content={title} setContent={setTitle} placeholder='Title' order={2} />
			</div>
		</div>
	);
}

export default Search;
