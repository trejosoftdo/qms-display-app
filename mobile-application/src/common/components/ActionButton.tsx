import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

/**
 * ActionButtonProps defines the props for the Action Button Component.
 *
 * @property onPress - a handler for the on press event
 * @property message - the button display message
 * @property icon - the button icon
 */
interface ActionButtonProps {
  onPress: () => void;
  message: string;
  icon: string;
}

/**
 * A component that displays a button with icon
 *
 * @param {ActionButtonProps} props - The props for the Action Button component.
 */
const ActionButton: FC<ActionButtonProps> = (props: ActionButtonProps) => (
  <Button
    style={styles.container}
    labelStyle={styles.label}
    mode="contained"
    onPress={props.onPress}
    icon={props.icon}
  >
    {props.message}
  </Button>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    lineHeight: 24
  },
});

export default ActionButton;
