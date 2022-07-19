import React, {useEffect} from 'react';
import {StatusBar, Image, Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './src/views/Dashboard';
import Converstion from './src/views/Converstion';
import Team from './src/views/Team';
import Chat from './src/views/Chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Mine from './src/views/Mine';
import Unassined from './src/views/Unassined';
import All from './src/views/All';
import Splash from './src/views/Splash';
import LoginScreen from './src/oneid/LoginScreenMain';
import LoginScreen2 from './src/oneid/LoginScreen2';
import {getLogin} from './src/config/Preferences';
import {setUserData} from './src/config/Api';
import Team1 from './src/views/Team1';
import {View} from 'native-base';

// const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

// function Home() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Mine" component={Mine} />
//       <Tab.Screen name="Unassined" component={Unassined} />
//       <Tab.Screen name="All" component={All} />
//     </Tab.Navigator>
//   );
// }

function App({naviagation}) {
  getLogin()
    .then(res => {
      console.log(res);
      setUserData(res);
    })
    .catch(err => {
      console.log(err.message);
    });
  return (
    <>
      {Platform.OS == 'ios' && (
        <View
          style={{
            minHeight: 40,
            backgroundColor: '#32BECA',
          }}
        />
      )}
      <StatusBar
        animated={true}
        backgroundColor="#32BECA"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen2"
            component={LoginScreen2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomApp"
            component={BottomApp}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{headerShown: false}}
          />

          {/* <Stack.Scre+en name="Settings" component={Settings} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function BottomApp({naviagation}) {
  return (
    <Tab.Navigator
      activeColor="#FFFFFF"
      inactiveColor="#FFFFFF"
      barStyle={{
        backgroundColor: '#32BECA',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        naviagation={naviagation}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image
              source={require('./src/assets/iconImages/dash.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Conversation"
        component={Converstion}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image
              source={require('./src/assets/iconImages/chat.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Team"
        component={Team1}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./images/team.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
export default App;
