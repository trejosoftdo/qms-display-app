import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import useDeviceId from '../../hooks/useDeviceId';
import { TRANSLATION_ID_KEY, TRANSLATION_INFORMATION_KEY } from '../../common/translations/translation-keys';
import { AppView, ConditionalContainer } from '../../common/components';
import Title from './Title';

/**
 * InformationViewProps defines the props for the Information View Component.
 */
interface InformationViewProps {}

/**
 * A component for the Information view
 *
 * @param {InformationViewProps} props - The props for the Information View component.
 */
const InformationView: React.FC<InformationViewProps> = (props: InformationViewProps) => {
  const { t } = useTranslation();
  const { data, loading, error } = useDeviceId();
  return (
    <AppView
      headerMessage={t(TRANSLATION_INFORMATION_KEY)}
      loading={loading}
      error={error}
    >
      <ConditionalContainer display={!!data?.deviceId}>
        <List.Accordion
          title=""
          style={styles.container}
          left={Title}
        >
          <List.Item
            title={t(TRANSLATION_ID_KEY)}
            description={data?.deviceId}
          />
        </List.Accordion>
      </ConditionalContainer>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
  },
});

export default InformationView;