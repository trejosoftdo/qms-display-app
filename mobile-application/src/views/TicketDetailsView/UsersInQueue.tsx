import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { TRANSLATION_USERS_IN_QUEUE_KEY } from '../../common/translations/translation-keys';


/**
 * UsersInQueueProps defines the props for the Users In Queue Component.
 *
 * @property total - total of users in queue
 */
interface UsersInQueueProps {
  total: number;
};

/**
 * A component to display the number of users who are in queue
 *
 * @param {UsersInQueueProps} props - The props for the Users In Queue component.
 */
const UsersInQueue: React.FC<UsersInQueueProps> = (props: UsersInQueueProps) => {
  const { t } = useTranslation();
  return (
    <Text style={styles.container} variant="titleMedium">
      {t(TRANSLATION_USERS_IN_QUEUE_KEY, { total: props.total })}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
});

export default UsersInQueue;
