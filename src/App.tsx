import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { initSocket } from './socket';
import { useSocketListener } from './socket/useSocketListener';
import { ThemeProvider } from './theme/theme-provider';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('auth') || '{}')?.token;
    if (token) initSocket(token);
  }, []);

  useSocketListener();

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
