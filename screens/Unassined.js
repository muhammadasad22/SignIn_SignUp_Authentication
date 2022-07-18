import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {allStory, filterCall, unassingList} from '../config/Api';
import {ChatList} from '../Components/ChatList';
import {getLogin} from '../config/Preferences';
import {setjwt} from '../config/Api';
import moment from 'moment';
import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {userData, readStatus} from '../config/Api';
import {socket} from '../Socket';
import {CommonActions} from '@react-navigation/native';
import {clearAll} from '../config/Preferences';
import Loader from '../Components/Loader';

const Unassined = ({navigation, value, filterData, index}) => {
  const [listStory, setliststory] = useState([]);
  const [listStoryTemp, setliststoryTemp] = useState([]);
  const [count, setcount] = useState(1);
  const [Status, setStatus] = useState(false);
  const [isloading, setloading] = useState(true);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getStory();
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const updateData = storyMessage => {
    // let obj = {};
    // let mData = listStoryTemp.stories.filter((item, index) => {
    //   if (item._id == storyMessage.storyId) {
    //     obj = item;
    //   }
    //   return item._id != storyMessage.storyId;
    // });
    // mData.push(obj);
    // alert(JSON.stringify(mData));
  };
  useEffect(() => {
    // alert(value);
    socket.emit('join', {jwt: userData.jwt});
    const socketHandler = storyMessage => {
      //alert('Story Called...');

      //() => updateData(storyMessage);
      // let obj = {};
      // let mData = listStoryTemp.stories.filter((item, index) => {
      //   if (item._id == storyMessage.storyId) {
      //     obj = item;
      //   }

      //   return item._id != storyMessage.storyId;
      // });
      // mData.push(obj);

      // alert(JSON.stringify(mData));

      console.log('Story Message Socket => ' + JSON.stringify(storyMessage));
      getStory();
    };
    socket.on('connect', () => {
      console.log('Story connected'); // x8WIv7-mJelg7on_ALbx
    });
    getStory();

    socket.on(userData.org_oneid, socketHandler);

    return () => {
      socket.off('connect', socketHandler);
    };
  }, [value]);

  useEffect(() => {
    if (index == 2) {
      SearchData();
    }
  }, [filterData]);

  const getStory = () => {
    // alert('filter' + filterData);

    if (value == 0) {
      // let data = tempData.filter(item => item.status == value);

      filterCall({status: 0})
        .then(res => {
          //alert(JSON.stringify(res.data.stories));

          setliststory(res.data);
        })
        .catch(error => {
          console.log(error);
        });
      // setliststory(filterdata);
      return;
    }

    if (value == 1) {
      // let data = tempData.filter(item => item.unreadCount == 0);
      filterCall({status: 1}).then(res => {
        setliststory(res.data);
      });

      return;
    }
    if (value == 3) {
      // let data = tempData.filter(item => item.unreadCount > 0);
      filterCall({status: '3'}).then(res => {
        setliststory(res.data);
      });

      return;
    }
    // if (value == 4) {
    //   filterCall({unread: 1}).then(res => {
    //     setliststory(res.data.stories);
    //   });
    // }

    unassingList()
      .then(resp => {
        setloading(false);
        // console.log('Story' + JSON.stringify(resp.data, null, 2));

        // alert('Alert' + JSON.stringify(resp.data[0].entryTime));
        // if (resp == undefined) {
        //   clearAll();
        //   navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [{name: 'Splash'}],
        //     }),
        //   );
        // }

        // alert(JSON.stringify(resp.data.stories, null, 2));
        console.log('dxdiag => ' + JSON.stringify(resp.data.stories));

        setliststory(resp.data);
        setliststoryTemp(resp.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const nextPage = (url, token) => {
    // alert('asdhgasjdasdgadj' + url);
    return axios({
      headers: {
        Authorization: `bearar ${token}`,
      },
      baseURL: url,
    })
      .then(res => {
        // alert(JSON.stringify(res.data.stories));
        let newData = res.data.stories;

        let prevData = listStory.stories;

        let data = [...prevData, ...newData];

        // alert(JSON.stringify(data));
        setliststory({stories: data});
        // alert(JSON.stringify(data, null, 2));
      })

      .catch(error => {
        console.log(error);
      });
  };
  const SearchData = () => {
    var tempData = listStoryTemp.stories;

    //alert(JSON.stringify(tempData));
    //return console.log( "MData" + JSON.stringify(listStoryTemp));
    if (filterData == '' && listStoryTemp.length > 0) {
      setliststory(listStoryTemp);
      return;
    }
    if (filterData != '') {
      let data = tempData.filter(item => {
        //alert(filterData);
        console.log(item.initiatorContactId.name);
        return item.initiatorContactId.name
          .toLowerCase()
          .includes(filterData.toLowerCase());
      });
      setliststory({stories: data});
      return;
    }
  };
  return (
    <View style={{backgroundColor: '#ffffff'}}>
      {isloading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Loader />
        </View>
      ) : (
        <View style={{backgroundColor: '#F9F9F9'}}>
          <FlatList
            // onEndReached={number => {
            //   let url = 'https://queryq.veevotech.com/inbox/story?page=' + count;
            //   if (url != undefined) {
            //     // alert(JSON.stringify(number));
            //     let num = count;
            //     num++;
            //     setcount(num);
            //     alert(num);
            //   }

            //   nextPage(url, userData.jwt);
            // }}
            onEndReached={number => {
              let url = listStory.next;
              // alert('yyyyyyyyyy' + url);
              if (url == undefined) return;
              //  alert('End Reached...');
              nextPage(url, userData.jwt);
            }}
            data={listStory.stories}
            contentContainerStyle={
              {
                 paddingBottom: '40%',
              }
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  getStory();
                  let storyid = item._id;
                  let profile = item.tpOptedInboxId.tpInboxProfile._id;
                  let statusStory = item.expiration;
                  // alert(statusStory);
                  readStatus(storyid)
                    .then(res => {
                      console.log(
                        'Read Status Res ' + JSON.stringify(res.data),
                      );
                    })
                    .catch(err => {
                      console.log('Read Status Err ' + err);
                    });

                  // allStory(storyid);
                  // alert(statusStory);
                  navigation.navigate('Chat', {
                    storyid,
                    profile,
                    statusStory,
                  });
                }}>
                <View style={styles.listItem}>
                  <Image
                    style={{width: 50, height: 50, borderRadius: 40}}
                    source={{
                      uri: `${
                        item.initiatorContactId.dpLink == '0'
                          ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzZ_l9f31RLTjwVTR11tw-XsFicjzkRhj7QQ&usqp=CAU'
                          : item.initiatorContactId.dpLink
                      }`,
                    }}
                  />

                  <View
                    style={{
                      marginEnd: '18%',
                      marginLeft: wp('3%'),
                      flex: 1,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name={
                          item.tpOptedInboxId.tpInboxProfile._id == '1'
                            ? 'envelope'
                            : item.tpOptedInboxId.tpInboxProfile._id == '2'
                            ? 'facebook'
                            : 'whatsapp'
                        }
                        size={15}
                        color="blue"
                      />
                      <Text style={{marginLeft: 6}}>
                        {item.tpOptedInboxId.label}
                      </Text>
                    </View>

                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      {item.initiatorContactId.name}
                    </Text>
                    <Text style={{width: wp('76%')}}>
                      {item.lastMessage.length < 50
                        ? item.lastMessage
                        : item.lastMessage.substring(0, 50) + '...'}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '150%',
                      height: '40%',

                      flex: 1,
                    }}>
                    <Text style={{alignSelf: 'flex-end'}}>
                      {moment(item.updateTime * 1000).fromNow()}
                    </Text>
                    {item.unreadCount == 0 ? null : (
                      <Text
                        style={{
                          alignSelf: 'center',
                          marginTop: 4,
                          backgroundColor: '#BFF2CA',
                          width: 20,
                          // borderRadius: 5,
                        }}>
                        {item.unreadCount}
                      </Text>
                    )}
                  </View>

                  {/* <FontAwesomeIcon icon="fa-solid fa-book-sparkles" /> */}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Unassined;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    padding: 10,
    height: '100%',
    paddingTop: 100,
  },
  listItem: {
    // backgroundColor: 'orange',
    // borderWidth: 1,
    // borderColor: '#333',
    borderBottomWidth: 0.4,
    padding: 25,
    flexDirection: 'row',
  },
});
