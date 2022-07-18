import AsyncStorage from '@react-native-async-storage/async-storage';

import {CommonActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

export const saveUserdata = async url => {
  try {
    const jsonValue = JSON.stringify(url);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    console.log('daa daa ' + JSON.stringify(url.jwt));
    // alert(jsonValue);
  } catch (e) {
    // saving error
    // alert(e);
  }
};

export const getLogin = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    // alert(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    alert(e);
    // error reading value
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};

// import {AsyncStorage} from 'react-native';

// const sessionDetails = 'logged_user_session';
// const otpInfo = 'empleado_otp_data';
// const alreadyUploaded = 'contacts-already-uploaded';
// const latestNotice = 'latest_notice';
// const latestNotification = 'latest_notification';
// const shiftTiming = 'duty_timing';

// export default class Preferences {
//   // @serverResponse: is a valid Json structure
//   async saveLoginSession(serverResponse) {
//     try {
//       //we want to wait for the Promise returned by AsyncStorage.setItem()
//       //to be resolved to the actual value before returning the value

//       // var jsonOfItem = await AsyncStorage.setItem(sessionDetails, JSON.stringify(serverResponse));
//       // return jsonOfItem;
//       await AsyncStorage.setItem(
//                                sessionDetails,
//                                                 JSON.stringify(serverResponse),
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   async getLoginSession() {
//     try {
//       const sessionData = await AsyncStorage.getItem(sessionDetails);

//       console.log('sessionObj:');
//       console.log(JSON.parse(sessionData));
//       return JSON.parse(sessionData);
//     } catch (error) {
//       console.log('saveLoginSession err: ' + error);
//       return null;
//     }
//   }

//   resetLogin(onReset) {
//     AsyncStorage.clear();
//     AsyncStorage.removeItem(sessionDetails, onReset);
//     AsyncStorage.removeItem(alreadyUploaded);
//   }

//   async saveLatestNotice(notice) {
//     try {
//       await AsyncStorage.setItem(latestNotice, JSON.stringify(notice));
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   async getLatestNotice() {
//     try {
//       const noticeData = await AsyncStorage.getItem(latestNotice);

//       return JSON.parse(noticeData);
//     } catch (error) {
//       console.log('getLatestNotice err: ' + error);
//       return null;
//     }
//   }

//   async saveLatestNotification(notification) {
//     try {
//       await AsyncStorage.setItem(
//         latestNotification,
//         JSON.stringify(notification),
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   async getLatestNotification() {
//     try {
//       const notificationData = await AsyncStorage.getItem(latestNotification);

//       return JSON.parse(notificationData);
//     } catch (error) {
//       console.log('getLatestNotification err: ' + error);
//       return null;
//     }
//   }

//   async saveShiftTiming(timing) {
//     try {
//       await AsyncStorage.setItem(shiftTiming, JSON.stringify(timing));
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   async getShiftTiming() {
//     try {
//       const shiftData = await AsyncStorage.getItem(shiftTiming);

//       return JSON.parse(shiftData);
//     } catch (error) {
//       console.log('getLatestNotification err: ' + error);
//       return null;
//     }
//   }

//   setOtpSend(otpData) {
//     AsyncStorage.setItem(otpInfo, JSON.stringify(otpData));
//   }

//   async getOtpSend() {
//     try {
//       const data = await AsyncStorage.getItem(otpInfo);
//       return JSON.parse(data);
//     } catch (error) {
//       console.log('getOtpSend err: ' + error);
//       return null;
//     }
//   }

//   resetOtpSend() {
//     AsyncStorage.clear();
//     AsyncStorage.removeItem(otpInfo);
//   }

//   async doneContactsUploaded(uploaded) {
//     try {
//       await AsyncStorage.setItem(alreadyUploaded, uploaded);
//     } catch (error) {
//       console.error('error', error);
//     }
//   }

//   async contactsUploaded() {
//     try {
//       const status = await AsyncStorage.getItem(alreadyUploaded);
//       return status;
//     } catch (error) {
//       console.log('contactsUploaded err: ' + error);
//       return null;
//     }
//   }
// }
