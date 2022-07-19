import React, {Component, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
  Keyboard,
} from 'react-native';
import {Icon} from 'react-native-elements';

// import Header from '../components/HeaderView';
import {
  colorPrimary,
  lightBlue,
  color_text,
  color_primary,
  color_icon_grey,
  color_border,
  color_light_grey,
} from '../config/theme';
// import Loader from '../components/Loader';
import axios from 'axios';
import {
  Container,
  Content,
  Fab,
  Item,
  Input,
  Form,
  Toast,
  Root,
} from 'native-base';
import Footer from '../components/Footer';
import {rootHeight, rootWidth} from '../config/Dimensions';
import {CheckBox, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {loginUser, redirectToClientApp, getAppInstances, sendOtp} from './Api';
import {showToast} from './CustomToast';
import {appID} from './Constants';

import RNPickerSelect from 'react-native-picker-select';
import Dashboard from '../screens/Dashboard';
import Preferences from '../config/Preferences';
// import {StackActions, NavigationActions} from 'react-navigation';
// import CountryPicker from 'react-native-country-picker-modal';
// import * as ReadSms from "react-native-read-sms/ReadSms";
import CountDown from 'react-native-countdown-component';
import {CommonActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {saveUserdata} from '../config/Preferences';
import {setUserData} from '../config/Api';
import {Picker} from '@react-native-picker/picker';
// import {getLogin} from '../config/Preferences';
// const preferences = new Preferences();

// import { SafeAreaView } from 'react-navigation';

export default class LoginScreen2 extends Component {
  constructor(props) {
    super(props);

    const {navigation, username, challenges} = this.props;
    this.state = {
      // isLoading: true,

      isLoading: false,
      isDataLoading: false,
      isPassSelected: true,
      isOtpSelected: false,
      counterTime: 120,

      fieldPass: '',
      multipleInstance: false,
      multipleInstanceListData: [],
      multipleInstanceCompData: [],

      selectedCountry: '',

      isOtpSend: false,
      resend: false,

      token: '',
      parent_app_token: '',

      username: props.route.params.username,
      challenges: props.route.params.challenges,
      password: props.route.params.challenges.filter(i => {
        return i === 'PASSWORD';
      }),

      otp: props.route.params.challenges.filter(i => {
        return i === 'OTP';
      }),
    };
  }

  gotoDashboard = () => {
    // alert(userId + sessionId);
    const navigateAction = StackActions.reset({
      index: 1,
      actions: [
        CommonActions.navigate(
          {routeName: 'BottomApp'},
          // pass data to next vie
          {
            // userId: userId,
            // sessionId: sessionId,
          },
          // console.log('IID' + userId),
          // alert(sessionId),
        ),
        // this.navigation.navigate('DashboardScreeen'),
        // alert('data' + sessionId),
        // console.log('IID' + userId),
      ],
    });

    this.props.navigation.dispatch(navigateAction);
  };
  componentDidMount() {
    // console.log(this.props);
    // console.log("fgdf");
    //this.startReadSMS();
  }

  // startReadSMS = async () => {
  //   const hasPermission = await ReadSms.requestReadSMSPermission();
  //   if (hasPermission) {
  //     try {
  //       ReadSms.startReadSMS((status, sms, error) => {
  //         if (status == "success") {
  //           console.log("Great!! you have received new sms:", sms);
  //           console.log("Great!! you have received new sms:", error);
  //         }
  //       });
  //     } catch (error) {
  //       console.log("ERROR : ", error);
  //     }
  //   }
  // };

  redirectsToClientsApp = url => {
    redirectToClientApp(url)
      .then(response => {
        // alert("Here" + JSON.stringify(response,null,2));
        if (response.data.STATUS == 'SUCCESSFUL') {
          showToast('success', 'Loging In Please Wait');

          const mData = response.data;
          alert(JSON.stringify(mData));
          setUserData(mData);

          saveUserdata(mData);
          //this.gotoDashboard();
          //mData.USER_DATA.emp_user_id,
          // mData.USER_DATA.emp_session_id,

          // getLogin();
          this.props.navigation.navigate('BottomApp');
        }

        // return;
        // const mData = response.data;
        // alert(JSON.stringify(mData));
        // if (mData.STATUS === 'SUCCESSFUL') {
        //   showToast('success', 'Loging in please wait...');
        //   console.log(
        //     'REDIRECT TO CLIENT RESPONSE : ',
        //     JSON.stringify(mData.USER_DATA),
        //   );
        //   const sessionData = {
        //     status: 'ok',
        //     session_id: mData.USER_DATA.emp_session_id,
        //     user_name: mData.USER_DATA.emp_user_name,
        //     user_id: mData.USER_DATA.emp_user_id,
        //     dp: 'http:/' + mData.USER_DATA.emp_dp,
        //     one_id: mData.USER_DATA.oneid,
        //     org_id: mData.USER_DATA.emp_org_id,
        //     branch_id: mData.USER_DATA.emp_branch_id,
        //     dep_id: mData.USER_DATA.emp_department_id,
        //     jwt: mData.USER_DATA.JWT,
        //     //designation: mData.
        //   };
        //   // alert(mData);
        //     console.log(JSON.stringify(mData.USER_DATA));
        //   // alert(JSON.stringify(mData.USER_DATA));

        //   preferences.saveLoginSession(sessionData);
        //   this.gotoDashboard(
        //     mData.USER_DATA.emp_user_id,
        //     mData.USER_DATA.emp_session_id,
        //   );
        // }
      })
      .catch(err => {
        console.log('REDIRECT TO CLIENT APP ERROR : ', err);
        showToast('danger', err.message);
      });
  };

  onPasswordLoginCilcked = () => {
    const payload = {
      username: this.state.username,
      password: this.state.fieldPass,
      grant_type: this.state.isPassSelected ? 'password' : 'otp',
      app_id: appID,

      parent_app_token: this.state.parent_app_token,
    };

    loginUser(payload)
      .then(response => {
        const {
          STATUS,
          ERROR_DESCRIPTION,
          AUTHENTICATION,
          AUTH_CODE,
          ONEID,
          URL,
        } = response.data;
        console.log(JSON.stringify(response.data));
        this.setState({isDataLoading: false});
        if (STATUS === 'ERROR' && AUTHENTICATION != 'MULTIPLE-CHOICE') {
          showToast('danger', ERROR_DESCRIPTION);
          return;
        }
        //Auth with out multiple instances
        if (AUTHENTICATION === 'SUCCESSFUL' && STATUS === 'SUCCESSFUL') {
          showToast('success', STATUS);
          // this.navigation.navigate('DashboardScreeen'),
          this.redirectsToClientsApp(URL);

          return;
        }

        //Authentication with multiple instances...
        if (AUTHENTICATION === 'MULTIPLE-CHOICE') {
          showToast('success', ERROR_DESCRIPTION);
          this.setState(
            {
              multipleInstance: true,
              multipleInstanceCompData: response.data.DB_DATA.filter(i => {
                return i.role == 'Agent' || i.role == 'Admin';
              }),
            },
            () => {
              const mData = [];
              if (this.state.multipleInstanceCompData.length > 0) {
                this.state.multipleInstanceCompData.map(i => {
                  // if (i.role == "Employee" || i.role == "employee") {
                  //   mData.push({ label: i.org_name, value: i.org_name });
                  //   console.log("data,", i.org_name);
                  // }
                  mData.push({label: i.org_name, value: i.org_name});
                  console.log('data,', i.org_name);
                });
                console.log(
                  'Multiple Instance Complete Data : ',
                  this.state.multipleInstanceCompData,
                );

                this.setState({
                  multipleInstanceListData: mData,
                });
              }
            },
          );

          return;
        }
      })
      .catch(err => {
        console.log('PASSWORD ERROR : ', err);
        showToast('error', err.message);
        this.setState({isDataLoading: false});
      });
  };

  onOtpLoginClicked = () => {
    this.onPasswordLoginCilcked();
  };

  onPasswordClicked = () => {
    this.setState({
      isPassSelected: true,
      isOtpSelected: false,
    });
  };

  onOtpClicked = () => {
    this.setState({
      isPassSelected: false,
      isOtpSelected: true,
    });
  };

  sendOtpToUser = username => {
    sendOtp(username)
      .then(response => {
        const mData = response.data;
        console.log('SEND OTP RESPONSE : ', response.data);
        if (
          mData.STATUS === 'SUCCESSFUL' &&
          mData.VERIFICATION === 'OTP_SENT'
        ) {
          showToast('success', 'OTP sent please wait for a while');
          this.setState({isOtpSend: true});
        }

        if (mData.STATUS === 'ERROR') {
          showToast('danger', mData.ERROR_DESCRIPTION);
        }
      })
      .catch(error => {
        console.log('SEND OTP ERROR : ', error);
        showToast('danger', 'System failed to send otp');
      });
  };

  render() {
    //changes

    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../assets/iconImages/spbg.png')}>
        <Root>
          <SafeAreaView>
            <View
              style={{
                position: 'absolute',
                height: 40,
                left: 0,
                elevation: 4,
                top: rootHeight - 85,
                width: rootWidth,
              }}>
              <Footer color={'transparent'} />
            </View>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
              <View>
                <StatusBar
                  backgroundColor={color_primary}
                  barStyle="light-content"
                />
                {/* <Header
              navigation={this.props.navigation}
              title="Password"
              // TODO: Set the Icon 48x44
              icon={require("../images/note1.png")}
              iconType="ionicon"
            /> */}
                {/* <ImageBackground
              source={require('./images/ic_oneid.png')}
              style={{
                width: rootWidth,
                height: rootHeight,
                flex: 1,
                resizeMode: 'cover',
              }}> */}
                <View>{this.getView()}</View>
                {/* </ImageBackground> */}
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        </Root>
      </ImageBackground>
    );
  }

  getView() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Loader color={colorPrimary} /> */}
        </View>
      );
    } else {
      return (
        <View style={{padding: 16, flex: 1, elevation: 8}}>
          <Image
            source={require('../assets/iconImages/splashimg.png')}
            style={{
              width: rootWidth * 0.8,
              height: rootHeight * 0.4,
              alignSelf: 'center',
              marginTop: 40,
            }}
          />
          <Image
            style={{width: 190, height: 50, alignSelf: 'center', marginTop: 40}}
            source={require('../assets/iconImages/query.png')}
          />

          {/* <Text style={[styles.heading, {color: color_primary}]}> */}
          {/* <Text style={[styles.heading, {color: color_text}]}>
              Conversation
            </Text> */}
          {/* </Text> */}
          {/* <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              Login using oneid
            </Text> */}

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginBottom: 16,
              marginTop: 16,
              marginStart: 8,
            }}>
            {this.state.otp.length > 0 ? (
              <CheckBox
                title={'Password'}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.isPassSelected}
                size={20}
                checkedColor={color_primary}
                textStyle={styles.textStyle}
                containerStyle={styles.containerStyle}
                onPress={() => this.onPasswordClicked()}
              />
            ) : null}

            {this.state.otp.length > 0 ? (
              <CheckBox
                title={'OTP'}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.isOtpSelected}
                size={20}
                checkedColor={color_primary}
                textStyle={styles.textStyle}
                containerStyle={styles.containerStyle}
                onPress={() => this.onOtpClicked()}
              />
            ) : null}
          </View>

          {this.state.multipleInstance === true ? (
            <View
              style={{
                borderRadius: 8,
                borderWidth: 1.5,
                borderColor: color_border,
                marginHorizontal: 20,
                height: 50,
                marginBottom: 16,
                backgroundColor: 'white',
              }}>
              <RNPickerSelect
                placeholder={{
                  label: 'Choose Organization',
                  color: color_primary,
                }}
                style={pickerStyle}
                useNativeAndroidPickerStyle={false}
                onValueChange={(value, index) => {
                  if (index > 0) {
                    const mData =
                      this.state.multipleInstanceCompData[index - 1];

                    const payload = {
                      app_id: appID + '-' + mData.token + '-' + mData.role_id,
                      grant_type: 'access_token',
                      parent_app_token: mData.parent_app_token,
                    };
                    console.log('PAYLOAD', JSON.stringify(payload));
                    this.setState({
                      isInstanceLoader: true,
                    });
                    getAppInstances(payload)
                      //
                      .then(response => {
                        // alert('APP INSTANCES RESPONSE : '+ JSON.stringify(response));
                        console.log(response);
                        const mData = response.data;
                        //  alert( JSON.stringify( mData))
                        if (
                          mData.AUTHENTICATION === 'SUCCESSFUL' &&
                          mData.STATUS === 'SUCCESSFUL'
                        ) {
                          this.redirectsToClientsApp(mData.URL);
                          // alert(mData.URL)
                        }
                      })
                      .catch(err => {
                        console.log('APP INSTANCE ERROR : ', err);
                        showToast('danger', 'Instance => ' + err.message);
                      });
                  }
                }}
                items={this.state.multipleInstanceListData}
              />
              {this.state.isInstanceLoader ? (
                <View
                  style={{
                    padding: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Bubbles size={8} color={colorPrimary} /> */}
                </View>
              ) : null}
            </View>
          ) : null}

          {this.state.isOtpSelected ? (
            <View
            //style={styles.countryPickerColor}
            >
              <View style={{width: 100, alignSelf: 'center', marginBottom: 16}}>
                <Button
                  title="Get Otp"
                  //loading={this.state.isOtpSend}
                  borderRadius={8}
                  backgroundColor={color_primary}
                  containerViewStyle={{
                    width: rootWidth * 0.4,
                    alignSelf: 'center',
                    padding: 2,
                    marginStart: 16,
                  }}
                  textStyle={{fontWeight: 'bold'}}
                  onPress={() => {
                    if (this.state.username.startsWith('0')) {
                      this.state.username = '+92' + this.state.username;
                      this.state.username = this.state.username.replace(0, '');
                    }

                    // if (!this.state.username.startsWith("+")) {
                    //   this.state.username = "+" + this.state.username;
                    // }

                    this.sendOtpToUser(this.state.username);
                    Toast.show({
                      text: 'Sending otp...',
                      duration: 2000,
                    });
                    this.state.counterTime = 120;
                  }}
                />
              </View>

              {/* <CountryPicker
                  withFilter
                  withFlag
                  withCountryNameButton
                  withAlphaFilter
                  withCallingCode
                  withEmoji
                  onSelect={(country) => {
                    console.log(country);
                    const number = this.state.username.substring(
                      1,
                      this.state.username.length
                    );
                    this.setState(
                      {
                        username: "+" + country.callingCode[0] + number,
                        selectedCountry: country.name,
                      },
                      () => {
                        this.sendOtpToUser(
                          "+" + country.callingCode[0] + number
                        );
                        Toast.show({
                          text: "Sending otp...",
                          duration: 2000,
                        });
                      }
                    );
                  }}
                /> */}
              {this.state.selectedCountry != '' ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: color_text,
                  }}>
                  {this.state.selectedCountry}
                </Text>
              ) : null}
            </View>
          ) : null}
          {this.state.multipleInstance === true ? null : (
            <Item
              regular
              style={{
                width: '90%',
                alignSelf: 'center',
                paddingStart: 16,
                borderRadius: 8,
                borderWidth: 2.0,
                borderColor: color_border,
                backgroundColor: '#ffffff',
                elevation: 0.5,
              }}>
              <Icon
                name="lock"
                type="evilicon"
                size={32}
                color={color_primary}
              />
              <Input
                secureTextEntry={true}
                placeholder="Password/OTP"
                style={{color: color_text}}
                onChangeText={value => this.setState({fieldPass: value})}
              />
            </Item>
          )}
          {this.state.isOtpSend === true ? (
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CountDown
                until={this.state.counterTime}
                size={12}
                onFinish={() => this.setState({resend: true})}
                digitStyle={{backgroundColor: color_light_grey}}
                digitTxtStyle={{color: color_primary}}
                timeToShow={['M', 'S']}
                timeLabels={{m: 'MM', s: 'SS'}}
              />

              {this.state.resend === true ? (
                <Button
                  title="Resend"
                  //loading={this.state.isDataLoading}
                  borderRadius={24}
                  backgroundColor={color_primary}
                  containerViewStyle={{
                    width: '40%',
                    alignSelf: 'center',
                    padding: 2,
                    marginStart: 16,
                  }}
                  textStyle={{fontWeight: 'bold'}}
                  onPress={() => {
                    this.sendOtpToUser(this.state.username);
                    this.setState({
                      resend: false,
                      counterTime: 120,
                    });
                    this.state.counterTime = 120;
                  }}
                />
              ) : null}
            </View>
          ) : null}
          {this.state.multipleInstance === true ? null : (
            <Button
              title="Login"
              loading={this.state.isDataLoading}
              borderRadius={8}
              buttonStyle={{backgroundColor: '#32BECA'}}
              containerStyle={{
                marginTop: 16,
                width: '90%',
                alignSelf: 'center',
              }}
              textStyle={{fontWeight: 'bold'}}
              onPress={() => {
                this.setState({isDataLoading: true});
                Keyboard.dismiss();

                if (
                  this.state.isPassSelected === false &&
                  this.state.isOtpSelected === false
                ) {
                  showToast('danger', 'Choose password type');
                  this.setState({isDataLoading: false});
                  return;
                }

                if (this.state.isPassSelected === true) {
                  this.onPasswordLoginCilcked();
                  return;
                }
                if (this.state.isOtpSelected === true) {
                  this.onOtpLoginClicked();
                  return;
                }
              }}
            />
          )}
        </View>
      );
    }
  }
}

const pickerStyle = {
  inputIOS: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: color_text,
  },
  underline: {borderTopWidth: 0},
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },

  heading: {
    alignSelf: 'center',
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // countryPickerColor: {
  //   marginBottom: 16,
  //   padding: 12,
  //   borderWidth: 1,
  //   borderColor: color_border,
  //   borderRadius: 8,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '90%',
  //   alignSelf: 'center',
  //   backgroundColor: 'white',
  // },

  textStyle: {color: color_text, fontWeight: 'bold'},
});
