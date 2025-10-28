import { GoogleOAuthProvider } from '@react-oauth/google';
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
    <GoogleOAuthProvider clientId="1007200303137-g9lv9khro354fulr4ssoio3p8c8f31rl.apps.googleusercontent.com">
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
