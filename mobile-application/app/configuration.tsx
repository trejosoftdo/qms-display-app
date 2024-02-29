import * as React from 'react';
import { Stack } from 'expo-router';
import { AppHeader } from '../src/common/components';
import { ConfigurationView } from '../src/views';

/**
 * Configuration Screen Route
 */
const Configuration = () => (
  <React.Fragment>
      <AppHeader />
    <ConfigurationView />
  </React.Fragment>
);

export default Configuration;
