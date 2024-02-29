import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import useTurnsStatusTable from '../../../hooks/useTurnsStatusTable';
import TurnsStatusTableView from '../';


jest.mock('expo-router');
jest.mock('../../../common/helpers');
jest.mock('../../../hooks/useTurnsStatusTable');


describe('TurnsStatusTableView component', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected when loading', () => {
    useTurnsStatusTable.mockReturnValue({ loading: true });
    expect(renderShallow(<TurnsStatusTableView />)).toMatchSnapshot();
    expect(useTurnsStatusTable).toHaveBeenCalledTimes(1);
    expect(useTurnsStatusTable).toHaveBeenCalledWith();
  });

  it('renders the component as expected when data has been loaded', () => {
    useTurnsStatusTable.mockReturnValue({
      loading: false,
      data: mockData,
    });
    expect(renderShallow(<TurnsStatusTableView />)).toMatchSnapshot();
    expect(useTurnsStatusTable).toHaveBeenCalledTimes(1);
    expect(useTurnsStatusTable).toHaveBeenCalledWith();
  });

  it('renders the component as expected when it has errors', () => {
    useTurnsStatusTable.mockReturnValue({
      loading: false,
      error: new Error('Unexpected error'),
    });
    expect(renderShallow(<TurnsStatusTableView />)).toMatchSnapshot();
    expect(useTurnsStatusTable).toHaveBeenCalledTimes(1);
    expect(useTurnsStatusTable).toHaveBeenCalledWith();
  });
});
