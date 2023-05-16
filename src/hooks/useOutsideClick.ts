import { useCallback, useEffect } from 'react';

const useOutsideClick = (callback: () => void, ref: React.RefObject<HTMLDivElement>) => {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		},
		[callback, ref]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [handleClickOutside]);
};

export default useOutsideClick;
