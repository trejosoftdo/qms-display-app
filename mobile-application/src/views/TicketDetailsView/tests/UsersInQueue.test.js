import React from 'react';
import UsersInQueue from '../UsersInQueue';


describe('UsersInQueue component', () => {
  const mockProps = {
    total: 16,
  };

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected with the given props', () => {
    expect(renderShallow(<UsersInQueue {...mockProps} />)).toMatchSnapshot();
  });
});
