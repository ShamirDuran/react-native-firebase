import Toast from 'react-native-toast-message';

export const showToast = (
  type: 'info' | 'success' | 'error',
  title: string,
  text: string,
) => {
  Toast.show({
    type: type,
    text1: title,
    text2: text,
  });
};
