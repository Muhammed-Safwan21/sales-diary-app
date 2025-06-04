import themes from '@/config/theme';
import { ThemeConfig, ThemeType } from '@/types';
import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  theme: ThemeConfig;
  themeType: ThemeType;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  themeType: 'dark',
  toggleTheme: () => {},
  setThemeType: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme() as ThemeType;
  // Always start with dark theme
  const [themeType, setThemeType] = useState<ThemeType>('dark');

  // Comment out or remove the useEffect if you want to ignore system theme
  // useEffect(() => {
  //   if (colorScheme) {
  //     setThemeType(colorScheme);
  //   }
  // }, [colorScheme]);

  const toggleTheme = () => {
    setThemeType((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const theme = themes[themeType];

  return (
    <ThemeContext.Provider
      value={{ theme, themeType, toggleTheme, setThemeType }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
