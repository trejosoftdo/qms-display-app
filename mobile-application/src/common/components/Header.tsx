import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import icon from '../../../assets/icon.png';
import AppLightTheme from '../theme';

/**
 * HeaderProps defines the props for the Header Component.
 *
 * @property message - the message of the header
 */
interface HeaderProps {
  message: string;
}

/**
 * A component that display a general header for the views in the app
 *
 * @param {HeaderProps} props - The props for the Header component.
 */
const Header: React.FC<HeaderProps> = (props: HeaderProps) => (
  <View style={styles.container}>
    <Image source={icon} style={styles.icon}/>
    <Text style={styles.message} variant="titleMedium">
      {props.message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppLightTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 500,
  },
  icon: {
    width: 200 ,
    height: 200,
  },
  message: {
    color: AppLightTheme.colors.secondary,
    paddingBottom: 32,
    textAlign: 'justify'
  },
});

export default Header;
