import * as React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_LANGUAGE_KEY } from '../src/common/translations/translation-keys';
import { AppHeader } from '../src/common/components';
import { LanguageView } from '../src/views';


/**
 * Language Screen Route
 */
const Language = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <AppHeader title={t(TRANSLATION_LANGUAGE_KEY)} />
      <LanguageView />
    </React.Fragment>
  );
};

export default Language;
