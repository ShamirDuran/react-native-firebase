import {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUpWithEmail = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredentials.user;
      console.log('User account created & signed in!', user);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('That email address is already in use!');
          break;

        case 'auth/invalid-email':
          setError('That email address is invalid!');
          break;

        default:
          console.log(error, 'SignUp with Email failed');
          break;
      }
    }

    setIsLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      const data = await auth().signInWithCredential(googleCredential);
      setUser(data.user);
      console.log('User account created & signed in!', data.user.email);
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('User cancelled the login process');
          setError('User cancelled the login process');
          break;

        case statusCodes.IN_PROGRESS:
          console.log('Starting SignUp with Google');
          setError('Starting SignUp with Google');
          break;

        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Google Play Services not available');
          setError('Google Play Services not available');
          break;

        default:
          console.log('Something went wrong', error);
          setError('Something went wrong');
          break;
      }
    }

    setIsLoading(false);
  };

  const signOut = async () => {
    // Firebase sign out
    await auth().signOut();
    setUser(null);
  };

  // Configure Google Sign-in and suscribe to firebase auth state changes
  useEffect(() => {
    const configureGoogleSignIn = async () => {
      await GoogleSignin.configure({
        // Get webclientId from google-services.json at oauth_client section and client_type: 3
        webClientId:
          '952474049528-n0vj8dvsguop5kqq8pvu2fprm2btdktr.apps.googleusercontent.com',
        offlineAccess: false,
      });
    };
    configureGoogleSignIn();

    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    // unsubscribe on unmount
    return subscriber;
  }, []);

  return {signUpWithEmail, signInWithGoogle, signOut, user, isLoading, error};
};
