import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import icon from '../../../assets/header-icon.png';
import AppLightTheme from '../theme';


/**
 * AppHeaderProps defines the props for the App Header Component.
 *
 * @property headerRight - a handler for the header right
 * @property title - header title
 */

type AppHeaderProps = {
  headerRight?: () => React.ReactNode;
};


/**
 * A component represents the application header
 *
 * @param {AppHeaderProps} props - The props for the App Header component.
 */
const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => (
  <Stack.Screen
    options={{
      title: (
        <Image source={icon} style={styles.icon} />
      ),
      headerStyle: {
        backgroundColor: AppLightTheme.colors.primary,
      },
      headerTitleStyle: {
        fontFamily: AppLightTheme.fonts.headlineLarge.fontFamily,
      },
      headerBackTitleStyle: {
        fontFamily: AppLightTheme.fonts.headlineLarge.fontFamily,
      },
      headerTintColor: AppLightTheme.colors.background,
      headerRight: props.headerRight,
    }}
  />
);

const styles = StyleSheet.create({
  icon: {
    height: 50,
    width: 119,
  },
});


export default AppHeader;