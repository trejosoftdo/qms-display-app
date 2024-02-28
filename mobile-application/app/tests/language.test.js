import React from 'react';
import Language from '../language';


describe('Language route component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<Language  />)).toMatchSnapshot();
  });
});
