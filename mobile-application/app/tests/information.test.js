import React from 'react';
import Information from '../information';


describe('Information route component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<Information  />)).toMatchSnapshot();
  });
});
