import { useContext } from 'react';
import Search from './components/Search';
import Note from './components/Note';
import { NoteContext } from './context/NoteContext';
import { NoteContextType } from './types/Note';
import Logo from './components/Logo';
import { randomizedNote } from './utils/randomized-note';

function App() {
	const { notes, saveNote, setNotes } = useContext(NoteContext) as NoteContextType;

	const handleColor = (id: string, color: string) => {
		console.log('Handling Colors');
		setNotes((previous) => previous.map((note) => (note.id === id ? { ...note, color } : note)));
	};

	const debugNote = () => {
		const note = randomizedNote(notes);
		saveNote(note);
	};

	return (
		<div className=' mx-auto w-[97%]'>
			<div className='my-10'>
				<div className='flex flex-col items-center mb-6 cursor-pointer'>
					<div onClick={debugNote} className='shake'>
						<Logo size={170} />
					</div>
				</div>
				<Search />
			</div>
			<div className='columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-4 py-4'>
				{notes.map((note) => (
					<Note key={note.id} note={note} handleColor={handleColor} />
				))}
			</div>
		</div>
	);
}

export default App;
