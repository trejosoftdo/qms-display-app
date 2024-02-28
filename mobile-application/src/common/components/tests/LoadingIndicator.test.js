import React from 'react';
import LoadingIndicator from '../LoadingIndicator';


describe('LoadingIndicator component', () => {
  it('renders the component with the provided props as expected', () => {
    expect(renderShallow(<LoadingIndicator loading />)).toMatchSnapshot();
  });
});