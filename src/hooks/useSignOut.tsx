import auth from '@react-native-firebase/auth';

export const useSignOut = async () => {
  // Firebase sign out
  await auth().signOut();
};
