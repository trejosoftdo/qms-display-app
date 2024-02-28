import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';
import { goToPath } from '../../../common/helpers';
import { SERVICES_PATH } from '../../../common/constants';
import useCategories from '../../../hooks/useCategories';
import ChooseCategoriesView from '../';


jest.mock('expo-router');
jest.mock('../../../common/helpers');
jest.mock('../../../hooks/useCategories');


describe('ChooseCategoriesView component', () => {
  const mockParams = {
    customerName: 'customer-name',
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
    useCategories.mockReturnValue({ loading: true });
    expect(renderShallow(<ChooseCategoriesView />)).toMatchSnapshot();
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useCategories).toHaveBeenCalledTimes(1);
    expect(useCategories).toHaveBeenCalledWith();
  });

  it('renders the component as expected when data has been loaded', () => {
    useCategories.mockReturnValue({
      loading: false,
      data: mockData,
    });
    expect(renderShallow(<ChooseCategoriesView />)).toMatchSnapshot();
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useCategories).toHaveBeenCalledTimes(1);
    expect(useCategories).toHaveBeenCalledWith();
  });

  it('renders the component as expected when it has errors', () => {
    useCategories.mockReturnValue({
      loading: false,
      error: new Error('Unexpected error'),
    });
    expect(renderShallow(<ChooseCategoriesView />)).toMatchSnapshot();
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useCategories).toHaveBeenCalledTimes(1);
    expect(useCategories).toHaveBeenCalledWith();
  });

  it('goes to services path when an item is selected', () => {
    useCategories.mockReturnValue({
      loading: false,
      data: mockData,
    });
    const { getByText } = render(<ChooseCategoriesView />);
    const element = getByText('mock-label');

    fireEvent.press(element);

    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(
      SERVICES_PATH,
      {
        categoryId: 'mock-id',
        categoryLabel: 'mock-label',
        customerName: 'customer-name'
      },
    );
    expect(useLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(useLocalSearchParams).toHaveBeenCalledWith();
    expect(useCategories).toHaveBeenCalledTimes(1);
    expect(useCategories).toHaveBeenCalledWith();
  });
});
