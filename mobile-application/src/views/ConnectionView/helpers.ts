import { ConnectionData, ConnectionDetails } from "../../common/models";
import { TRANSLATION_CONNECTED_MESSAGE_KEY, TRANSLATION_INITIAL_CONNECT_MESSAGE_KEY, TRANSLATION_SUCCESS_CONNECTION_MESSAGE_KEY, TRANSLATION_TO_CONNECT_MESSAGE_KEY } from "../../common/translations/translation-keys";

/**
 * Gets the correct message key from the data state
 * 
 * @param  {ConnectionData} data
 * @returns string
 */
export const getMessageKey = (data: ConnectionData, connectionDetails?: ConnectionDetails): string => {
  if (connectionDetails?.accessToken) {
    return TRANSLATION_CONNECTED_MESSAGE_KEY;
  }

  if (data?.tokens?.accessToken) {
    return TRANSLATION_SUCCESS_CONNECTION_MESSAGE_KEY;
  }

  return data?.userCode ? TRANSLATION_TO_CONNECT_MESSAGE_KEY : TRANSLATION_INITIAL_CONNECT_MESSAGE_KEY;
};
