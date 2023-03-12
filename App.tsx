import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import {toastConfig} from './src/themes/toastStyles';
import {LoadingProvider} from './src/provider/LoadingProvider';
import Toast from 'react-native-toast-message';

export const App = () => {
  return (
    <LoadingProvider>
      <NavigationContainer>
        <StackNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </LoadingProvider>
  );
};
