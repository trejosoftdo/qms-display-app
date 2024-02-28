import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';
import { goToPath } from '../../../common/helpers';
import { HOME_PATH } from '../../../common/constants';
import useTicketDetails from '../../../hooks/useTicketDetails';
import TicketDetailsView from '../';


jest.mock('expo-router');
jest.mock('../../../common/helpers');
jest.mock('../../../hooks/useTicketDetails');


describe('TicketDetailsView component', () => {
  const mockParams = {
    customerName: 'customer-name',
    serviceLabel: 'mock-service-label',
    serviceId: '1234',
  };
  const mockData = {
    details: {
      value: 'mock-value',
    },
    usersInQueue: 14,
  };

  beforeEach(() => {
    useLocalSearchParams.mockReturnValue(mockParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected when loading', () => {
    useTicketDetails.mockReturnValue({ loading: true });
    expect(renderShallow(<TicketDetailsView />)).toMatchSnapshot();
    expect(goToPath).toHaveBeenCalledTimes(0);
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useTicketDetails).toHaveBeenCalledTimes(1);
    expect(useTicketDetails).toHaveBeenCalledWith(
      mockParams.serviceId,
      mockParams.customerName,
    );
  });

  it('renders the component as expected when data has been loaded', () => {
    useTicketDetails.mockReturnValue({
      loading: false,
      data: mockData,
    });
    expect(goToPath).toHaveBeenCalledTimes(0);
    expect(renderShallow(<TicketDetailsView />)).toMatchSnapshot();
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useTicketDetails).toHaveBeenCalledTimes(1);
    expect(useTicketDetails).toHaveBeenCalledWith(
      mockParams.serviceId,
      mockParams.customerName,
    );
  });

  it('renders the component as expected when it has errors', () => {
    useTicketDetails.mockReturnValue({
      loading: false,
      error: new Error('Unexpected error'),
    });
    expect(renderShallow(<TicketDetailsView />)).toMatchSnapshot();
    expect(goToPath).toHaveBeenCalledTimes(0);
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useTicketDetails).toHaveBeenCalledTimes(1);
    expect(useTicketDetails).toHaveBeenCalledWith(
      mockParams.serviceId,
      mockParams.customerName,
    );
  });

  it('goes to services path when an item is selected', () => {
    useTicketDetails.mockReturnValue({
      loading: false,
      data: mockData,
    });
    const { getByRole } = render(<TicketDetailsView />);
    const element = getByRole('button');

    fireEvent.press(element);

    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(HOME_PATH);
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useTicketDetails).toHaveBeenCalledTimes(1);
    expect(useTicketDetails).toHaveBeenCalledWith(
      mockParams.serviceId,
      mockParams.customerName,
    );
  });
});
