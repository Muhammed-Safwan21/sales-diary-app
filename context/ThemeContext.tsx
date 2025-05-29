import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeType, ThemeConfig } from '@/types';
import themes from '@/config/theme';

interface ThemeContextType {
  theme: ThemeConfig;
  themeType: ThemeType;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  themeType: 'light',
  toggleTheme: () => {},
  setThemeType: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme() as ThemeType;
  const [themeType, setThemeType] = useState<ThemeType>(colorScheme || 'light');

  useEffect(() => {
    // Update theme when system theme changes
    if (colorScheme) {
      setThemeType(colorScheme);
    }
  }, [colorScheme]);

  const toggleTheme = () => {
    setThemeType(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const theme = themes[themeType];

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme, setThemeType }}>
      {children}
    </ThemeContext.Provider>
  );
};