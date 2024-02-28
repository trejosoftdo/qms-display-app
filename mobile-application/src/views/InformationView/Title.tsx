import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_DETAILS_KEY } from '../../common/translations/translation-keys';

/**
 * TitleProps defines the props for the Title Component.
 */
interface TitleProps {}

/**
 * A component to show a title
 *
 * @param {TitleProps} props - The props for the Title component.
 */
const Title: React.FC<TitleProps> = (props: TitleProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.title}>
      <List.Icon {...props} icon="information" />
      <Text style={styles.titleText}>{t(TRANSLATION_DETAILS_KEY)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },
  titleText: {
    paddingLeft: 10,
    fontSize: 16
  },
});

export default Title;