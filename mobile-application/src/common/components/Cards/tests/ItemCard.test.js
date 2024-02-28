import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ItemCard from '../ItemCard';


describe('ItemCard component', () => {
  const props = {
    icon: 'lock',
    title: 'Test title',
    onPress: jest.fn(),
  };

  it('renders the component with the provided props as expected', () => {
    expect(renderShallow(<ItemCard {...props} />)).toMatchSnapshot();
  });
});
