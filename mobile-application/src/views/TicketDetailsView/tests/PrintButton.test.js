import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrintButton from '../PrintButton';


describe('PrintButton component', () => {
  const mockProps = {
    onPress: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected with the given props', () => {
    expect(renderShallow(<PrintButton {...mockProps} />)).toMatchSnapshot();
  });

  it('calls the onPress handler when being clicked', () => {
    const { getByRole } = render(<PrintButton {...mockProps} />);
    const element = getByRole('button');
    fireEvent.press(element);
    expect(mockProps.onPress).toHaveBeenCalled();
  });
});
