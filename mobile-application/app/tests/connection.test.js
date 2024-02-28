import React from 'react';
import Connection from '../connection';


describe('Connection route component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<Connection  />)).toMatchSnapshot();
  });
});
