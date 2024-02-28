import * as React from 'react';
import { List } from 'react-native-paper';

/**
 * OptionProps defines the props for the Option Component.
 *
 * @property title - option title
 * @property icon - option icon
 * @property onPress - option on press handler
 */
interface OptionProps {
  title: string;
  icon: string;
  onPress: () => void;
}

/**
 * A component a configuration option
 *
 * @param {OptionProps} props - The props for the Option component.
 */
const Option: React.FC<OptionProps> = (props: OptionProps) => (
  <List.Item
    title={props.title}
    left={() => <List.Icon icon={props.icon} />}
    right={() => <List.Icon icon="chevron-right" />}
    onPress={props.onPress}
  />
);

export default Option;