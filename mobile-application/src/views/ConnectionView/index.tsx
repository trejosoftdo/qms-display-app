
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import useConnection from '../../hooks/useConnection';
import { goToPath } from '../../common/helpers';
import {
  ActionButton,
  AppView,
  ConditionalContainer,
  Value,
} from '../../common/components';
import { HOME_PATH } from '../../common/constants';
import { getMessageKey } from './helpers';
import ConnectForm from './ConnectForm';
import VerificationQRCode from './VerificationQRCode';
import { TRANSLATION_RECONNECT_MESSAGE_KEY, TRANSLATION_RETURN_MESSAGE_KEY } from '../../common/translations/translation-keys';


/**
 * ConnectionViewProps defines the props for the Connect Virw Component.
 */
interface ConnectionViewProps {}

/**
 * A component for the connect view
 *
 * @param {ConnectionViewProps} props - The props for the Connect View component.
 */
const ConnectionView: React.FC<ConnectionViewProps> = (props: ConnectionViewProps) => {
  const { t } = useTranslation();
  const {
    data,
    error,
    loading,
    connect,
    clear,
    connectionDetails,
  } = useConnection();
  const messageKey = getMessageKey(data, connectionDetails);
  return (
    <AppView
      headerMessage={t(messageKey)}
      loading={loading}
      error={error}
    >
      <ConditionalContainer display={!!connectionDetails?.deviceCode}>
        <ActionButton
          icon="connection"
          message={t(TRANSLATION_RECONNECT_MESSAGE_KEY)}
          onPress={() => {
            clear();
          }}
        />
      </ConditionalContainer>
      <ConditionalContainer display={!data?.userCode && !connectionDetails?.deviceCode}>
        <ConnectForm
          onSubmit={(applicationId) => {
            connect(applicationId);
          }}
        />
      </ConditionalContainer>
      <ConditionalContainer display={data?.userCode && data?.verificationURI && !data?.tokens?.accessToken}>
        <VerificationQRCode verificationURI={data?.verificationURI} />
        <Value
          value={data?.userCode}
          icon="lock"
        />
      </ConditionalContainer>
      <ConditionalContainer display={!!data?.tokens?.accessToken}>
        <ActionButton
          icon="arrow-left-top"
          message={t(TRANSLATION_RETURN_MESSAGE_KEY)}
          onPress={() => {
            goToPath(HOME_PATH);
          }}
        />
      </ConditionalContainer>
    </AppView>
  );
};

export default ConnectionView;