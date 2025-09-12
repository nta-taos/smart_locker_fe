import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <App />
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </RecoilRoot>
    </StrictMode>,
  );
}

export default render;
