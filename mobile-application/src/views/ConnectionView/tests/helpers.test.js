import React from 'react';
import { getMessageKey } from '../helpers';
import { TRANSLATION_CONNECTED_MESSAGE_KEY, TRANSLATION_INITIAL_CONNECT_MESSAGE_KEY, TRANSLATION_SUCCESS_CONNECTION_MESSAGE_KEY, TRANSLATION_TO_CONNECT_MESSAGE_KEY } from '../../../common/translations/translation-keys';

describe('Connection View helpers', () => {
  describe('getMessageKey', () => {
    it('returns the connected message key when access token is in connection details', () => {
      expect(getMessageKey({}, { accessToken: 'mock-access-token' })).toEqual(TRANSLATION_CONNECTED_MESSAGE_KEY);
    });

    it('returns the success connection message key when access token is in data', () => {
      expect(getMessageKey({ tokens: { accessToken: 'mock-access-token' } }, {})).toEqual(TRANSLATION_SUCCESS_CONNECTION_MESSAGE_KEY);
    });

    it('returns the to connect message key when user code is in data', () => {
      expect(getMessageKey({ userCode: 'mock-user-code' }, {})).toEqual(TRANSLATION_TO_CONNECT_MESSAGE_KEY);
    });

    it('returns the initial connection when data and connection details are not available', () => {
      expect(getMessageKey({}, {})).toEqual(TRANSLATION_INITIAL_CONNECT_MESSAGE_KEY);
    });
  });
});
