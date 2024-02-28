import React from 'react';
import Services from '../services';


describe('Services route component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<Services  />)).toMatchSnapshot();
  });
});
