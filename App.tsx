import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/themes/toastStyles';

export const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};
