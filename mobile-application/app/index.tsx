import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { AppHeader, ToConfigurationNavigationButton } from '../src/common/components';
import { TurnsStatusTableView } from '../src/views';

/**
 * Home Screen Route
 */
const Home = () => (
  <React.Fragment>
    <AppHeader
      headerRight={ToConfigurationNavigationButton}
    />
    <TurnsStatusTableView />
  </React.Fragment>
);

export default Home;