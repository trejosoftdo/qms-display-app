import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Option from '../Option';

describe('Option component', () => {
  const mockProps = {
    title: 'mock-title',
    icon: 'lock',
    onPress: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected', () => {
    expect(renderShallow(<Option {...mockProps} />)).toMatchSnapshot();
    expect(mockProps.onPress).toHaveBeenCalledTimes(0);
  });

  it('calls the onPress handler when being clicked', () => {
    const { getByText } = render(<Option {...mockProps} />);
    const element = getByText(mockProps.title);
    fireEvent.press(element);
    expect(mockProps.onPress).toHaveBeenCalled();
  });
});
