import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as i18Mod from 'react-i18next';
import { TRANSLATION_ENGLISH_KEY } from '../../../common/translations/translation-keys';
import { LANGUAGES } from '../../../common/constants';
import LanguageView from '../';


describe('LanguageView component', () => {
  let changeLanguageSpy;

  beforeEach(() => {
    changeLanguageSpy = jest.spyOn(i18Mod.i18n, 'changeLanguage');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component as expected', () => {
    expect(renderShallow(<LanguageView />)).toMatchSnapshot();
    expect(changeLanguageSpy).toHaveBeenCalledTimes(0);
  });

  it('changes the language to the selected option', () => {
    const { getByText } = render(<LanguageView />);
    const element = getByText(`Translated[${TRANSLATION_ENGLISH_KEY}]({})`);
    fireEvent.press(element);
    expect(changeLanguageSpy).toHaveBeenCalledTimes(1);
    expect(changeLanguageSpy).toHaveBeenCalledWith(LANGUAGES.ENGLISH);
  });
});
