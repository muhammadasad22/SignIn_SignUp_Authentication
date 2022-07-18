import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signup':
      return {token: action.payload, errorMessage: ''};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    default:
      return state;
  }
};

//if the user already registered and he want to signin
//so this function will check if already registered
//So go to HomeScreen, otherwise go to SignupScreen
const tryLocalSignin = dispatch => {};

//This function will be used to clear the error message and can't show it on another screen
//show only on the current screen
const clearErrorMessage = dispatch => {
  return () => {
    dispatch({type: 'clear_error_message'});
  };
};

const signup = dispatch => {
  return async ({email, password}) => {
    try {
      const response = await trackerApi.post('/signup', {email, password});
      // console.log(response.data);
      // now we want to add this token to our device using asyncstorage
      // we can use the key 'token' and the value of the token
      await AsyncStorage.setItem('token', response.data.token);
      // now we want to update the state with the token
      dispatch({type: 'signup', payload: response.data.token});
      // now we want to navigate to the main flow of the app
      // we can use the key 'reset' and the value of the token
      alert('Data Added in Database Successfully, Now you can Signin');
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Already Registered',
      });
    }
    //Make APi request to signup with that email and password
    //If successful, modify our state, and say we're authenticated
    //If not successful, we need to show an error message
  };
};

const signin = dispatch => {
  return async ({email, password}) => {
    //Try to signin
    try {
      const response = await trackerApi.post('/signin', {email, password});
      console.log('Hello');
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'signin', payload: response.data.token});

      alert('Signin Successful');
      // <Toast
      //   style={{backgroundColor: '#ff0000'}}
      //   textStyle={{color: '#fff'}}
      //   text="Successfully Signed In"
      // />;
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'add_error',
        payload: 'Invalid Email or Password',
      });
    }
    //handle success by updating state
    //handle failure by showing error message
  };
};

const signout = dispatch => {
  return () => {
    //Remove token from state
  };
};
export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signup, signout, clearErrorMessage},
  {
    token: null,
    errorMessage: '',
  },
);
