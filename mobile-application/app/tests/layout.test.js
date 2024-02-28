import React from 'react';
import useCustomFonts from '../../src/hooks/useCustomFonts';

jest.mock('../../i18n');
jest.mock('../../src/hooks/useCustomFonts');

import Layout from '../_layout';

describe('Layout component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component as expected when the fonts are loaded', () => {
    useCustomFonts.mockReturnValue({ fontsLoaded: true });
    expect(renderShallow(<Layout />)).toMatchSnapshot();
  });

  it('does not render the component when the fonts are not loaded', () => {
    useCustomFonts.mockReturnValue({ fontsLoaded: false });
    expect(renderShallow(<Layout />)).toMatchSnapshot();
  });
});
