import {useEffect} from 'react';
import notifee, {AndroidStyle, Notification} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {applicationName} from '../themes/values';

export const useNotifications = () => {
  // Fire push notification
  const onDisplayNotification = async (
    body: string,
    title: string,
    photo?: string,
  ) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: applicationName,
      name: applicationName,
    });

    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    let displayNotification: Notification;

    if (photo) {
      displayNotification = {
        title,
        body,
        android: {
          channelId,
          style: {type: AndroidStyle.BIGPICTURE, picture: photo!},
          pressAction: {
            id: applicationName,
          },
        },
      };
    } else {
      displayNotification = {
        title,
        body,
        android: {
          channelId,
          pressAction: {
            id: applicationName,
          },
        },
      };
    }
    await notifee.displayNotification(displayNotification);
  };

  // Get user unique token id for push notifications
  const getToken = async () => {
    const token = await messaging().getToken();
    // console.log(token, 'token');
  };

  // Handle notifications when received
  const onMessageReceived = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const body = message.notification?.body;
    const title = message.notification?.title;
    const image = message.notification?.android?.imageUrl;
    await onDisplayNotification(body ?? '', title ?? '', image ?? '');
  };

  useEffect(() => {
    getToken();
    messaging().getInitialNotification();
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);
};
