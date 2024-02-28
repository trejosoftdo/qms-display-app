import React from 'react';
import AppView from '../AppView';


describe('AppView component', () => {
  it('renders the component with the provided props as expected', () => {
    expect(renderShallow(
      <AppView headerMessage="Test message">
        <div>Test content</div>
      </AppView>
    )).toMatchSnapshot();
  });

  it('renders the loading indicator when loading', () => {
    expect(renderShallow(
      <AppView headerMessage="Test message" loading>
        <div>Test content</div>
      </AppView>
    )).toMatchSnapshot();
  });

  it('renders the error message when there is an error', () => {
    expect(renderShallow(
      <AppView headerMessage="Test message" error>
        <div>Test content</div>
      </AppView>
    )).toMatchSnapshot();
  });
});