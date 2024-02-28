import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_CONFIG_MESSAGE_KEY } from '../../common/translations/translation-keys';
import { goToPath } from '../../common/helpers';
import { AppView } from '../../common/components';
import Options from './Options';


/**
 * ConfigurationViewProps defines the props for the Configuration View Component.
 *
 */
interface ConfigurationViewProps {}


/**
 * A component for the configuration view
 *
 * @param {ConfigurationViewProps} props - The props for the Configuration View component.
 */
const ConfigurationView: React.FC<ConfigurationViewProps> = (props: ConfigurationViewProps) => {
  const { t } = useTranslation();
  return (
    <AppView loading={false} headerMessage={t(TRANSLATION_CONFIG_MESSAGE_KEY)} >
      <Options
        onOptionSelect={(option) => {
          goToPath(`/${option}`);
        }}
      />
    </AppView>
  );
};

export default ConfigurationView;