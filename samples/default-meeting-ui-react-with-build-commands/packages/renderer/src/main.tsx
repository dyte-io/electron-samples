import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@dytesdk/ui-kit/loader';
import App from './App';
import './styles/index.css';

const root = createRoot(document.getElementById('root')!);
defineCustomElements(window);
root.render(<App />);
window.removeLoading();
