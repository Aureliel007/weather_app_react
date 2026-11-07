import { createHashRouter } from 'react-router-dom';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { Layout } from '@/pages/Layout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { WeatherPage } from '@/pages/WeatherPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'weather/:city', element: <WeatherPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
