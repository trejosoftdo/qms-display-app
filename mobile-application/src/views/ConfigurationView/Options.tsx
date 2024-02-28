
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { CONFIG_OPTIONS } from '../../common/constants';
import { TRANSLATION_CONNECTION_KEY, TRANSLATION_INFORMATION_KEY, TRANSLATION_LANGUAGE_KEY, TRANSLATION_OPTIONS_KEY } from '../../common/translations/translation-keys';
import Option from './Option';

/**
 * OptionsProps defines the props for the Options Component.
 *
 * @property onOptionSelect - option selection handler
 */
interface OptionsProps {
  onOptionSelect: (name: string) => void;
};

/**
 * A component a configuration options
 *
 * @param {OptionsProps} props - The props for the Options component.
 */
const Options: React.FC<OptionsProps> = (props: OptionsProps) => {
  const { t } = useTranslation();
  return (
    <List.Section style={styles.container}>
      <List.Subheader>{t(TRANSLATION_OPTIONS_KEY)}</List.Subheader>
      <Option
        title={t(TRANSLATION_INFORMATION_KEY)}
        icon="information"
        onPress={() => props.onOptionSelect(CONFIG_OPTIONS.INFORMATION)}
      />
      <Option
        title={t(TRANSLATION_CONNECTION_KEY)}
        icon="connection"
        onPress={() => props.onOptionSelect(CONFIG_OPTIONS.CONNECTION)}
      />
      <Option
        title={t(TRANSLATION_LANGUAGE_KEY)}
        icon="translate"
        onPress={() => props.onOptionSelect(CONFIG_OPTIONS.LANGUAGE)}
      />
    </List.Section>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
  },
});

export default Options;