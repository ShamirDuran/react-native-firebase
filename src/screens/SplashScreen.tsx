import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size={35} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
