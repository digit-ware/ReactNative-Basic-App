import {
  firebase,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {getUniqueId} from 'react-native-device-info';

// import PushDevice from 'api/pushDevice';
import {Platform} from 'react-native';
import {ApplicationError, ErrorCode} from 'core';

const debug = console.debug.bind(console);

// const pushDeviceAPI = PushDevice.instance;

export interface NotificationData {
  id: string;
  addressee: string;
  notificationId: string;
  title: string;
  body: string;
}

let messageOpenedApp: FirebaseMessagingTypes.RemoteMessage = null;

export async function requestUserPermission() {
  const authStatus = await firebase.messaging().requestPermission();
  const enabled =
    authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  return enabled;
}

/**
 *
 * Listen to the notification that opens the app.
 * @see {@link getLastMessageOpenedApp} to get the way to process the notification for deep linking (or other stuffs)
 */
export async function listen() {
  debug('start listening for push notification');
  firebase
    .messaging()
    .onNotificationOpenedApp(
      (message: FirebaseMessagingTypes.RemoteMessage) => {
        debug('onNotificationOpenedApp');
        if (message) {
          messageOpenedApp = message;
          debug('onNotificationOpenedApp message', message);
        }
      },
    );
  debug('now registered for push notification');
  messageOpenedApp = await firebase.messaging().getInitialNotification();
  if (messageOpenedApp) {
    debug('a message was already present when opening the app');
  }
}

/**
 * Register or refresh the push registration for all id within the userIds
 */
export async function updateAll(options: {
  userIds: string[];
  principalId: string;
}): Promise<void> {
  const {userIds: userExternalIds, principalId: userPrincipalId} = options;
  const deviceId = getUniqueId();
  const pushToken = await firebase.messaging().getToken();
  let operatingSystem;

  switch (Platform.OS) {
    case 'android':
      operatingSystem = 'Android';
      break;
    case 'ios':
      operatingSystem = 'iOS';
      break;
    default:
      throw new ApplicationError(
        ErrorCode.Unknown,
        `Platform ${Platform.OS} not supported for push registration`,
      );
  }
  // pushDeviceAPI.post({
  //   operatingSystem,
  //   deviceId,
  //   pushToken,
  //   userExternalIds,
  //   userPrincipalId,
  // });
  console.log({
    operatingSystem,
    deviceId,
    pushToken,
    userExternalIds,
    userPrincipalId,
  });
  debug(`DEVICEID: ${deviceId} FCMPUSHTOKEN: ${pushToken}`);
}

export async function deleteDevice(): Promise<void> {
  const deviceId = getUniqueId();
  // pushDeviceAPI.deleteDevice(deviceId);
  console.log(deviceId);
}

/**
 * Return the last notification data incoming from a notification that opened the app or null if the app
 * has been openend in another way.
 * @NOTE this will not consume the incoming message
 * @see {@link getLastMessageDataOpenedApp}. it is the same but cosnume the message
 */
export async function seekLastMessageDataOpenedApp(): Promise<NotificationData | null> {
  debug('seekLastMessageDataOpenedApp');
  // put this in the execution queue in order to leave the `onNotificationOpenedApp` to run
  await new Promise(resolve => setTimeout(resolve, 100));
  const message = messageOpenedApp;
  if (!message) {
    return null;
  }
  return message.data as unknown as NotificationData;
}

/**
 * Return the last notification data incoming from a notification that opened the app or null if the app
 * has been openend in another way.
 * @NOTE this will consume the incoming message
 * @see {@link seekLastMessageDataOpenedApp}. it is the same but does not consume the message
 */
export async function getLastMessageDataOpenedApp(): Promise<NotificationData | null> {
  debug('seekLastMessageDataOpenedApp');
  // put this in the execution queue in order to leave the `onNotificationOpenedApp` to run
  await new Promise(resolve => setTimeout(resolve, 100));
  const message = messageOpenedApp;
  messageOpenedApp = null;
  if (!message) {
    return null;
  }
  return message.data as unknown as NotificationData;
}
