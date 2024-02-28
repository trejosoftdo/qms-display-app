import * as React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_INFORMATION_KEY } from '../src/common/translations/translation-keys';
import { AppHeader } from '../src/common/components';
import { InformationView } from '../src/views';

/**
 * Information Screen Route
 */
const Information = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <AppHeader title={t(TRANSLATION_INFORMATION_KEY)} />
      <InformationView />
    </React.Fragment>
  );
};

export default Information;
