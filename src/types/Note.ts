import { Dispatch, SetStateAction } from 'react';

export interface Note {
	id: string;
	title: string;
	content: string;
	color: string;
}

export type NoteContextType = {
	notes: Note[];
	saveNote: (note: Note) => void;
	editNote: (id: string, updatedNote: Note) => void;
	setNotes: Dispatch<SetStateAction<Note[]>>;
};
