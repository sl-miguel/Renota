import { useEffect } from 'react';

const useKeyPress = (targetKey: string, onKeyDown: () => void, deps: any[] = []) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === targetKey) onKeyDown();
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, deps);
};

export default useKeyPress;
