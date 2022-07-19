import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';

import {rootWidth, rootHeight} from '../config/Dimensions';
import {Bubbles} from 'react-native-loader';
import {colorPrimary} from '../config/theme';
import {appID} from './Constants';

export default class MyWeb extends Component {
  IndicatorLoadingView() {
    return (
      <View style={styles.IndicatorStyle}>
        <Bubbles size={16} color={colorPrimary} />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: rootHeight,
          width: rootWidth,
          backgroundColor: 'white',
        }}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />

        <WebView
          style={{
            marginTop: 24,
          }}
          source={{
            uri:
              'https://oneid.veevotech.com/logout?app_id' +
              appID +
              '&action=register',
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={this.IndicatorLoadingView}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  IndicatorStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
