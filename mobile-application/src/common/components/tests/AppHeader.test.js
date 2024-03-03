import React from 'react';
import AppHeader, { headerTitle } from '../AppHeader';


describe('AppHeader component', () => {
  const mockHeaderRight = <div>Header Right</div>;
  const props = {
    title: 'Test title',
    headerRight: mockHeaderRight,
  };

  it('renders the component with the provided props as expected', () => {
    expect(renderShallow(<AppHeader {...props} />)).toMatchSnapshot();
  });

  it('renders the header title component as expected', () => {
    expect(renderShallow(headerTitle())).toMatchSnapshot();
  });
});