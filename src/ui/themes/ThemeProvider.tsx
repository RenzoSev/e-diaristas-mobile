import React from 'react';
import AppTheme from './app-theme';
import { Provider as PapaerProvider } from 'react-native-paper';
import { ThemeProvider as EmotionProvider } from '@emotion/react';

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <EmotionProvider theme={AppTheme}>
      <PapaerProvider theme={AppTheme}>{children}</PapaerProvider>
    </EmotionProvider>
  );
};

export default ThemeProvider;
