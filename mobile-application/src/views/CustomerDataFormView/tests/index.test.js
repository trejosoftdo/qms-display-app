import React from 'react';
import { act } from '@testing-library/react-hooks';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CATEGORIES_PATH } from '../../../common/constants';
import { goToPath } from '../../../common/helpers';
import CustomerDataFormView from '../';


jest.mock('../../../common/helpers');

describe('CustomerDataFormView component', () => {
  const mockCustomerName = 'mock-customer-name';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component as expected', () => {
    expect(renderShallow(<CustomerDataFormView />)).toMatchSnapshot();
    expect(goToPath).toHaveBeenCalledTimes(0);
  });

  it('changes the language to the selected option', async () => {
    const { getByTestId } = render(<CustomerDataFormView />);
    
    const input = getByTestId('text-input-flat');
    const submitButton = getByTestId('button');
    
    await act(async () => {
      fireEvent.changeText(input, mockCustomerName);

      await waitFor(() => {
        expect(input.props.value).toEqual(mockCustomerName);
      });

      fireEvent.press(submitButton);
    });

    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(CATEGORIES_PATH, { customerName: mockCustomerName });
  });
});
