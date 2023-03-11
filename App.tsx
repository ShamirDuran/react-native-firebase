import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
