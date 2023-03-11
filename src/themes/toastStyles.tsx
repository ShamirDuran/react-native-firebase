// App.jsx
import {BaseToast, ErrorToast, InfoToast} from 'react-native-toast-message';
import {colors} from './colors';

/*
  1. Create the config
*/
const fontSize1 = 14;
const fontSize2 = 13;

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.firebase}}
      text1Style={{
        fontSize: fontSize1,
      }}
      text2Style={{
        fontSize: fontSize2,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{borderLeftColor: '#FF9505'}}
      text1Style={{
        fontSize: fontSize1,
      }}
      text2Style={{
        fontSize: fontSize2,
        display: 'flex',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red'}}
      text1Style={{
        fontSize: fontSize1,
      }}
      text2Style={{
        fontSize: fontSize2,
      }}
    />
  ),
};
