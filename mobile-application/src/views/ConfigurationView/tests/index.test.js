import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { goToPath } from '../../../common/helpers';
import ConfigurationView from '../';
import { TRANSLATION_CONNECTION_KEY, TRANSLATION_INFORMATION_KEY, TRANSLATION_LANGUAGE_KEY } from '../../../common/translations/translation-keys';
import { CONFIG_OPTIONS } from '../../../common/constants';


jest.mock('../../../common/helpers');


describe('ConfigurationView component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected', () => {
    expect(renderShallow(<ConfigurationView />)).toMatchSnapshot();
    expect(goToPath).toHaveBeenCalledTimes(0);
  });

  it('navigates to information path when selecting that option', () => {
    const { getByText } = render(<ConfigurationView />);
    const element = getByText(`Translated[${TRANSLATION_INFORMATION_KEY}]({})`);

    fireEvent.press(element);

    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(
      `/${CONFIG_OPTIONS.INFORMATION}`
    );
  });

  it('navigates to connection path when selecting that option', () => {
    const { getByText } = render(<ConfigurationView />);
    const element = getByText(`Translated[${TRANSLATION_CONNECTION_KEY}]({})`);

    fireEvent.press(element);

    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(
      `/${CONFIG_OPTIONS.CONNECTION}`
    );
  });

  it('navigates to language path when selecting that option', () => {
    const { getByText } = render(<ConfigurationView />);
    const element = getByText(`Translated[${TRANSLATION_LANGUAGE_KEY}]({})`);

    fireEvent.press(element);

    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(
      `/${CONFIG_OPTIONS.LANGUAGE}`
    );
  });
});
