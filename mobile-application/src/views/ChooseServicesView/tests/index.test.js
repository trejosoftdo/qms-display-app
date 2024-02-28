import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';
import { goToPath } from '../../../common/helpers';
import { TICKET_DETAILS_PATH } from '../../../common/constants';
import useServices from '../../../hooks/useServices';
import ChooseServicesView from '../';


jest.mock('expo-router');
jest.mock('../../../common/helpers');
jest.mock('../../../hooks/useServices');


describe('ChooseServicesView component', () => {
  const mockParams = {
    customerName: 'customer-name',
    categoryLabel: 'test-category-label',
    categoryId: '1234',
  };
  const mockData = {
    items: [{
      id: 'mock-id',
      name: 'mock-name',
      label: 'mock-label',
    }],
  };

  beforeEach(() => {
    useLocalSearchParams.mockReturnValue(mockParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected when loading', () => {
    useServices.mockReturnValue({ loading: true });
    expect(renderShallow(<ChooseServicesView />)).toMatchSnapshot();
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useServices).toHaveBeenCalledTimes(1);
    expect(useServices).toHaveBeenCalledWith(1234);
  });

  it('renders the component as expected when data has been loaded', () => {
    useServices.mockReturnValue({
      loading: false,
      data: mockData,
    });
    expect(renderShallow(<ChooseServicesView />)).toMatchSnapshot();
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useServices).toHaveBeenCalledTimes(1);
    expect(useServices).toHaveBeenCalledWith(1234);
  });

  it('renders the component as expected when it has errors', () => {
    useServices.mockReturnValue({
      loading: false,
      error: new Error('Unexpected error'),
    });
    expect(renderShallow(<ChooseServicesView />)).toMatchSnapshot();
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useServices).toHaveBeenCalledTimes(1);
    expect(useServices).toHaveBeenCalledWith(1234);
  });

  it('goes to ticket details path when an item is selected', () => {
    useServices.mockReturnValue({
      loading: false,
      data: mockData,
    });
    const { getByText } = render(<ChooseServicesView />);
    const element = getByText('mock-label');

    fireEvent.press(element);

    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(
      TICKET_DETAILS_PATH,
      {
        serviceId: 'mock-id',
        serviceLabel: 'mock-label',
        customerName: 'customer-name'
      },
    );
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useServices).toHaveBeenCalledTimes(1);
    expect(useServices).toHaveBeenCalledWith(1234);
  });
});
