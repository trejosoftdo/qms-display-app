import * as React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_CONNECTION_KEY } from '../src/common/translations/translation-keys';
import { AppHeader } from '../src/common/components';
import { ConnectionView } from '../src/views';


/**
 * Connection Screen Route
 */
const Connection = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <AppHeader title={t(TRANSLATION_CONNECTION_KEY)} />
      <ConnectionView />
    </React.Fragment>
  );
};

export default Connection;
