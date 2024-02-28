import React from 'react';
import Configuration from '../configuration';


describe('Configuration route component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<Configuration  />)).toMatchSnapshot();
  });
});
