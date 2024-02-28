import React from 'react';
import Value from '../Value';


describe('Value component', () => {
  const props = {
    icon: 'lock',
    value: 'Test value',
  };

  it('renders the component with the provided props as expected', () => {
    expect(renderShallow(<Value {...props} />)).toMatchSnapshot();
  });
});