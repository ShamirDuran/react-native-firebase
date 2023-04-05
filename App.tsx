import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import {toastConfig} from './src/themes/toastStyles';
import {LoadingProvider} from './src/provider/LoadingProvider';
import {useNotifications} from './src/hooks/useNotifications';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';

export const App = () => {
  useNotifications();

  return (
    <LoadingProvider>
      <NavigationContainer>
        <StackNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </LoadingProvider>
  );
};
