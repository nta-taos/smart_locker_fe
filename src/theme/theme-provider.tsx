import React, { ReactNode } from 'react';

import { ConfigProvider } from 'antd';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Gilroy', sans-serif",
          colorPrimary: '#f7832d',
        },
        components: {
          Button: {
            fontSizeSM: 12,
            fontSize: 14,
            fontSizeLG: 16,

            controlHeightSM: 24,
            controlHeight: 40,
            controlHeightLG: 46,

            borderRadiusSM: 24,
            borderRadiusLG: 8,
            borderRadius: 8,

            paddingInlineSM: 8,
            paddingInline: 20,
            paddingInlineLG: 20,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
