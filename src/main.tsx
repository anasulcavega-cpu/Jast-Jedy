import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGA } from './utils/analytics';

// Initialize Google Analytics 4 once
initGA();

// Register PWA Service Worker
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => {
        // Success
      })
      .catch((err) => {
        console.warn('PWA Service Worker registration warning:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
