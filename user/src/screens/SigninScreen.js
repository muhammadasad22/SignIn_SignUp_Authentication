import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SigninScreen = ({navigation}) => {
  // Question: What happened here using useContext(AuthContext)?
  //Answer: Here we access the data from the context and we use it to signin
  // As we declare all the data in the context, we can access it using useContext
  //we export the data from the AuthContext
  //Using State, SignIn, clearErrorMessage to get data from the context and store it in these variables
  const {state, signin, clearErrorMessage} = useContext(AuthContext);

  //this Hook is used for the clearErrorMessage function
  //we can use this function to clear the error message
  //and can't show it on another screen
  //show only on the current screen
  //Before version 5, they can used the NavigationEvent Listener
  //In current version, we use the userFocusEffect Hook to do the following operation on current screen
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
