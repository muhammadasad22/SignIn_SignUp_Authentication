import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Keyboard,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  colorPrimary,
  color_border,
  color_icon_grey,
  color_light_grey,
  color_primary,
  color_text,
  lightBlue,
} from '../config/theme';
import Loader from '../Components/Loader';
import {ApiUrl} from '../config/Constants';
import axios from 'axios';
import {Container, Content, Item, Input, Root} from 'native-base';

import {black} from 'color-name';
// import SimpleListItemView from "../components/SimpleListItemView";
// import Footer from '../Components/Footer';
import {rootHeight, rootWidth} from '../config/Dimensions';
import {findUser} from './Api';
import {Button} from 'react-native-elements';
import {showToast} from './CustomToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import DeviceInfo from 'react-native-device-info';

// import { SafeAreaView } from 'react-navigation';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isDataLoading: false,
      data: [],
      username: '',
    };
  }
  // showToast = () => {
  //   ToastAndroid.show('A pikachwu appeared nearby !', ToastAndroid.SHORT);
  // };

  getUserData = () => {
    if (this.state.username.length <= 4) {
      showToast('danger', 'Kindly provide the valid username');
      this.setState({isDataLoading: false});
      return;
    }
    findUser(this.state.username)
      .then(response => {
        const mData = response.data;
        console.log('Find User Response : ' + JSON.stringify(mData));
        this.setState({isLoading: false, data: mData});
        if (mData.STATUS === 'SUCCESSFUL' && mData.USER === 'FOUND') {
          // this.showToast('success', 'User Found');
          this.setState({isDataLoading: false});
          this.props.navigation.navigate('LoginScreen2', {
            username: this.state.username,
            challenges: mData.CHALLENGE_MODES,
          });
        } else if (
          mData.STATUS === 'SUCCESSFUL' &&
          mData.USER === 'NOT_FOUND'
        ) {
          showToast('danger', 'User not found');
          this.setState({isDataLoading: false});
        } else if (mData.STATUS === 'ERROR') {
          showToast('danger', 'Error : ' + mData.ERROR_DESCRIPTION);
          this.setState({isDataLoading: false});
        } else if (mData.STATUS == 'SUCCESSFUL' && mData.USER == 'UNVERIFIED') {
          showToast(
            'danger',
            'Error : ' + 'Kindly verify your Oneid from web.',
          );
          this.setState({isDataLoading: false});
        }
      })
      .catch(err => {
        showToast('danger', 'Error : ' + err.message);
        console.log('Find User Error : ' + err);
        this.setState({isDataLoading: false});
      });
  };

  render() {
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../images/spbg.png')}>
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
              {/* <Footer color={'transparent'} /> */}
            </View>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
              <View style={{minHeight: rootHeight}}>
                <StatusBar
                  backgroundColor={'#32BECA'}
                  barStyle="light-content"
                />
                {/* <Header
            navigation={this.props.navigation}
            title="Login"
            // TODO: Set the Icon 48x44
            icon={require("../images/note1.png")
            iconType="ionicon"
          /> */}
                <View>{this.getView()}</View>
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
          <Loader color={colorPrimary} />
        </View>
      );
    } else {
      return (
        // <ImageBackground
        //   source={require('../assets/images/img_logo.png')}
        //   style={{
        //     width: rootWidth,
        //     height: rootHeight,
        //     flex: 1,
        //     resizeMode: 'cover',
        //   }}>
        <View style={{padding: 16}}>
          {/* <Image
            source={require("./images/ic_oneid.png")}
            style={{
              width: rootWidth * 0.18,
              height: rootHeight * 0.08,
            }}
          /> */}

          <Image
            source={require('./images/splashim.png')}
            style={{
              width: rootWidth * 0.8,
              height: rootHeight * 0.4,
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
           <Image style={{width: 190,height:50, alignSelf:"center",marginTop:40}} source={require('../images/query.png')}/>
          {/* <Text style={[styles.heading, {color: color_primary}]}> */}
            {/* <Text style={[styles.heading, {color: color_text}]}>
              Conversation
            </Text> */}
            {/* <View></View> */}
          {/* </Text> */}
          <Text
            style={{ 
              fontSize: 14,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Login using OneID
          </Text>
          <Item
            regular
            style={{
              width: '90%',
              alignSelf: 'center',
              paddingStart: 16,
              marginTop: 15,
              borderRadius: 8,
              borderWidth: 2.0,
              borderColor: color_border,
              backgroundColor: '#ffffff',
              elevation: 0.5,
            }}>
            <Icon
              name="user"
              type="antdesign"
              size={20}
              color={color_primary}
            />
            <Input
              placeholderTextColor={color_text}
              placeholder="Email/Phone (0331553***)"
              style={{
                color: color_text,
              }}
              onChangeText={value => this.setState({username: value})}
            />
          </Item>

          <Button
            title="Next"
            loading={this.state.isDataLoading}
            borderRadius={8}
            buttonStyle={{backgroundColor: '#32BECA'}}
            // backgroundColor={color_primary}
            containerStyle={{
              marginTop: 24,
              width: '90%',
              alignSelf: 'center',
            }}
            textStyle={{fontWeight: 'bold'}}
            onPress={() => {
              this.setState({isDataLoading: true});
              this.getUserData();
              Keyboard.dismiss();
            }}
          />

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
            style={{padding: 16}}>
            <Text
              style={{
                flexDirection: 'row',
                fontSize: 15,
                alignSelf: 'center',
              }}>
              Don't have an account?
              <Text
                style={{
                  paddingStart: 2,
                  color: color_primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {` Signup`}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        //  </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    marginTop: 32,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
