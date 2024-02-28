import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import ActionButton from '../../common/components/ActionButton';
import AppLightTheme from '../../common/theme';
import { EMPTY_VALUE } from '../../common/constants';
import { TRANSLATION_APPLICATION_KEY, TRANSLATION_CONNECT_KEY } from '../../common/translations/translation-keys';


/**
 * ConnectFormProps defines the props for the Connect Form Component.
 *
 * @property onSubmit - form on submit handler
 */
interface ConnectFormProps {
  onSubmit: (applicationId: string) => void;
}

/**
 * A component a connect form
 *
 * @param {ConnectFormProps} props - The props for the Connect Form component.
 */
const ConnectForm: React.FC<ConnectFormProps> = (props: ConnectFormProps) => {
  const { t } = useTranslation();
  const [applicationId, setApplicationId] = React.useState(EMPTY_VALUE);
  return (
    <Card style={styles.container} mode="outlined">
      <Card.Content>
        <TextInput
          style={styles.input}
          label={t(TRANSLATION_APPLICATION_KEY)}
          value={applicationId}
          onChangeText={text => setApplicationId(text)}
          mode="flat"
          left={<TextInput.Icon icon="application-brackets-outline" />}
        />
      </Card.Content>
      <Card.Actions style={styles.action}>
        <ActionButton
          icon="connection"
          message={t(TRANSLATION_CONNECT_KEY)}
          onPress={() => {
            props.onSubmit(applicationId);
          }}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: AppLightTheme.colors.background,
  },
  action: {
    marginBottom: 10,
    marginTop: 10,
    paddingRight: 16,
  },
  input: {
    backgroundColor: AppLightTheme.colors.background,
  }
});


export default ConnectForm;