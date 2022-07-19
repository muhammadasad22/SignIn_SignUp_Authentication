import React, {Component} from 'react';
// import {View} from 'react-native';
import {Bars} from 'react-native-loader';

const Loader = props => {
  return (
    <Bars
      size={props.size ? props.size : 10}
      style={{alignSelf: 'center'}}
      color={props.color}
    />
  );
};

export default Loader;
