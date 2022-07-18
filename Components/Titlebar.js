import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {Avatar} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {clearAll} from '../config/Preferences';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Titlebar = ({
  navigation,
  title = false,
  backpic = false,
  textimage = false,
  mainmenu = false,
  arrowimage = false,
  headtext = false,
  avater = false,
  textchange,
  nullimage = true,
  optionButton = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectVaule, setselectvaule] = useState([]);
  const [items, setItems] = useState([
    {label: 'Open', value: '0'},
    {label: 'Hold', value: '1'},
    {label: 'wait for assi', value: '2'},
    {label: 'Close', value: '3'},
    {label: 'Read', value: '4'},
    {label: 'UnRead', value: '5'},
  ]);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const logout = () => {
    // this.props.navigation.navigate('LoginScreen');
    clearAll();

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{name: 'SplashScreen'}],
    //   }),
    // );
    navigation.navigate('LoginScreen');
  };

  // const [backpic, setbackpic] = useState(false);
  return (
    <View style={{}}>
      {backpic ? (
        <ImageBackground
          source={require('../images/background.png')}
          style={{
            width: '100%',
            height: 56,
            flexDirection: 'row',
          }}>
          {textimage ? (
            <Image
              style={{height: 40, width: 40, marginTop: 5,marginLeft:8}}
              source={require('../images/text.png')}
            />
          ) : <Image
              style={{
                height: 30,
                width: 30,
                marginTop: 5,
                alignSelf: 'center',
              }}
              source={require('../images/team.png')}
            /> ? null : null}
          {arrowimage ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  marginTop: 10,
                  marginLeft:8,
                  padding: 10,
                }}
                source={require('../images/arrow.png')}
              />
            </TouchableOpacity>
          ) : null}
          {avater ? (
            <View style={{marginTop: 8, marginLeft: 10}}>
              <Avatar
                size={40}
                rounded
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO-p9ThJctQTssrg3-NP4nUFYT_BH-AVQXOw&usqp=CAU',
                }}
              />
            </View>
          ) : null}
          {title ? (
            <Text
              style={{
                color: 'white',
                fontSize: wp('5%'),
                flex: 1,
                textAlign: headtext == true ? 'center' : 'left',
                padding: 10,
                marginLeft:5,
                alignSelf: 'center',
              }}>
              {textchange}
            </Text>
          ) : null}
          {/* {optionButton ? (
            <DropDownPicker
              style={{width: '20%'}}
              dropDownContainerStyle={{
                backgroundColor: '#B3C5E9',
                width: '20%',
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
          ) : null} */}

          {mainmenu ? (
            <Menu
               style={{
                 marginTop:40,
                 
               }}
              visible={visible}
              anchor={
                <TouchableOpacity onPress={showMenu}>
                  <Image
                    source={require('../images/menu.png')}
                    style={{width: 25, height: 25, marginTop: 15,marginRight:10,}}></Image>
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}>
            
              <MenuItem onPress={logout}>Logout</MenuItem>
            </Menu>
          ) : null}
        </ImageBackground>
      ) : (
        <View style={{}}></View>
      )}
    </View>
  );
};
