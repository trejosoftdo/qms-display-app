import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_SERVICES_KEY } from '../src/common/translations/translation-keys';
import { AppHeader } from '../src/common/components';
import AppLightTheme from '../src/common/theme';
import { ChooseServicesView } from '../src/views';

/**
 * Services Screen Route
 */
const Services = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <AppHeader title={t(TRANSLATION_SERVICES_KEY)} />
      <ChooseServicesView />
    </React.Fragment>
  );
};

export default Services;