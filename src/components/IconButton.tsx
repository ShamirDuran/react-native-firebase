import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  iconName: string;
  onPress: () => void;
  bg?: string;
}

export const IconButton = ({iconName, onPress, bg = colors.primary}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, {backgroundColor: bg}]}
      onPress={onPress}>
      <Icon name={iconName} size={30} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
