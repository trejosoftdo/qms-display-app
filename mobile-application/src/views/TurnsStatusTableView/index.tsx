import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AppView, ConditionalContainer } from '../../common/components';
import useTurnsStatusTable from '../../hooks/useTurnsStatusTable';
import useTurnsMessageCalls from '../../hooks/useTurnsMessageCalls';
import {
  TRANSLATION_NEXT_TURNS_KEY,
  TRANSLATION_TURN_KEY,
  TRANSLATION_POSITION_KEY,
  TRANSLATION_WAIT_MESSAGE_KEY,
  TRANSLATION_TO_KEY,
} from '../../common/translations/translation-keys';
import { BEING_ATTENDED_STATUS_CODE, TO_BE_ATTENDED_STATUS_CODE } from './constants';

/**
 * TurnsStatusTableViewProps defines the props for the Component.
 */
interface TurnsStatusTableViewProps { }

/**
 * A component that represents the view to display the turns status table
 *
 * @param {TurnsStatusTableViewProps} props - The props for the component.
 */
const TurnsStatusTableView: React.FC<TurnsStatusTableViewProps> = (props: TurnsStatusTableViewProps) => {
  const {
    loading,
    data,
    error,
  } = useTurnsStatusTable();
  const { t } = useTranslation();
  const messageKey = loading ? TRANSLATION_WAIT_MESSAGE_KEY : "";
  const beingAttendedItems = data?.items?.filter(item => item.statusCode === BEING_ATTENDED_STATUS_CODE);
  const toBeAttendedItems = data?.items?.filter(item => item.statusCode === TO_BE_ATTENDED_STATUS_CODE);
  const textItems = toBeAttendedItems?.map(item => `${item.ticketNumber} ${t(TRANSLATION_TO_KEY)} ${item.queueName}`);
  
  if (textItems?.length) {
    textItems.unshift(t(TRANSLATION_NEXT_TURNS_KEY));
  }

  useTurnsMessageCalls(textItems);

  return (
    <AppView
      loading={loading}
      error={error}
    >
      <ConditionalContainer display={!loading && !!data}>
        <View style={styles.content}>
          <DataTable style={styles.beingAttended}>
            <DataTable.Header style={styles.header}>
              <DataTable.Title textStyle={styles.title}>
                {t(TRANSLATION_TURN_KEY)}
              </DataTable.Title>
              <DataTable.Title textStyle={styles.title}>
                {t(TRANSLATION_POSITION_KEY)}
              </DataTable.Title>
            </DataTable.Header>

            {beingAttendedItems?.map((item) => (
              <DataTable.Row key={item.ticketNumber}>
                <DataTable.Cell textStyle={styles.cell}>{item.ticketNumber}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.cell}>{item.queueName}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          <DataTable style={styles.toBeAttended}>
            <DataTable.Header style={styles.header}>
              <DataTable.Title textStyle={styles.title}>
                {t(TRANSLATION_NEXT_TURNS_KEY)}
              </DataTable.Title>
            </DataTable.Header>

            {toBeAttendedItems?.map((item) => (
              <DataTable.Row key={item.ticketNumber}>
                <DataTable.Cell textStyle={styles.cell}>
                  {item.ticketNumber} {t(TRANSLATION_TO_KEY)} {item.queueName}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ConditionalContainer>
    </AppView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#b4c5e4',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: '#000',
  },
  cell: {
    fontSize: 18,
    fontWeight: "600",
    color: '#000',
  },
  content: {
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 50
  },
  beingAttended: {
    width: '60%',
    backgroundColor: '#fff',
  },
  toBeAttended: {
    width: '30%',
    backgroundColor: '#fff',
  },
});

export default TurnsStatusTableView;