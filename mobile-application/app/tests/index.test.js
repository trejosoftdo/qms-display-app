import React from 'react';
import Home from '../';


describe('Home route component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<Home />)).toMatchSnapshot();
  });
});
