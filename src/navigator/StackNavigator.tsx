import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../screens/SplashScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {RegisterScreen} from '../screens/RegisterScreen';

export type RootStackParamsList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Group screenOptions={{cardStyle: {backgroundColor: 'white'}}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
