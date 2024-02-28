import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import useDeviceId from '../../../hooks/useDeviceId';
import InformationView from '../';


jest.mock('../../../hooks/useDeviceId');

describe('InformationView component', () => {
  const mockData = {
    deviceId: 'mock-device-id',
  };

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected when loading', () => {
    useDeviceId.mockReturnValue({ loading: true });
    expect(renderShallow(<InformationView />)).toMatchSnapshot();
    expect(useDeviceId).toHaveBeenCalledTimes(1);
    expect(useDeviceId).toHaveBeenCalledWith();
  });

  it('renders the component as expected when data has been loaded', () => {
    useDeviceId.mockReturnValue({
      loading: false,
      data: mockData,
    });
    expect(renderShallow(<InformationView />)).toMatchSnapshot();
    expect(useDeviceId).toHaveBeenCalledTimes(1);
    expect(useDeviceId).toHaveBeenCalledWith();
  });

  it('renders the component as expected when it has errors', () => {
    useDeviceId.mockReturnValue({
      loading: false,
      error: new Error('Unexpected error'),
    });
    expect(renderShallow(<InformationView />)).toMatchSnapshot();
    expect(useDeviceId).toHaveBeenCalledTimes(1);
    expect(useDeviceId).toHaveBeenCalledWith();
  });
});
