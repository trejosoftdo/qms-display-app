import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Cards from '../';


describe('Cards component', () => {
  const props = {
    onItemSelect: jest.fn(),
    items: [
      {
        id: '1',
        name: 'Test name 1',
        icon: 'lock',
        label: 'Test Label 1',
      },
      {
        id: '2',
        name: 'Test name 2',
        icon: 'information',
        label: 'Test Label 2',
      },
    ]
  };

  it('renders the component with the provided props as expected', () => {
    expect(renderShallow(<Cards {...props} />)).toMatchSnapshot();
  });

  test('calls onPress prop when clicked', () => {
    const { getAllByTestId } = render(
      <Cards {...props} />
    );
    const elements = getAllByTestId('card');
    fireEvent.press(elements[0]);
    expect(props.onItemSelect).toHaveBeenCalled();
  });
});
