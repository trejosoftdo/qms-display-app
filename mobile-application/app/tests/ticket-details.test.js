import React from 'react';
import TicketDetails from '../ticket-details';


describe('TicketDetails route component', () => {
  it('renders the component as expected', () => {
    expect(renderShallow(<TicketDetails  />)).toMatchSnapshot();
  });
});
