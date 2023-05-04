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

	const updateNote = (id: number) => {
		notes.filter((note: Note) => {
			if (note.id === id) {
				note.color = 'red';
				setNotes([...notes]);
			}
		});

		setNotes([...notes]);
	};

	return <NoteContext.Provider value={{ notes, saveNote, updateNote, setNotes }}>{children}</NoteContext.Provider>;
};

export default NoteProvider;
