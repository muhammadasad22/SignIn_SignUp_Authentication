import {Toast} from 'native-base';

export const showToast = (type, msg) => {
  return Toast.show({
    text: msg,
    position: 'top',
    type: type,
    duration: 3500,
  });
};
