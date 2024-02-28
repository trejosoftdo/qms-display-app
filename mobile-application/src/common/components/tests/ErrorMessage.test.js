import React from 'react';
import ErrorMessage from '../ErrorMessage';

jest.mock('react-i18next');

describe('ErrorMessage component', () => {
  it('renders with no provided props as expected', () => {
    expect(renderShallow(<ErrorMessage />)).toMatchSnapshot();
  });
});