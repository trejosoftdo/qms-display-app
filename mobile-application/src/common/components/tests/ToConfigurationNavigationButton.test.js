import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ToConfigurationNavigationButton from '../ToConfigurationNavigationButton';
import { goToPath } from '../../helpers';
import { CONFIGURATION_PATH } from '../../constants';


jest.mock('../../helpers');

describe('ToConfigurationNavigationButton component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<ToConfigurationNavigationButton />)).toMatchSnapshot();
  });

  it('moves to configuration path when being clicked', () => {
    const { getByRole } = render(<ToConfigurationNavigationButton />);
    const element = getByRole('button');
    fireEvent.press(element);
    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(CONFIGURATION_PATH);
  });
});
