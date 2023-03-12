import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors} from '../themes/colors';
import {useAuth} from '../hooks/useAuth';
import {useEffect} from 'react';

export const SplashScreen = () => {
  const navigator = useNavigation();
  const {user, signOut} = useAuth();

  useEffect(() => {
    const checkUserAuth = async () => {
      await signOut();

      // TODO: Remove this setTimeout
      setTimeout(() => {
        navigator.navigate('RegisterScreen' as never);
      }, 1500);
    };

    checkUserAuth();
  }, []);

  return (
    <View style={styles.center}>
      <ActivityIndicator size={35} color={colors.firebase} />
      <Text>Loading...</Text>
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
