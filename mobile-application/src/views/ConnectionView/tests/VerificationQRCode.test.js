import React from 'react';
import VerificationQRCode from '../VerificationQRCode';

describe('VerificationQRCode component', () => {
  const mockProps = {
    verificationURI: 'https://verification-uri.test',
  };

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected', () => {
    expect(renderShallow(<VerificationQRCode {...mockProps} />)).toMatchSnapshot();
  });
});
