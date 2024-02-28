import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import AppLightTheme from '../theme';

/**
 * ValueProps defines the props for the Value Component.
 *
 * @property icon - icon to display
 * @property value - value to display
 */
interface ValueProps {
  icon: string;
  value: string;
}


/**
 * A component that represents a value with icon
 *
 * @param {ValueProps} props - The props for the Value component.
 */
const Value: FC<ValueProps> = (props: ValueProps) => (
  <View style={styles.container}>
    <Avatar.Icon style={styles.icon} icon={props.icon} /> 
    <Text style={styles.number} variant="headlineLarge">
      {props.value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppLightTheme.colors.outline,
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
    width: '80%',
    maxWidth: 280,
  },
  icon: {
    backgroundColor: AppLightTheme.colors.primary,
  },
  number: {
    color: AppLightTheme.colors.secondary,
    fontWeight: '600',
    paddingTop: 12,
  },
});

export default Value;
