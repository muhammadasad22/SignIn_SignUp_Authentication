import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {colorPrimary, colorText} from '../assets/theme/colors';

const isAndroid = Platform.OS == 'android';
const Footer = () => {
  // const {color} = this.props;
  return (
    <View style={styles.footerStyle}>
      <TouchableOpacity
        onPress={() => {
          const url = 'http://www.veevotech.com/';
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              alert('Sorry, cannot to open ' + url);
            }
          });
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/images/ic_vt_logo.png')}
            resizeMethod={isAndroid ? 'scale' : undefined}
            resizeMode={isAndroid ? 'center' : undefined}
            style={{
              width: 50,
              height: 30,
              marginRight: 10,
              tintColor: colorPrimary,
            }}
            fadeDuration={900}
          />
          <Text style={[styles.textRegular, {color: colorText}]}>
            Powered By
            <Text style={[styles.textBold, {color: colorText}]}>
              {' '}
              Veevo Tech
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textBold: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
  },
  textRegular: {
    // flex: 1,
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
  },
  footerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 0,
    padding: 4,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

export default Footer;
