// import React, { useRef, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useOnClickOutside } from 'usehooks-ts';
// import styles from './Header.module.scss';
// import { Avatar } from 'antd';
// import { MenuFoldOutlined} from '@ant-design/icons';
// /** Mock user theo yêu cầu */
// const mockUser = {
//   id: 1,
//   name: 'Lê Thành Quang',
//   email: 'thanhquangk2@gmail.com',
//   avatar: 'https://imgs.search.brave.com/u5vfF7-UrPhKy61PEMczDb54JURWFtr9Zl_QIFAKzjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sdW1p/ZXJlLWEuYWthbWFp/aGQubmV0L3YxL2lt/YWdlcy9udF9lbXBp/cmVhdmF0YXJzdWJz/Y3JpYmVyXzM5MF83/OTYyMzA1ZC5qcGVn/P3JlZ2lvbj0wLDAs/MTI1MCw2ODA',
// };
// const DashboardHeader: React.FC = () => {
//   const [openUser, setOpenUser] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const userRef = useRef<HTMLDivElement>(null!);
//   useOnClickOutside(userRef, () => setOpenUser(false));
//   return (
//     <header className={styles.header}>
//       {/* LOGO */}
//       <div className={styles.logo}></div>
//       {/* NAV */}
//       <div className={`${styles.center} ${menuOpen ? styles.open : ''}`}>
//         <nav className={styles.nav}>
//           <ul>
//             <li>
//               <NavLink
//                 to="/app"
//                 end
//                 className={({ isActive }) => (isActive ? styles.activeLink : '')}
//               >
//                 Trang chủ
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/app/lockers"
//                 className={({ isActive }) => (isActive ? styles.activeLink : '')}
//               >
//                 Tủ thông minh
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/app/orders"
//                 className={({ isActive }) => (isActive ? styles.activeLink : '')}
//               >
//                 Đơn hàng của tôi
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/app/profile"
//                 className={({ isActive }) => (isActive ? styles.activeLink : '')}
//               >
//                 Hồ sơ cá nhân
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       {/* ACTION */}
//       <div className={styles.right}>
//         <button className={styles.iconBtn} title="Thông báo">
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fill-rule="evenodd"
//               clip-rule="evenodd"
//               d="M10.5875 21.4125C10.9792 21.8042 11.45 22 12 22C12.55 22 13.0208 21.8042 13.4125 21.4125C13.8042 21.0208 14 20.55 14 20H10C10 20.55 10.1958 21.0208 10.5875 21.4125ZM4.2875 18.7125C4.47917 18.9042 4.71667 19 5 19H19C19.2833 19 19.5208 18.9042 19.7125 18.7125C19.9042 18.5208 20 18.2833 20 18C20 17.7167 19.9042 17.4792 19.7125 17.2875C19.5208 17.0958 19.2833 17 19 17H18V11C16.6167 11 15.4375 10.5125 14.4625 9.5375C13.4875 8.5625 13 7.38333 13 6C13 5.61667 13.0417 5.24167 13.125 4.875C13.2083 4.50833 13.3333 4.15833 13.5 3.825V3.5C13.5 3.08333 13.3542 2.72917 13.0625 2.4375C12.7708 2.14583 12.4167 2 12 2C11.5833 2 11.2292 2.14583 10.9375 2.4375C10.6458 2.72917 10.5 3.08333 10.5 3.5V4.2C9.16667 4.53333 8.08333 5.2375 7.25 6.3125C6.41667 7.3875 6 8.61667 6 10V17H5C4.71667 17 4.47917 17.0958 4.2875 17.2875C4.09583 17.4792 4 17.7167 4 18C4 18.2833 4.09583 18.5208 4.2875 18.7125Z"
//               fill="#002B79"
//             />
//             <path
//               d="M18 9C17.1667 9 16.4583 8.70833 15.875 8.125C15.2917 7.54167 15 6.83333 15 6C15 5.16667 15.2917 4.45833 15.875 3.875C16.4583 3.29167 17.1667 3 18 3C18.8333 3 19.5417 3.29167 20.125 3.875C20.7083 4.45833 21 5.16667 21 6C21 6.83333 20.7083 7.54167 20.125 8.125C19.5417 8.70833 18.8333 9 18 9Z"
//               fill="#002B79"
//             />
//           </svg>
//         </button>
//         {/* USE */}
//         <div ref={userRef} className={`${styles.user} ${openUser ? styles.open : ''}`}>
//           <Avatar
//             src={mockUser.avatar}
//             size={40}
//             alt={mockUser.name}
//           >
//             {mockUser.name.charAt(0)}
//           </Avatar>
//         </div>
//         <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
//           <MenuFoldOutlined style={{ fontSize: '24px', color: '#fff' }} />
//         </button>
//       </div>
//     </header>
//   );
// };
// export default DashboardHeader;
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { MenuFoldOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import styles from './Header.module.scss';

const mockUser = {
  id: 1,
  name: 'Lê Thành Quang',
  email: 'thanhquangk2@gmail.com',
  avatar:
    'https://imgs.search.brave.com/u5vfF7-UrPhKy61PEMczDb54JURWFtr9Zl_QIFAKzjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sdW1p/ZXJlLWEuYWthbWFp/aGQubmV0L3YxL2lt/YWdlcy9udF9lbXBp/cmVhdmF0YXJzdWJz/Y3JpYmVyXzM5MF83/OTYyMzA1ZC5qcGVn/P3JlZ2lvbj0wLDAs/MTI1MCw2ODA',
};

const DashboardHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}></div>

      {/* Menu desktop + mobile */}
      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              end
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/lockers"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Tủ thông minh
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Đơn hàng của tôi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Hồ sơ cá nhân
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <div className={styles.right}>
          <button className={styles.iconBtn} title="Thông báo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5875 21.4125C10.9792 21.8042 11.45 22 12 22C12.55 22 13.0208 21.8042 13.4125 21.4125C13.8042 21.0208 14 20.55 14 20H10C10 20.55 10.1958 21.0208 10.5875 21.4125ZM4.2875 18.7125C4.47917 18.9042 4.71667 19 5 19H19C19.2833 19 19.5208 18.9042 19.7125 18.7125C19.9042 18.5208 20 18.2833 20 18C20 17.7167 19.9042 17.4792 19.7125 17.2875C19.5208 17.0958 19.2833 17 19 17H18V11C16.6167 11 15.4375 10.5125 14.4625 9.5375C13.4875 8.5625 13 7.38333 13 6C13 5.61667 13.0417 5.24167 13.125 4.875C13.2083 4.50833 13.3333 4.15833 13.5 3.825V3.5C13.5 3.08333 13.3542 2.72917 13.0625 2.4375C12.7708 2.14583 12.4167 2 12 2C11.5833 2 11.2292 2.14583 10.9375 2.4375C10.6458 2.72917 10.5 3.08333 10.5 3.5V4.2C9.16667 4.53333 8.08333 5.2375 7.25 6.3125C6.41667 7.3875 6 8.61667 6 10V17H5C4.71667 17 4.47917 17.0958 4.2875 17.2875C4.09583 17.4792 4 17.7167 4 18C4 18.2833 4.09583 18.5208 4.2875 18.7125Z"
                fill="#002B79"
              />
              <path
                d="M18 9C17.1667 9 16.4583 8.70833 15.875 8.125C15.2917 7.54167 15 6.83333 15 6C15 5.16667 15.2917 4.45833 15.875 3.875C16.4583 3.29167 17.1667 3 18 3C18.8333 3 19.5417 3.29167 20.125 3.875C20.7083 4.45833 21 5.16667 21 6C21 6.83333 20.7083 7.54167 20.125 8.125C19.5417 8.70833 18.8333 9 18 9Z"
                fill="#002B79"
              />
            </svg>
          </button>
          {/* USE */}
          <div className={styles.user}>
            <Avatar src={mockUser.avatar} size={40} alt={mockUser.name}>
              {mockUser.name.charAt(0)}
            </Avatar>
          </div>
          {/* Icon toggle (mobile) */}
          <div className={styles.menuToggle} onClick={toggleMenu}>
            <MenuFoldOutlined />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
