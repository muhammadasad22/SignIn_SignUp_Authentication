import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {getLogin} from '../config/Preferences';
import {setjwt, setOrgid} from '../config/Api';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getLogin()
        .then(res => {
          console.log('LOGIN DATAAA  ' + JSON.stringify(res));

          if (res == null) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'LoginScreen'}],
              }),
            );
          }
          if (res.STATUS == 'SUCCESSFUL') {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'BottomApp'}],
              }),
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 1000);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../images/spbg.png')}>
        <Image
          style={{
            width: '90%',
            height: '70%',

            alignSelf: 'center',

            margin: 10,

            resizeMode: 'contain',
          }}
          source={require('../images/splashimg.png')}
        />
        <View style={{alignSelf: 'center'}}>
          {/* <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={require('../images/textblue.png')}
          /> */}
           <Image style={{width: 190,height:50, alignSelf:"center",marginTop:40}} source={require('../images/query.png')}/>
          {/* <Text style={{alignSelf: 'center', fontSize: 30}}>
            Converstion App
          </Text> */}
        </View>
      </ImageBackground>
    </View>
  );
};
export default Splash;
