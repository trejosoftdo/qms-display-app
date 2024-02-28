import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_TICKET_DETAILS_KEY } from '../src/common/translations/translation-keys';
import { AppHeader } from '../src/common/components';
import { TicketDetailsView } from '../src/views';

/**
 * TicketDetails Screen Route
 */
const TicketDetails = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <AppHeader title={t(TRANSLATION_TICKET_DETAILS_KEY)} />
      <TicketDetailsView />
    </React.Fragment>
  );
};

export default TicketDetails;
