import React from 'react';
import { act } from '@testing-library/react-hooks';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CustomerDataForm from '../CustomerDataForm';


describe('CustomerDataForm component', () => {
  const mockCustomerName = 'mock-customer-name';
  const mockProps = {
    onSubmit: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component as expected', () => {
    expect(renderShallow(<CustomerDataForm {...mockProps} />)).toMatchSnapshot();
    expect(mockProps.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('changes the language to the selected option', async () => {
    const { getByTestId } = render(<CustomerDataForm {...mockProps} />);
    
    const input = getByTestId('text-input-flat');
    const submitButton = getByTestId('button');
    
    act(() => {
      fireEvent.changeText(input, mockCustomerName);
    });

    await waitFor(() => {
      expect(input.props.value).toEqual(mockCustomerName);
    });
  
    act(() => {
      fireEvent.press(submitButton);
    });

    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
    expect(mockProps.onSubmit).toHaveBeenCalledWith(mockCustomerName);
  });
});
