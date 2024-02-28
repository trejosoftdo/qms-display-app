import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TRANSLATION_CONNECTION_KEY, TRANSLATION_INFORMATION_KEY, TRANSLATION_LANGUAGE_KEY } from '../../../common/translations/translation-keys';
import { CONFIG_OPTIONS } from '../../../common/constants';
import Options from '../Options';



describe('Options component', () => {
  const mockProps = {
    onOptionSelect: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected', () => {
    expect(renderShallow(<Options {...mockProps} />)).toMatchSnapshot();
    expect(mockProps.onOptionSelect).toHaveBeenCalledTimes(0);
  });

  it('calls the onOptionSelect handler with information option when selecting it', () => {
    const { getByText } = render(<Options {...mockProps} />);
    const element = getByText(`Translated[${TRANSLATION_INFORMATION_KEY}]({})`);

    fireEvent.press(element);

    expect(mockProps.onOptionSelect).toHaveBeenCalledTimes(1);
    expect(mockProps.onOptionSelect).toHaveBeenCalledWith(CONFIG_OPTIONS.INFORMATION);
  });

  it('calls the onOptionSelect handler with connection option when selecting it', () => {
    const { getByText } = render(<Options {...mockProps} />);
    const element = getByText(`Translated[${TRANSLATION_CONNECTION_KEY}]({})`);

    fireEvent.press(element);

    expect(mockProps.onOptionSelect).toHaveBeenCalledTimes(1);
    expect(mockProps.onOptionSelect).toHaveBeenCalledWith(CONFIG_OPTIONS.CONNECTION);
  });

  it('calls the onOptionSelect handler with language option when selecting it', () => {
    const { getByText } = render(<Options {...mockProps} />);
    const element = getByText(`Translated[${TRANSLATION_LANGUAGE_KEY}]({})`);

    fireEvent.press(element);

    expect(mockProps.onOptionSelect).toHaveBeenCalledTimes(1);
    expect(mockProps.onOptionSelect).toHaveBeenCalledWith(CONFIG_OPTIONS.LANGUAGE);
  });
});
