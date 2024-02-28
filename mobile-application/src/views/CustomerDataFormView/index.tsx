
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_CUSTOMER_DATA_FORM_MESSAGE_KEY } from '../../common/translations/translation-keys';
import { goToPath } from '../../common/helpers';
import { AppView } from '../../common/components';
import { CATEGORIES_PATH } from '../../common/constants';
import CustomerDataForm from './CustomerDataForm';

/**
 * CustomerDataFormViewProps defines the props for the Customer Data Form View Component.
 */
interface CustomerDataFormViewProps {}

/**
 * A component for the connect view
 *
 * @param {CustomerDataFormViewProps} props - The props for the Customer Data Form View component.
 */
const CustomerDataFormView: React.FC<CustomerDataFormViewProps> = (props: CustomerDataFormViewProps) => {
  const { t } = useTranslation();
  return (
    <AppView headerMessage={t(TRANSLATION_CUSTOMER_DATA_FORM_MESSAGE_KEY)}>
      <CustomerDataForm
        onSubmit={(customerName) => {
          goToPath(CATEGORIES_PATH, { customerName });
        }}
      />
    </AppView>
  );
};

export default CustomerDataFormView;