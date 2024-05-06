import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import useTurnsStatusTable from '../../../hooks/useTurnsStatusTable';
import useTurnsMessageCalls from '../../../hooks/useTurnsMessageCalls';
import TurnsStatusTableView from '../';
import { BEING_ATTENDED_STATUS_CODE, TO_BE_ATTENDED_STATUS_CODE } from '../constants';


jest.mock('expo-router');
jest.mock('../../../common/helpers');
jest.mock('../../../hooks/useTurnsStatusTable');
jest.mock('../../../hooks/useTurnsMessageCalls');


describe('TurnsStatusTableView component', () => {
  const mockParams = {
    customerName: 'customer-name',
  };
  const mockData = {
    items: [
      {
        ticketNumber: 'mock-first-ticket-number',
        queueName: 'mock-first-queue-name',
        statusCode: BEING_ATTENDED_STATUS_CODE,
      },
      {
        ticketNumber: 'mock-second-ticket-number',
        queueName: 'mock-second-queue-name',
        statusCode: TO_BE_ATTENDED_STATUS_CODE,
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected when loading', () => {
    useTurnsStatusTable.mockReturnValue({ loading: true });
    expect(renderShallow(<TurnsStatusTableView />)).toMatchSnapshot();
    expect(useTurnsStatusTable).toHaveBeenCalledTimes(1);
    expect(useTurnsStatusTable).toHaveBeenCalledWith();
    expect(useTurnsMessageCalls).toHaveBeenCalledTimes(1);
    expect(useTurnsMessageCalls).toHaveBeenCalledWith(undefined);
  });

  it('renders the component as expected when data has been loaded', () => {
    useTurnsStatusTable.mockReturnValue({
      loading: false,
      data: mockData,
    });
    expect(renderShallow(<TurnsStatusTableView />)).toMatchSnapshot();
    expect(useTurnsStatusTable).toHaveBeenCalledTimes(1);
    expect(useTurnsStatusTable).toHaveBeenCalledWith();
    expect(useTurnsMessageCalls).toHaveBeenCalledTimes(1);
    expect(useTurnsMessageCalls).toHaveBeenCalledWith([
      "Translated[translation:nextTurns]({})",
      "mock-second-ticket-number Translated[translation:to]({}) mock-second-queue-name"
    ]);
  });

  it('renders the component as expected when it has errors', () => {
    useTurnsStatusTable.mockReturnValue({
      loading: false,
      error: new Error('Unexpected error'),
    });
    expect(renderShallow(<TurnsStatusTableView />)).toMatchSnapshot();
    expect(useTurnsStatusTable).toHaveBeenCalledTimes(1);
    expect(useTurnsStatusTable).toHaveBeenCalledWith();
    expect(useTurnsMessageCalls).toHaveBeenCalledTimes(1);
    expect(useTurnsMessageCalls).toHaveBeenCalledWith(undefined);
  });
});
