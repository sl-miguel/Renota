import { useContext, useState } from 'react';
import Tooltip from './Tooltip';
import Icon from './icons';
import { NoteContext } from '../context/NoteContext';
import { NoteContextType } from '../types/Note';
import Maker from './Maker';

interface NoteProps {
	note: {
		id: string;
		title: string;
		content: string;
		color: string;
	};
	handleColor: (id: string, color: string) => void;
}

function Note({ note, handleColor }: NoteProps) {
	const [animation, setAnimation] = useState(false);
	const { setNotes } = useContext(NoteContext) as NoteContextType;

	const handleDelete = () => {
		setAnimation(true);

		setTimeout(() => {
			setNotes((prev) => prev.filter((n) => n.id !== note.id));
		}, 1000);
	};

	const handleSave = (text: string) => {
		console.log('Handling save..', text);
	};

	return (
		<div
			className={`card relative ${animation ? 'fall' : 'landing'} break-inside-avoid-column mb-4 p-4 rounded-xl bg-dark-900 border border-dark-800`}
			style={{ background: note.color }}>
			{note.title && (
				<h3 className='text-xl my-2 font-semibold'>
					<Maker text={note.title} save={handleSave} />
				</h3>
			)}
			{note.content && <Maker text={note.content} save={handleSave} />}
			<div className='flex justify-end gap-3 pt-4'>
				<div>
					<Tooltip handleClick={handleColor} noteId={note.id} usedColor={note.color} />
				</div>
				<div onClick={handleDelete} className='shake flex items-center justify-center cursor-pointer'>
					<Icon name='bin' size={20} />
				</div>
			</div>
		</div>
	);
}

export default Note;
