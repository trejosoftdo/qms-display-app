import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_CATEGORIES_KEY } from '../src/common/translations/translation-keys';
import AppLightTheme from '../src/common/theme';
import { AppHeader } from '../src/common/components';
import { ChooseCategoriesView } from '../src/views';


/**
 * Categories Screen Route
 */
const Categories = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <AppHeader title={t(TRANSLATION_CATEGORIES_KEY)} />
      <ChooseCategoriesView />
    </React.Fragment>
  );
};

export default Categories;