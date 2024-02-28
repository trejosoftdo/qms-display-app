import React from 'react';
import ConditionalContainer from '../ConditionalContainer';


describe('ConditionalContainer component', () => {
  it('does not render the content if display is not active', () => {
    expect(renderShallow(
      <ConditionalContainer>
        <div>Test content</div>
      </ConditionalContainer>
    )).toMatchSnapshot();
  });

  it('does render the content if display is active', () => {
    expect(renderShallow(
      <ConditionalContainer display>
        <div>Test content</div>
      </ConditionalContainer>
    )).toMatchSnapshot();
  });
});