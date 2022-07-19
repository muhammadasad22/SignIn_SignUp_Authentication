import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabScreen from '../components/TabScreen';
import {Titlebar} from '../components/Titlebar';
import {setjwt, setOrgid} from '../config/Api';
import {getLogin} from '../config/Preferences';
import {allStory} from '../config/Api';
import {Orgid} from '../config/Api';
import DropDownPicker from 'react-native-dropdown-picker';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {ChatList} from '../Components/ChatList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Tab, TabView} from 'react-native-elements';
import Mine from './Mine';
import All from './All';
import Team from './Team';
import Unassined from './Unassined';
import {fas} from '@fortawesome/free-solid-svg-icons';

const Converstion = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [storydata, setstorydata] = useState();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const [items, setItems] = useState([
    {label: 'Open', value: '0'},
    {label: 'Hold', value: '1'},
    {label: 'Close', value: '3'},
  ]);
  const [display, setdisplay] = useState('All');
  const [selectVaule, setselectvaule] = useState([]);

  const [index, setIndex] = useState(0);
  const [filterData, setfilterdata] = useState('');

  useEffect(() => {
    // console.log('Dashboard Called');
    // allStory()
    //   .then(resp => {
    //     console.log('story data ' + resp);
    //     setstorydata(resp);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, [value, filterData]);

  return (
    <View>
      <Titlebar
        navigation={navigation}
        backpic={true}
        textimage={true}
        // pic={require('../images/text.png')}
        title={true}
        mainmenu={true}
        textchange={'Conversation'}
        optionButton={true}
      />

      <View
        style={{
          height: hp('100%'),
          backgroundColor: 'white',
        }}>
        <Tab
          containerStyle={{
            backgroundColor: 'white',
          }}
          value={index}
          onChange={setIndex}
          indicatorStyle={{
            backgroundColor: '#32BECA',
            height: 2,
          }}

          //  variant="primary"
        >
          <Tab.Item
            title="Mine"
            style={{backgroundColor: 'red'}}
            containerStyle={{
              backgroundColor: 'white',
            }}
            titleStyle={{fontSize: 13, color: '#32BECA', textTransform: 'none'}}
          />

          <Tab.Item
            title="Team"
            containerStyle={{
              backgroundColor: 'white',
            }}
            style={{backgroundColor: 'white'}}
            titleStyle={{fontSize: 13, color: '#32BECA', textTransform: 'none'}}
            indicatorStyle={{
              backgroundColor: '#ffffff',
              height: 2,
            }}
          />

          <Tab.Item
            title="Un-Answered"
            containerStyle={{
              backgroundColor: 'white',
            }}
            style={{backgroundColor: 'white'}}
            titleStyle={{
              fontSize: 13,
              color: '#32BECA',
              textTransform: 'none',
              // disableIndicator: 'true',
            }}
          />
        </Tab>
        <View
          style={{
            padding: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              borderWidth: Platform.OS == 'android' ? 1 : 0.5,
              borderRadius: 10,
              width: wp('70%'),
              height: hp('6%'),
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <TextInput
              placeholder="Search"
              value={filterData}
              onChangeText={setfilterdata}
            />
          </View>

          {/* <TouchableOpacity
            style={{
              alignSelf: 'center',
              borderWidth: 0.5,
              padding: 5,
              backgroundcolor: 'blue',
              marginHorizontal: 30,
            }}
            onPress={() => {}}>
            <Text>pres</Text>
          </TouchableOpacity> */}
          <View
            style={{
              width: wp('20%'),
              height: hp('5%'),
              marginTop: 5,
              marginLeft: wp('4%'),
            }}>
            <Menu
              visible={visible}
              anchor={
                <TouchableOpacity onPress={showMenu}>
                  <View
                    style={{
                      width: wp('20%'),
                      height: hp('5%'),
                      borderWidth: 0.5,
                      borderRadius: 10,
                      backgroundColor: '#65DFEA',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        justifyContent: 'space-around',
                        marginTop: 9,
                      }}>
                      {display}
                    </Text>
                  </View>
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}>
              <MenuItem
                onPress={() => {
                  hideMenu(false), setValue('0'), setdisplay('Open');
                }}>
                Open
              </MenuItem>
              <MenuItem
                onPress={() => {
                  hideMenu(false), setValue('1'), setdisplay('Hold');
                }}>
                Hold
              </MenuItem>
              <MenuItem
                onPress={() => {
                  hideMenu(false), setValue('3'), setdisplay('Close');
                }}>
                Close
              </MenuItem>
            </Menu>
          </View>

          {/* minHeight: open && 220 */}
          {/* <View style={{width:380,minHeight:5 }}>
          <DropDownPicker
            style={{
              width: wp('25%'),
              marginLeft: wp('2%'),
              height:hp('1%')
              
            }}
            dropDownContainerStyle={{
              backgroundColor: '#FFFFFF',
              width: wp('25%'),
              
            }}
            open={open}
            placeholder="All"
            value={value}
            items={items}
            searchable={false}
            setOpen={setOpen}
            setValue={setValue}
            onSelectItem={value => {
              console.log(value);
              setselectvaule([...selectVaule, value]);
              // if (value == 'open') {
              //   let filterdata = storydata.filter(item => item.status == 0);
              //   setstorydata(filterdata);
              // }
            }}
          />
          </View> */}
        </View>
        {/* onMoveShouldSetResponder={(e) => e.stopPropagation()}
onMoveShouldSetResponder={(e) => e.stopPropagation()}
onMoveShouldSetResponder={(e) => e.stopPropagation()} */}
        <TabView value={index} onChange={setIndex}>
          <TabView.Item style={{width: '100%'}}>
            <Mine
              navigation={navigation}
              value={value}
              filterData={filterData}
              index={index}
            />
          </TabView.Item>
          <TabView.Item style={{width: '100%'}}>
            {/* <ChatList navigation={navigation} /> */}
            <Team
              navigation={navigation}
              value={value}
              filterData={filterData}
              index={index}
            />
          </TabView.Item>
          <TabView.Item style={{width: '100%'}}>
            <Unassined
              navigation={navigation}
              value={value}
              filterData={filterData}
              index={index}
            />
          </TabView.Item>
        </TabView>
      </View>
    </View>
  );
};

export default Converstion;
