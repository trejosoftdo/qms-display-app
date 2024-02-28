import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import AppLightTheme from '../theme';


/**
 * ConditionalContainerProps defines the props for the Conditional Container Component.
 */
interface ErrorMessageProps {}

/**
 * A component that display a general error message when an unexpected error occurrs
 *
 * @param {ErrorMessageProps} props - The props for the Error Message component.
 */
const ErrorMessage: React.FC<ErrorMessageProps> = (props: ErrorMessageProps) => {
  const { t } = useTranslation();
  return (
    <Text style={styles.message} variant="titleMedium">
      {t('translation:defaultErrorMessage')}
    </Text>
  );
};

const styles = StyleSheet.create({
  message: {
    color: AppLightTheme.colors.error,
    padding: 16,
    paddingBottom: 32,
    borderWidth: 1,
    borderColor: AppLightTheme.colors.error,
    backgroundColor: AppLightTheme.colors.tertiaryContainer,
    margin: 8,
    borderRadius: 5,
  },
});

export default ErrorMessage;
