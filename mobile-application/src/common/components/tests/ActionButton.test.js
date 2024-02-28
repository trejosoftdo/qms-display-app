import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionButton from '../ActionButton';


describe('ActionButton component', () => {
  const props = {
    icon: 'lock',
    onPress: jest.fn(),
    message: 'Test message',
  };

  it('renders the component with the provided props as expected', () => {
    expect(renderShallow(<ActionButton {...props} />)).toMatchSnapshot();
  });

  it('calls the onPress handler when being clicked', () => {
    const { getByText } = render(<ActionButton {...props} />);
    const element = getByText(props.message);
    fireEvent.press(element);
    expect(props.onPress).toHaveBeenCalled();
  });
});
