import * as React from 'react';
import { Stack } from 'expo-router/stack';
import { PaperProvider } from 'react-native-paper';
import AppLightTheme from '../src/common/theme';
import useCustomFonts from '../src/hooks/useCustomFonts';
import initTranslations from '../i18n';


initTranslations();

/**
 * Screens layout
 *
 */
const Layout = () => {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }
  

  return (
    <PaperProvider theme={AppLightTheme}>
      <Stack />
    </PaperProvider>
  );
};

export default Layout;
