import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppLightTheme from '../theme';
import Header from './Header';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';


/**
 * AppViewProps defines the props for the App View Component.
 *
 * @property headerMessage - the header display message
 * @property children - the view contained children
 * @property loading - to show the loading indicator
 * @property error - to show a error message
 */
interface AppViewProps {
  headerMessage: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: Error;
}

/**
 * A component that represents the application general view
 *
 * @param {AppViewProps} props - The props for the App View component.
 */
const AppView: React.FC<AppViewProps> = (props: AppViewProps) => (
  <View style={styles.container}>
    <Header message={props.headerMessage} />
    {props.loading && <LoadingIndicator loading={props.loading} />}
    {props.children}
    {props.error && <ErrorMessage />}
    <StatusBar style="auto" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppLightTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    paddingHorizontal: 24,
  },
});

export default AppView;