import { AppRegistry } from 'react-native';
import { App } from './App';
import { name as appName } from './app.json';
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
    // Configuración de Firebase, puedes encontrarla en la consola de Firebase
};

// Inicializa la aplicación de Firebase
initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
