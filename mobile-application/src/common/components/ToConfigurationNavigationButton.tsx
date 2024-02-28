import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { goToPath } from '../helpers';
import { CONFIGURATION_PATH } from '../constants';
import AppLightTheme from '../theme';

/**
 * ToConfigurationNavigationButtonProps defines the props for the To Configuration Navigation Button Component.
 */
interface ToConfigurationNavigationButtonProps {}

/**
 * A button that when clicked goes to configuration section
 *
 * @param {ToConfigurationNavigationButtonProps} props - The props for the To Configuration Navigation Button component.
 */
const ToConfigurationNavigationButton: FC<ToConfigurationNavigationButtonProps> = (props: ToConfigurationNavigationButtonProps) => (
  <IconButton
    icon="cog"
    iconColor={AppLightTheme.colors.background}
    size={20}
    onPress={() => {
      goToPath(CONFIGURATION_PATH);
    }}
  />
);


export default ToConfigurationNavigationButton;
