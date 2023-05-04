import { Note } from '../types/Note';
import { uid } from './uid';
import { random } from './random';
import { colors, contents, titles } from './constants';

let previousColor: string | undefined;

const randomizedNote = (notes: Note[]) => {
	const availableColors = colors.filter((color) => color !== previousColor);
	const color = random(availableColors);
	previousColor = color;

	const note: Note = {
		id: uid(),
		title: `${notes.length + 1}. ${random(titles)}`,
		content: random(contents),
		color,
	};

	return note;
};

export { randomizedNote };
