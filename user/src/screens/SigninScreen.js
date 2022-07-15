import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SigninScreen = ({navigation}) => {
  const {state, signin, clearErrorMessage} = useContext(AuthContext);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused, onFocus

      return () => {
        // Do something when the screen is unfocused, onBlur
        // Useful for cleanup functions
        clearErrorMessage();
      };
    }, []),
  );
  return (
    <View style={styles.containers}>
      <AuthForm
        headerText="Sign In"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <Spacer>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text
            style={{
              color: 'blue',
              fontSize: 20,
              fontWeight: '600',
            }}>
            Not Registered? Sign up
          </Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
  errorMessage: {
    color: 'red',
  },
});
