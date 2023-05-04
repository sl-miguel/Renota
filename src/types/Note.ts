import { Dispatch, SetStateAction } from 'react';

export interface Note {
	id: number;
	title: string;
	content: string;
	color: string;
}

export type NoteContextType = {
	notes: Note[];
	saveNote: (note: Note) => void;
	updateNote: (id: number) => void;
	setNotes: Dispatch<SetStateAction<Note[]>>;
};
