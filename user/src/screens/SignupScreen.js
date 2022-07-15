import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {Text, Input, Button} from '@rneui/themed';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import {useFocusEffect} from '@react-navigation/native';

const SignupScreen = ({navigation}) => {
  const {state, signup, clearErrorMessage} = useContext(AuthContext);

  console.log(state);

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
        headerText="Sign Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <Spacer>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signin');
          }}>
          <Text
            style={{
              color: 'blue',
              fontWeight: '600',
              fontSize: 20,
            }}>
            Already Have Account? Sign in
          </Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
});
