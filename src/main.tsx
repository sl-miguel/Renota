import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import NoteProvider from './context/NoteContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<NoteProvider>
			<App />
		</NoteProvider>
	</React.StrictMode>
);
