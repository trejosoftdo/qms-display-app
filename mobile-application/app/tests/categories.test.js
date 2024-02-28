import React from 'react';
import Categories from '../categories';


describe('Categories route component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<Categories  />)).toMatchSnapshot();
  });
});
