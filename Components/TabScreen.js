import React, {useState} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Mine from '../screens/Mine';
import Unassined from '../screens/Unassined';
import All from '../screens/All';
import {View} from 'react-native';
import {Tab, Text, TabView} from 'react-native-elements';
import {ChatList} from '../Components/ChatList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TabScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);

  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Mine" component={Mine} />
    //   <Tab.Screen name="Unassined" component={Unassined} />
    //   <Tab.Screen name="All" component={All} />
    // </Tab.Navigator>
    <View
      style={{
        height: hp('100%'),
      }}>
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={{
          backgroundColor: '#32BECA',
          height: 2,
        }}

        // variant="primary"
      >
        <Tab.Item
          title="Mine"
          titleStyle={{fontSize: 13, color: 'green', textTransform: 'none'}}
        />
        <Tab.Item
          title="Team"
          titleStyle={{fontSize: 13, color: '#32BECA', textTransform: 'none'}}
        />
        <Tab.Item
          title=""
          titleStyle={{fontSize: 13, color: '#32BECA', textTransform: 'none'}}
        />
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{width: '100%'}}>
          <ChatList navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <ChatList navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <ChatList navigation={navigation} />
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default TabScreen;
