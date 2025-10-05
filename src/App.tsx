import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { initSocket } from './socket';
import { useSocketListener } from './socket/useSocketListener';
import { ThemeProvider } from './theme/theme-provider';

function App() {
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('auth') || '{}')?.token;
    if (token) initSocket(token);
  }, []);

  useSocketListener();

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
