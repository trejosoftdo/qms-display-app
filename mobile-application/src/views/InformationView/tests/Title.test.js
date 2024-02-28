import React from 'react';
import Title from '../Title';

describe('Title component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<Title />)).toMatchSnapshot();
  });
});
