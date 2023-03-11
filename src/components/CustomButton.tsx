import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {colors} from '../themes/colors';

interface Props {
  onPress: () => void;
  text: string;
  type: 'PRIMARY' | 'SECONDARY';
  bgColor?: string;
  btnStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

export const CustomButton = ({
  onPress,
  text,
  type = 'PRIMARY',
  bgColor,
  btnStyle,
  textStyle,
  isLoading: loading = false,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        btnStyle ? btnStyle : {},
        styles[`bg_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}
      onPress={loading ? () => {} : () => onPress()}>
      {loading ? (
        <ActivityIndicator size={25} color={colors.firebase} />
      ) : (
        <Text style={textStyle && textStyle}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bg_PRIMARY: {
    backgroundColor: colors.primary,
  },
  bg_SECONDARY: {
    backgroundColor: colors.firebase,
  },
});
