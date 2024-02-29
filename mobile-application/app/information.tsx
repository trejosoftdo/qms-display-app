import * as React from 'react';
import { Stack } from 'expo-router';
import { AppHeader } from '../src/common/components';
import { InformationView } from '../src/views';

/**
 * Information Screen Route
 */
const Information = () => (
  <React.Fragment>
      <AppHeader />
    <InformationView />
  </React.Fragment>
);

export default Information;
