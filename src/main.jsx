import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/animations.css';
import App from './App.jsx';
import { BackgroundOrbs } from './components/ui/BackgroundOrbs';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BackgroundOrbs />
    <App />
  </StrictMode>,
);
