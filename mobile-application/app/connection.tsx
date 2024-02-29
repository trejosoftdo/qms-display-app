import * as React from 'react';
import { Stack } from 'expo-router';
import { AppHeader } from '../src/common/components';
import { ConnectionView } from '../src/views';


/**
 * Connection Screen Route
 */
const Connection = () => (
  <React.Fragment>
      <AppHeader />
    <ConnectionView />
  </React.Fragment>
);

export default Connection;
