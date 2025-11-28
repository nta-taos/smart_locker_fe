import usePush from './hooks/usePush';
import './index.css';
import './theme/theme.css';

Promise.all([import('@/root'), import('@/App')]).then(
  async ([{ default: render }, { default: App }]) => {
    render(App);

    // Register service worker and subscribe to push (best-effort)
    try {
      const { register } = usePush();
      await register();
    } catch {
      // ignore registration errors; it's a best-effort background capability
      // console.debug('push register failed', err)
    }
  },
);
