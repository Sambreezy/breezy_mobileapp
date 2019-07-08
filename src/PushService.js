import PushNotification from 'react-native-push-notification'
import { isNil } from 'lodash'
import {Platform} from 'react-native';
import config from './redux/config';

const isAndroid =() => Platform.OS == 'android';

export default class PushService {
  static init() {
    PushService.onNotification = (notification) => {
      if (isAndroid()) {
        PushNotification.localNotification({
            title: notification.subject,
            message: notification.body,
          })
        
      }
    }
    PushService.onRegistration = null
    PushService.tab = null
  }

  static setCallbacks(onRegistration, onNotification) {
    PushService.onRegistration = onRegistration
    PushService.onNotification = onNotification
  }

  static configure() {
    PushNotification.configure({
      onRegister: (device) => {
        if (PushService.onRegistration) {
          PushService.onRegistration(device)
        }
      },
      onNotification: (notification) => {
        if (PushService.onNotification) {
          PushService.onNotification(notification)
        }
      },
      popInitialNotification: true,
      senderID: config.gcmId,
      requestPermissions: true
    })
  }
}

PushService.init()