import React from 'react';
import { Outlet } from 'react-router-dom';

// import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
