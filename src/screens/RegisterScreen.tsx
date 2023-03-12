import {StyleSheet, Text, TextInput, View, Keyboard} from 'react-native';
import {IconButton} from '../components/IconButton';
import {customStyles, customValues} from '../themes/customStyles';
import {colors} from '../themes/colors';
import {CustomButton} from '../components/CustomButton';
import {SpaceBox} from '../components/SpaceBox';
import {useContext, useState} from 'react';
import {showToast} from '../helpers/Toast';
import {useAuth} from '../hooks/useAuth';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LoadingContext} from '../provider/LoadingProvider';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const initialFormState = {
  email: '',
  password: '',
};

export const RegisterScreen = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const {signUpWithEmail, signInWithGoogle, isLoading, error} = useAuth();
  const {setLoading} = useContext(LoadingContext);

  // TODO: Handle error
  const onSubmitSignUpWithEmail = async () => {
    if (!formValues.email || !formValues.password) {
      return showToast(
        'error',
        'SignUp Failed',
        'Email and password are required',
      );
    }

    Keyboard.dismiss();

    setLoading(true);
    await signUpWithEmail(formValues.email, formValues.password);
    setLoading(false);

    !error && setFormValues(initialFormState);
    error && showToast('error', 'SignUp Failed', error);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[customStyles.flexRow, {flex: 2}]}>
        <MaterialIcon
          name="firebase"
          color={colors.firebase}
          size={43}
          style={{marginRight: 3}}
        />
        <Text style={styles.title}>Firebase</Text>
      </View>

      {/* Email and password signup */}
      <View style={[styles.bodyContainer, {flex: 3}]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={value => setFormValues({...formValues, email: value})}
            value={formValues.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formValues.password}
            onChangeText={value =>
              setFormValues({...formValues, password: value})
            }
            secureTextEntry
          />
          <CustomButton
            text="Sign Up"
            type="PRIMARY"
            btnStyle={styles.btnSubmit}
            textStyle={styles.btnText}
            onPress={onSubmitSignUpWithEmail}
          />
        </View>

        {/* Others signup methods */}
        <View>
          <View style={{alignSelf: 'center', marginBottom: 10}}>
            <Text>Or sign up with</Text>
          </View>

          <View style={styles.methodsContainer}>
            <IconButton
              iconName="google"
              onPress={async () => {
                setLoading(true);
                await GoogleSignin.signOut(); // Just in case, manually signout last user
                await signInWithGoogle();
                setLoading(false);
              }}
            />
            <SpaceBox space={10} />
            <IconButton
              iconName="facebook"
              onPress={() => {
                console.log('Facebook');
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.firebase,
  },
  inputContainer: {
    width: '70%',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: customValues.borderRadius,
    borderColor: colors.lightGrey,
    padding: 10,
    marginBottom: 15,
  },
  btnSubmit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 40,
    width: '100%',
    borderRadius: customValues.borderRadius,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  methodsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
