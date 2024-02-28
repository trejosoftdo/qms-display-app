import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import AppLightTheme from '../../theme';

/**
 * ItemCardProps defines the props for the Cards Component.
 *
 * @property icon - card icon
 * @property title - card title
 * @property onPress - on press card handler
 */
interface ItemCardProps {
  icon: string;
  title: string
  onPress: () => void;
}

/**
 * A component for an item card
 *
 * @param {ItemCardProps} props - The props for the Item Card component.
 */
const ItemCard: React.FC<ItemCardProps> = (props: ItemCardProps) => (
  <Card
    mode="outlined"
    style={styles.container}
    onPress={props.onPress}
  >
    <Card.Content style={styles.content}>
      <Avatar.Icon style={styles.icon} size={64} icon={props.icon} />
      <Text variant="titleMedium" style={styles.title}>{props.title}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppLightTheme.colors.background,
    marginRight: 2,
    cursor: 'pointer',
    width: '45%',
    maxWidth: 150,
    paddingBottom: 16,
    borderColor: AppLightTheme.colors.outline
  },
  icon: {
    backgroundColor: AppLightTheme.colors.primary,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: AppLightTheme.colors.secondary,
    paddingTop: 10,
    textAlign: 'center',
  },
});

export default ItemCard;