import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Chat from '../screens/Chat';

const ANIMALS = ['Dog', 'Cat', 'Chicken', 'Dragon', 'Camel'];
const Data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export const ChatList = ({navigation}) => {
  console.log('Chat List Called.');
  // useEffect(() => {
  //   allStory()
  //     .then(resp => {
  //       console.log('Chat' + resp);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // });
  return (
    <View style={{backgroundColor: '#F9F9F9', height: '100%'}}>
      <FlatList
        data={Data}
        // keyExtractor={(item, index) => index.toString()}
        renderItem={animal => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chat');
              }}>
              <View style={styles.listItem}>
                <Avatar
                  size={40}
                  rounded
                  icon={{name: 'rowing'}}
                  containerStyle={{backgroundColor: '#B900F7'}}
                />
                {/* <Avatar size={32} /> */}
                {/* <Text>{animal.item}</Text> */}
                <View style={{marginEnd: '18%', marginLeft: wp('4%')}}>
                  <Text> @gmail.com</Text>
                  <Text>Jhon Vick</Text>
                  <Text> Text Messages</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    padding: 5,
    paddingTop: 100,
  },
  listItem: {
    // backgroundColor: 'orange',
    // borderWidth: 1,
    // borderColor: '#333',
    borderBottomWidth: 0.4,
    padding: 15,
    flexDirection: 'row',
  },
});
