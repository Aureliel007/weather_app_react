import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Не найден элемент #root для монтирования приложения');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
