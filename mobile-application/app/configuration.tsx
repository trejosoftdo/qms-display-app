import * as React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_CONFIGURATION_KEY } from '../src/common/translations/translation-keys';
import { AppHeader } from '../src/common/components';
import { ConfigurationView } from '../src/views';

/**
 * Configuration Screen Route
 */
const Configuration = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <AppHeader title={t(TRANSLATION_CONFIGURATION_KEY)} />
      <ConfigurationView />
    </React.Fragment>
  );
};

export default Configuration;
