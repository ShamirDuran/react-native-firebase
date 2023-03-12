import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {SpaceBox} from '../components/SpaceBox';
import {useAuth} from '../hooks/useAuth';
import {customValues} from '../themes/values';

export const HomeScreen = () => {
  const {user, signOut} = useAuth();
  const navigator = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: customValues.userPlaceholder,
  });

  const handleSignOut = async () => {
    await signOut();
    navigator.reset({
      index: 0,
      routes: [{name: 'RegisterScreen' as never}],
    });
  };

  useEffect(() => {
    switch (user?.providerData[0].providerId) {
      case 'facebook.com':
        setUserData({
          name: user?.providerData[0]?.displayName ?? 'Username',
          email: user?.providerData[0]?.email ?? 'Email',
          photo: user?.providerData[0].photoURL ?? customValues.userPlaceholder,
        });
        break;

      default:
        setUserData({
          name: user?.displayName ?? 'Username',
          email: user?.email ?? 'Email',
          photo: user?.photoURL ?? customValues.userPlaceholder,
        });
        break;
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>You're Logged In</Text>
      <SpaceBox space={15} axis={'vertical'} />

      <View>
        <Image style={styles.userPhoto} source={{uri: userData.photo}} />
      </View>
      <SpaceBox space={15} axis={'vertical'} />

      <Text>{userData.name}</Text>
      <Text>{userData.email}</Text>
      <SpaceBox space={30} axis={'vertical'} />

      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 150,
  },
});
