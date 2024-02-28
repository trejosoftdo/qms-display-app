import React from 'react';
import { act } from '@testing-library/react-hooks';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { goToPath } from '../../../common/helpers';
import { HOME_PATH } from '../../../common/constants';
import useConnection from '../../../hooks/useConnection';
import { getMessageKey } from '../helpers';
import ConnectionView from '../';


jest.mock('../../../common/helpers');
jest.mock('../../../hooks/useConnection');
jest.mock('../helpers');


describe('ConnectionView component', () => {
  const mockMessageKey = 'mock-message-key';

  beforeEach(() => {
    getMessageKey.mockReturnValue(mockMessageKey);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders the component as expected when loading', () => {
    useConnection.mockReturnValue({ loading: true });
    expect(renderShallow(<ConnectionView />)).toMatchSnapshot();
    expect(getMessageKey).toHaveBeenCalledTimes(1);
    expect(getMessageKey).toHaveBeenCalledWith(undefined, undefined);
    expect(useConnection).toHaveBeenCalledTimes(1);
    expect(useConnection).toHaveBeenCalledWith();
  });

  it('renders the component as expected when having the device code', () => {
    const connectionDetails = { deviceCode: 'mock-device-code' };
    useConnection.mockReturnValue({ loading: true, connectionDetails });
    expect(renderShallow(<ConnectionView />)).toMatchSnapshot();
    expect(getMessageKey).toHaveBeenCalledTimes(1);
    expect(getMessageKey).toHaveBeenCalledWith(undefined, connectionDetails);
    expect(useConnection).toHaveBeenCalledTimes(1);
    expect(useConnection).toHaveBeenCalledWith();
  });

  it('renders the component as expected when having the device code, user code and verification uri', () => {
    const connectionDetails = { deviceCode: 'mock-device-code' };
    const data = {
      userCode: 'mock-user-code',
      verificationURI: 'https://test-verification-uri.test',
    };
    useConnection.mockReturnValue({ loading: true, data, connectionDetails });
    expect(renderShallow(<ConnectionView />)).toMatchSnapshot();
    expect(getMessageKey).toHaveBeenCalledTimes(1);
    expect(getMessageKey).toHaveBeenCalledWith(data, connectionDetails);
    expect(useConnection).toHaveBeenCalledTimes(1);
    expect(useConnection).toHaveBeenCalledWith();
  });

  it('renders the component as expected when having the device code, user code, verification uri and access token', () => {
    const connectionDetails = { deviceCode: 'mock-device-code' };
    const data = {
      userCode: 'mock-user-code',
      verificationURI: 'https://test-verification-uri.test',
      tokens: {
        accessToken: 'mock-access-token',
      },
    };
    useConnection.mockReturnValue({ loading: true, data, connectionDetails });
    expect(renderShallow(<ConnectionView />)).toMatchSnapshot();
    expect(getMessageKey).toHaveBeenCalledTimes(1);
    expect(getMessageKey).toHaveBeenCalledWith(data, connectionDetails);
    expect(useConnection).toHaveBeenCalledTimes(1);
    expect(useConnection).toHaveBeenCalledWith();
  });

  it('clear everything when clicking reconnect', () => {
    const mockClear = jest.fn();
    const connectionDetails = { deviceCode: 'mock-device-code' };
    
    useConnection.mockReturnValue({ loading: true, connectionDetails, clear: mockClear });
    const { getByText } = render(<ConnectionView />);

    const element = getByText('Translated[translation:reconnect]({})');
    
    fireEvent.press(element);

    expect(mockClear).toHaveBeenCalledTimes(1);
    expect(mockClear).toHaveBeenCalledWith();
    expect(getMessageKey).toHaveBeenCalledTimes(1);
    expect(getMessageKey).toHaveBeenCalledWith(undefined, connectionDetails);
    expect(useConnection).toHaveBeenCalledTimes(1);
    expect(useConnection).toHaveBeenCalledWith();
  });

  it('connects the application as expected', async () => {
    const mockApplicationId = 'mock-application-id';
    const mockConnect = jest.fn();
    const connectionDetails = { deviceCode: 'mock-device-code' };
    
    useConnection.mockReturnValue({ loading: true, connect: mockConnect });
    const { getByTestId } = render(<ConnectionView />);
    
    const input = getByTestId('text-input-flat');
    const submitButton = getByTestId('button');
    
    act(() => {
      fireEvent.changeText(input, mockApplicationId);
    });

    await waitFor(() => {
      expect(input.props.value).toEqual(mockApplicationId);
    });
  
    act(() => {
      fireEvent.press(submitButton);
    });

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(mockConnect).toHaveBeenCalledWith(mockApplicationId);
    expect(getMessageKey).toHaveBeenCalledTimes(2);
    expect(getMessageKey).toHaveBeenCalledWith(undefined, undefined);
    expect(useConnection).toHaveBeenCalledTimes(2);
    expect(useConnection).toHaveBeenCalledWith();
  });

  it('returns to home when clicking return button', async () => {
    const connectionDetails = { deviceCode: 'mock-device-code' };
    const data = {
      userCode: 'mock-user-code',
      verificationURI: 'https://test-verification-uri.test',
      tokens: {
        accessToken: 'mock-access-token',
      },
    };
    useConnection.mockReturnValue({ loading: true, data, connectionDetails });

    const { getByText } = render(<ConnectionView />);
    
    const submitButton = getByText('Translated[translation:return]({})');
    
    act(() => {
      fireEvent.press(submitButton);
    });

    expect(goToPath).toHaveBeenCalledTimes(1);
    expect(goToPath).toHaveBeenCalledWith(HOME_PATH);
    expect(getMessageKey).toHaveBeenCalledTimes(1);
    expect(getMessageKey).toHaveBeenCalledWith(data, connectionDetails);
    expect(useConnection).toHaveBeenCalledTimes(1);
    expect(useConnection).toHaveBeenCalledWith();
  });
});
