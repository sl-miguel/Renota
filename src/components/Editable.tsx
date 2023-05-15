interface EditableProps {
	placeholder: string;
	order: number;
	content: string;
	setContent: (text: string) => void;
}

function Editable({ content, setContent, placeholder, order }: EditableProps) {
	return (
		<div className='relative'>
			<div
				onInput={(event) => setContent(event.currentTarget.innerHTML || '')}
				className={`p-4 top-0 w-full focus-visible:outline-none ${content ? 'static' : 'absolute'}`}
				contentEditable='true'
				aria-multiline='true'
				role='textbox'
				tabIndex={order}
				aria-label={placeholder}></div>
			<div className={`text-dark-700 p-4 ${content ? 'hidden' : 'block'}`}>{placeholder}</div>
		</div>
	);
}

export default Editable;
