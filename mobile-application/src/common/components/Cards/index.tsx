import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ItemCard from './ItemCard';


type Item = {
  id: string;
  name: string;
  icon: string;
  label: string;
};

/**
 * CardsProps defines the props for the Cards Component.
 *
 * @property items - list of items
 * @property onItemSelect - a handler that is called when an item is selected
 */
interface CardsProps {
  items: Item[];
  onItemSelect: (item: Item) => void;
};

/**
 * A component that represents a list of cards
 *
 * @param {CardsProps} props - The props for the Cards component.
 */
const Cards: React.FC<CardsProps> = (props: CardsProps) => (
  <View style={styles.container}>
    {props.items.map(item => (
      <ItemCard
        key={item.name}  
        icon={item.icon}
        title={item.label}
        onPress={() => {
          props.onItemSelect(item);
        }}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    paddingBottomBottom: 32,
  },
});

export default Cards;