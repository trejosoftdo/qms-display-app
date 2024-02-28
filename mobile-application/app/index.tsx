import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_CUSTOMER_DATA_KEY } from '../src/common/translations/translation-keys';
import { AppHeader, ToConfigurationNavigationButton } from '../src/common/components';
import { CustomerDataFormView } from '../src/views';

/**
 * Home Screen Route
 */
const Home = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <AppHeader
        title={t(TRANSLATION_CUSTOMER_DATA_KEY)}
        headerRight={ToConfigurationNavigationButton}
      />
      <CustomerDataFormView />
    </React.Fragment>
  );
};

export default Home;