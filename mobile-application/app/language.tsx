import * as React from 'react';
import { Stack } from 'expo-router';
import { AppHeader } from '../src/common/components';
import { LanguageView } from '../src/views';


/**
 * Language Screen Route
 */
const Language = () => (
  <React.Fragment>
    <AppHeader />
    <LanguageView />
  </React.Fragment>
);

export default Language;
