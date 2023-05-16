import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { Note, NoteContextType } from '../types/Note';

export const NoteContext = createContext<NoteContextType | null>(null);

const initialNotes = (): Note[] => {
	const notes = localStorage.getItem('notes');
	return notes ? JSON.parse(notes) : [];
};

const NoteProvider = ({ children }: PropsWithChildren) => {
	const [notes, setNotes] = useState<Note[]>(initialNotes);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	const saveNote = (newNote: Note) => {
		setNotes([newNote, ...notes]);
	};

	// const editNote = (id: string, updatedNote: Note) => {
	// 	setNotes((prev) => {
	// 		const updatedNotes = [...prev];
	// 		const noteIndex = updatedNotes.findIndex((note) => note.id === id);
	// 		if (noteIndex !== -1) {
	// 			updatedNotes[noteIndex] = updatedNote;
	// 		}
	// 		return updatedNotes;
	// 	});
	// };
	const editNote = (id: string, updatedNote: Note) => {
		console.log('Editing..', updatedNote);

		setNotes((prev) => {
			return prev.map((note) => (note.id === id ? updatedNote : note));
		});
	};

	return <NoteContext.Provider value={{ notes, saveNote, editNote, setNotes }}>{children}</NoteContext.Provider>;
};

export default NoteProvider;
