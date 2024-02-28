import * as React from 'react';
import { RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_ENGLISH_KEY, TRANSLATION_LANGUAGE_MESSAGE_KEY, TRANSLATION_SPANISH_KEY } from '../../common/translations/translation-keys';
import { AppView } from '../../common/components';
import { LANGUAGES } from '../../common/constants';

/**
 * LanguageViewViewProps defines the props for the LanguageView View Component.
 */
interface LanguageViewViewProps {}

/**
 * A component for the LanguageView view
 *
 * @param {LanguageViewViewProps} props - The props for the LanguageView View component.
 */
const LanguageViewView: React.FC<LanguageViewViewProps> = (props: LanguageViewViewProps) => {
  const { t, i18n } = useTranslation();
  return (
    <AppView headerMessage={t(TRANSLATION_LANGUAGE_MESSAGE_KEY)}>
      <RadioButton.Group
        onValueChange={newLanguage => i18n.changeLanguage(newLanguage)}
        value={i18n.language}
      >
        <RadioButton.Item label={t(TRANSLATION_SPANISH_KEY)} value={LANGUAGES.SPANISH} />
        <RadioButton.Item label={t(TRANSLATION_ENGLISH_KEY)} value={LANGUAGES.ENGLISH} />
      </RadioButton.Group>
    </AppView>
  );
};


export default LanguageViewView;