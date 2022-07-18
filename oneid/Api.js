import React from 'react';
import axios from 'axios';

export const BASE_URL = 'https://oneid.veevotech.com/';
export const FIND_USER = 'service_api/verify_username';
export const LOGIN = 'auth';
export const OPT_URL = 'web_operations/login_register_ops/login_register_ops';

export const findUser = username => {
  return axios.get(FIND_USER, {
    params: {
      username: username,
    },
    baseURL: BASE_URL,
  });
};

export const sendOtp = username => {
  return axios.get(OPT_URL, {
    params: {
      operation: 'send_otp',
      username: username,
    },
    baseURL: BASE_URL,
  });
};

export const loginUser = payload => {
  return axios.get(LOGIN, {
    params: {
      type: 'password',
      username: payload.username,
      password: payload.password,
      grant_type: payload.grant_type,
      app_id: payload.app_id,
      api: true,
      parent_app_token: payload.parent_app_token,
      client_type: 2,
      auto_redirect: 0,
     device_identifier: '58KRX19228010372',
    },
    baseURL: BASE_URL,
  });
};

export const getAppInstances = payload => { // yeh wali
  alert(JSON.stringify (payload))
  return axios.get(LOGIN, { // end point 
    params: {
      app_id: payload.app_id,
      grant_type: payload.grant_type,
      auto_redirect: 0,
      api: 'true',
      parent_app_token: payload.parent_app_token,
    },

    baseURL: BASE_URL, // yeh kya hai
  })
  .then(res =>{
    // console.log("{vvv",res.data.URL);
    redirectToClientApp(res.data.URL)
     .then(res =>{
        alert("resdirrrrr"+ JSON.stringify(res.data));
     })
      .catch(error =>{
         console.log(error)
      })
    return res;
  })
   
};

export const redirectToClientApp = url => {
  return axios.get(url, {
    headers: {
      'content-type': ' application/json',
    },
  });
};
