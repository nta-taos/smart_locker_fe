# Smart Locker Frontend (PWA)

A modern user interface for the Smart Locker management system, built as a Progressive Web Application (PWA) to provide a seamless mobile-like experience on any browser.

## 1. Project Overview
This is a **Modern React PWA**, designed to serve:
*   **End-users:** For booking lockers, renting storage, and tracking orders.
*   **Shippers:** For receiving and fulfilling pickup/delivery orders at lockers.
*   **Admins:** For managing locker infrastructure, floor distribution, and slot allocation.

## 2. Tech Stack

### Core
*   **React 18**: The main UI library.
*   **Vite**: A lightning-fast build tool replacing Create React App (CRA).
*   **TypeScript**: Ensures type safety and improves maintainability.

### UI & Styling
*   **Ant Design (antd)**: A comprehensive UI component library for high-standard forms and management features.
*   **Framer Motion**: A powerful library for high-performance and smooth UI animations.
*   **Sass (SCSS)**: CSS pre-processor for modular and flexible style management.
*   **React Icons**: Extensive icon library.

### State & Logic
*   **Recoil**: Lightweight state management for shared data across components.
*   **React Router Dom**: Client-side routing for multi-page navigation.
*   **Axios**: HTTP client for communicating with the Backend API.
*   **Socket.IO Client**: Real-time connectivity to receive live locker status updates (Open/Closed).
*   **Dayjs**: Modern date and time manipulation utility.

### Maps & Data Visualization
*   **React Leaflet**: Map integration for displaying locker locations.
*   **Recharts**: Data visualization for usage reports and revenue statistics.
*   **Vite Plugin PWA**: Configures Service Workers to enable "Add to Home Screen" functionality.

## 3. Directory Structure (src/)

*   `src/api`: Axios instance and API call services (Auth, Lockers, Orders).
*   `src/components`: Reusable UI components (Locker Flow, Layouts, Common).
*   `src/pages`: Main application screens (Home, Order History, Profiles, etc.).
*   `src/recoil`: Global state atom and selector definitions.
*   `src/routes`: Application routing configuration and protected routes.
*   `src/socket`: Socket.IO client configuration and event listeners.
*   `src/hooks`: Custom React hooks for business logic and state.
*   `src/assets`: Static assets like images, icons, and SVG files.
*   `src/styles`: Global SCSS mixins, variables, and common styles.
*   `src/utils`: Helper functions and shared utility methods.
*   `src/types`: TypeScript interface and type definitions.
*   `src/theme`: Ant Design theme customization and color palettes.

## 4. Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Starts the application in development mode (localhost). |
| `pnpm run build` | Compiles the application for production deployment. |
| `pnpm run preview` | Previews the build output locally. |
| `pnpm run prettier:fix` | Automatically formats the code for consistency. |
| `pnpm run lint:fix` | Checks and fixes code quality and linting issues. |

## 5. Getting Started

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment Configuration:**
   Copy `.env.example` to create a new `.env` file and update the Backend API URL.

3. **Launch the Application:**
   ```bash
   pnpm run dev
   ```
