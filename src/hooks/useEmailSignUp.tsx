import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {FirebaseError} from '@firebase/util';

/// Firebase sign up with email and password
/// @returns {signUp, error, isLoading}
export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredentials.user;
      console.log('User account created & signed in!', user);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }
      }
      console.error(error);
    }

    setIsLoading(false);
  };

  return {signUp, error, isLoading};
};
