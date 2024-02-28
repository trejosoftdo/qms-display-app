import React from 'react';
import Header from '../Header';

describe('Header component', () => {
  it('renders the component with the provided props as expected', () => {
    expect(renderShallow(<Header message="Test Message" />)).toMatchSnapshot();
  });
});