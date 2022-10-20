import {createContext} from 'react';

export interface Theme {
  type: 'dark' | 'light';
  backgorundColor: string;
  primaryColor: string;
  setTheme?: (theme: Theme) => void;
}

export const darkTheme = {
  type: 'dark' as const,
  backgorundColor: '#FFF',
  primaryColor: '#F00',
};

export const lightTheme = {
  type: 'light' as const,
  backgorundColor: '#FFF',
  primaryColor: '#F00',
};

export const ThemeContext = createContext<Theme>(lightTheme);
