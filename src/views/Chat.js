import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  FlatList,
  ImageBackground,
  RCTView,
  useWindowDimensions,
  TouchableOpacity,
  RefreshControl,
  Linking,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {clearAll} from '../config/Preferences';
import {Titlebar} from '../components/Titlebar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {allChat} from '../config/Api';
import RenderHtml from 'react-native-render-html';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WebView from 'react-native-webview';
import axios from 'axios';
import {jwtToken} from '../config/Api';
import {
  sendMessage,
  statusChange,
  filePost,
  TeamList,
  shareStory,
} from '../config/Api';
import {userData, imageRead} from '../config/Api';
import {connect, io} from 'socket.io-client';
import {socket} from '../../Socket';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';
import moment from 'moment';

const Chat = ({route, navigation}) => {
  const [chatData, setchatdata] = useState('');
  const [chatList, setChatList] = useState('');
  const {storyid, profile, statusStory} = route.params;
  const [sendText, setsendText] = useState('');
  const [status, setStatus] = useState(false);
  const [messages, setMessages] = useState([]);

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const hideMenu = () => setVisible(false);
  const hideMenu1 = () => setVisible1(false);
  const [open, setOpen] = useState(0);
  const showMenu = () => setVisible(true);
  const showMenu1 = () => setVisible1(true);
  const [txtedit, settxt] = useState(true);
  const [attstatus, setattstatus] = useState(false);
  const [disstatus, setdisstatus] = useState();
  const [chatname, setchatname] = useState();

  const [share, setshare] = useState();

  //File Attcach
  // const [fileResponse, setFileResponse] = useState([]);

  // const handleDocumentSelection = useCallback(async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       presentationStyle: 'fullScreen',
  //     });
  //     setFileResponse(response);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }, []);

  const getFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.allFiles,
      });
      console.log('file Data' + JSON.stringify(res));
      filePost(res[0], storyid, profile);
    } catch (error) {
      console.log(error);
    }
  };
  // const validateFileSize = (size, type) => {
  //   const sizeInMB = size / 1024 / 1024;
  //   if (sizeInMB <= 5 && type == 'IMAGE') return true;
  //   else if (sizeInMB <= 16 && type == 'AUDIO') return true;
  //   else if (sizeInMB <= 16 && type == 'VIDEO') return true;
  //   else if (sizeInMB <= 100 && type == 'FILE') return true;
  //   else return false;
  // };
  useEffect(() => {
    socket.on('waStatus', Status => {
      if (Status.type == '') {
        console.log('New Sockect' + Status);
      }
    });

    socket.emit('join', {jwt: userData.jwt});
    const socketHandler = chatMessage => {
      if (chatMessage.storyId != storyid) return;
      if (chatMessage.attachments) {
        // console.log('imagedata', chatMessage);
        imageRead(chatMessage._id)
          .then(res => {
            console.log(res.data);
            chatMessage.attach_file = res.data;
            setChatList(chatList => [chatMessage, ...chatList]);
          })
          .catch(err => {
            console.log(err);
          });
        return;
      }
      setChatList(chatList => [chatMessage, ...chatList]);
    };
    socket.on('connect', () => {
      console.log('Chat connected'); // x8WIv7-mJelg7on_ALbx
    });
    // alert(userData.jwt);
    //chainging here messages
    // alert(Orgid);
    allChat(storyid)
      .then(res => {
        // console.log('Data Type' + res.data.chat);
        setchatdata(res.data);
        setChatList(res.data.chat);
        // alert(JSON.stringify(res.data.chat[0].attach_file[0].url));
        // console.log(JSON.stringify(res.data.story, null, 2));
        setchatname(res.data.story.initiatorContactId.name);
        setdisstatus(res.data.story.status);
        return;
      })
      .catch(error => {
        console.log(error);
      });

    // console.log('..............');
    socket.on(userData.org_oneid, socketHandler);

    return () => {
      socket.off('connect', socketHandler);
    };
  }, []);

  useEffect(() => {
    console.log('Socket Chat Data => ', chatList[0]);
  }, [chatList]);

  const nextPage = (url, token) => {
    return axios({
      headers: {
        Authorization: `bearar ${token}`,
      },
      baseURL: url,
    })
      .then(res => {
        let newData = res.data.chat;

        let prevData = chatList;

        let data = [...prevData, ...newData];
        setChatList(data);
        //alert(JSON.stringify(data, null, 2));
      })

      .catch(error => {
        console.log(error);
      });
  };
  const getHtml = item => {
    let data = JSON.parse(item.message);
    if (data.text.startsWith('<')) {
      return (
        <View style={{borderWidth: 0.1, width: '100%'}}>
          <Text> {'Subject : ' + data.subject}</Text>
          {/* {console.log("BIG ERROR"+ JSON.stringify(data,null,2))} */}
          <RenderHtml source={{html: data.text}} />
        </View>
      );
    }
    if (item.oneId == '-1') {
      return <MessageView message={data.text} />;
    } else {
      return <Sender message={data.text} />;
    }
  };
  // alert(storyid);

  const DisplayStauts = () => {
    switch (disstatus) {
      case 0:
        return <Text>Open</Text>;
      case 1:
        return <Text> Hold</Text>;
      case 2:
        return <Text>UnAssigned </Text>;
      case 3:
        return <Text>Close</Text>;
      default:
        <Text></Text>;
        return;
    }
  };

  const storyShare = data => {
    shareStory(storyid, data)
      .then(res => {
        // alert(JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    TeamList()
      .then(res => {
        // alert(JSON.stringify(res.data));
        setshare(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
      }}>
      <Titlebar
        backpic={true}
        nullimage={false}
        mainmenu={true}
        arrowimage={true}
        navigation={navigation}
        title={true}
        textchange={chatname}
        //avater={true}
      />
      <View
        style={{
          backgroundColor: '#F6F7FB',
          width: wp('100%'),
        }}>
        <Text
          style={{
            alignItems: 'center',
            position: 'absolute',
            marginVertical: 10,
            padding: 5,
            marginLeft: 5,
          }}>
          {/* {alert(DisplayStauts())} */}

          {DisplayStauts()}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // width: wp('80%'),
            alignSelf: 'flex-end',
            marginVertical: 10,
          }}>
          <Menu
            style={{
              marginTop: 40,
            }}
            visible={visible}
            anchor={
              <TouchableOpacity onPress={showMenu}>
                <View
                  style={{
                    marginRight: 9,
                    borderRadius: 5,
                    backgroundColor: '#32BECA',
                  }}>
                  <Text
                    style={{textAlign: 'center', padding: 5, color: 'white'}}>
                    Change Status
                  </Text>
                </View>
              </TouchableOpacity>
            }
            onRequestClose={hideMenu}>
            <MenuItem
              onPress={() => {
                setdisstatus(0);
                hideMenu(false);
                statusChange(storyid, '0');
              }}>
              Open
            </MenuItem>
            <MenuItem
              onPress={() => {
                setdisstatus(1);
                hideMenu(false);
                statusChange(storyid, '1');
              }}>
              Hold
            </MenuItem>

            <MenuItem
              onPress={() => {
                setdisstatus(2);
                hideMenu(false);
                statusChange(storyid, '2');
              }}>
              UnAssigned
            </MenuItem>

            <MenuItem
              onPress={() => {
                setdisstatus(3);
                hideMenu(false);
                statusChange(storyid, '3');
                settxt(false);
                setattstatus(true);
              }}>
              Close
            </MenuItem>
            {/* <MenuItem onPress={logout}>Logout</MenuItem> */}
          </Menu>
          <Menu
            style={{
              marginTop: 40,
            }}
            visible={visible1}
            anchor={
              <TouchableOpacity onPress={showMenu1}>
                <View
                  style={{
                    marginRight: 10,

                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: '#32BECA',
                  }}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Share
                  </Text>
                </View>
              </TouchableOpacity>
            }
            onRequestClose={hideMenu1}>
            <ScrollView style={{height: 100}}>
              {share &&
                share.map((item, index) => (
                  <MenuItem
                    onPress={() => {
                      hideMenu1;
                      storyShare(item._id);
                    }}>
                    {item.title.toUpperCase()}
                  </MenuItem>
                ))}
            </ScrollView>

            {/* <MenuItem onPress={logout}>Logout</MenuItem> */}
          </Menu>
          {/* {fileResponse.map((file, index) => (
          <Text
            key={index.toString()}
            // style={styles.uri}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            {file?.uri}
          </Text>
        ))} */}
          {/* <Button title="Select 📑" onPress={getFile} /> */}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: wp('100%'),
          paddingHorizontal: 16,
          flexDirection: 'column-reverse',
          paddingVertical: 16,
        }}>
        <FlatList
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={false}
          initialNumToRender={10}
          windowSize={21}
          keyExtractor={(item, index) => index.toString()}
          //extraData={status}
          //refreshing={status}
          inverted
          onEndReached={number => {
            let url = chatData.next;
            if (url == undefined) return;
            // alert('End Reached...');
            nextPage(url, userData.jwt);
          }}
          data={chatList}
          renderItem={({item, index}) => (
            <View style={{}}>
              {/* <Text>{item._id}</Text> */}
              {/* {console.log(JSON.stringify(item))} */}
              {/* <View
            style={{
              height: hp('8%'),
              width: wp('54%'),
              backgroundColor: '#F6F7FB',
              padding: 10,
              marginLeft: wp('5%'),
              borderRadius: 14,
              borderTopLeftRadius: 0,
              justifyContent: 'center',
            }}></View> */}
              {chatData.story.tpOptedInboxId.tpInboxProfile._id == '1' ? (
                // TODO
                getHtml(item)
              ) : item.oneId != '-1' ? (
                <MessageView data={item} sender={true} />
              ) : (
                <MessageView data={item} sender={false} />
              )}

              {/* {console.log('here' + getHtml(item.message))} */}
            </View>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
          alignItems: 'center',
        }}>
        {disstatus == 3 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 0.5,
                width: wp('70%'),
                height: hp('7%'),
                justifyContent: 'center',
                paddingHorizontal: 8,
                borderRadius: 30,
              }}>
              {statusStory > Math.floor(Date.now() / 1000) ? (
                <TextInput
                  placeholder="Type Here"
                  multiline={true}
                  onChangeText={setsendText}
                  value={sendText}
                  numberOfLines={3}
                  editable={false}
                  underlineColorAndroid="transparent"
                  borderWidth={0}></TextInput>
              ) : (
                <View>
                  <Text>Time was expired</Text>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={getFile} disabled={true}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 5,
                }}
                source={require('../assets/iconImages/attach.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={true}
              onPress={() => {
                // alert(profile);
                sendMessage(sendText, storyid, profile)
                  .then(res => {
                    // console.log(
                    //   'Send Message Response => ' + JSON.stringify(res.data),
                    // );
                    setsendText('');

                    //todo
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 5,
                }}
                source={require('../assets/iconImages/sendtext.png')}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 0.5,
                width: wp('70%'),
                height: hp('7%'),
                justifyContent: 'center',
                paddingHorizontal: 8,
                borderRadius: 30,
              }}>
              {statusStory > Math.floor(Date.now() / 1000) ? (
                <TextInput
                  placeholder="Type Here"
                  multiline={true}
                  onChangeText={setsendText}
                  value={sendText}
                  numberOfLines={3}
                  editable={txtedit}
                  underlineColorAndroid="transparent"
                  borderWidth={0}></TextInput>
              ) : (
                <View>
                  <Text style={{marginTop: 10, padding: 5}}>
                    {' '}
                    Time was expired
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={getFile} disabled={false}>
              <Image
                style={{
                  width: 25,
                  height: 25,

                  marginLeft: 5,
                }}
                source={require('../assets/iconImages/attach.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={false}
              onPress={() => {
                // alert(profile);
                sendMessage(sendText, storyid, profile)
                  .then(res => {
                    // console.log(
                    //   'Send Message Response => ' + JSON.stringify(res.data),
                    // );
                    setsendText('');

                    //todo
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,

                  marginLeft: 5,
                }}
                source={require('../assets/iconImages/sendtext.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default Chat;

export const MessageView = ({data, sender}) => {
  const getAttachmentView = (type, url) => {
    switch (type) {
      case 'IMAGE':
        return (
          <View style={{marginTop: 10}}>
            <Image
              style={{
                width: 300,
                height: 300,
                alignSelf: sender ? 'flex-end' : 'flex-start',
              }}
              source={{uri: `${url}`}}
            />
          </View>
        );
      case 'VIDEO':
        return (
          <View>
            <Video
              source={{uri: url}} // Can be a URL or a local file.
              ref={ref => {
                this.player = ref;
              }} // Store reference
              //controls={true}
              //onBuffer={this.onBuffer} // Callback when remote video is buffering
              //onError={this.videoError} // Callback when video cannot be loaded
              style={{
                width: 300,
                height: 300,
                margin: 8,
              }}
            />
          </View>
        );
      // case 'AUDIO':
      //   return (
      //     <View>
      //       <Video
      //         source={{uri: url}} // Can be a URL or a local file.
      //         ref={ref => {
      //           this.player = ref;
      //         }} // Store reference
      //         // audioOnly={true}
      //         controls={true}
      //         //onBuffer={this.onBuffer} // Callback when remote video is buffering
      //         //onError={this.videoError} // Callback when video cannot be loaded
      //         style={{
      //           width: 300,
      //           height: 300,
      //           margin: 8,
      //         }}
      //       />
      //     </View>
      //   );
    }
  };
  return (
    <View>
      {/* {console.log(' here ' + JSON.stringify(data.attachments))} */}
      {data.attachments == true && data.attach_file.length > 0 ? (
        getAttachmentView(data.attach_file[0].type, data.attach_file[0].url)
      ) : (
        <View
          style={{
            backgroundColor: sender ? '#32BECA' : '#D5DDFC',
            paddingHorizontal: 16,
            paddingVertical: 8,
            alignSelf: sender ? 'flex-end' : 'flex-start',
            borderRadius: 14,
            marginEnd: sender ? 0 : 100,
            marginTop: 10,
            marginStart: sender ? 100 : 0,
            // marginLeft: sender ? 0 : 100,
            borderTopLeftRadius: sender ? 10 : 0,
            borderBottomRightRadius: sender ? 0 : 10,
            justifyContent: 'center',
          }}>
          <Text style={{color: sender ? '#F3F3F5' : '#070707'}}>
            {data.message}
          </Text>
          <Text> {moment(data.entryTime).format('LT')} </Text>
        </View>
      )}
    </View>
  );
};

export const Sender = ({data}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#CFD7E9',
          justifyContent: 'center',
          marginVertical: 10,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 14,
          borderBottomRightRadius: 0,
          alignSelf: 'flex-end',
          marginStart: 100,
        }}>
        <Text style={{color: 'white'}}>{data.message}</Text>
        <Text> {moment(data.entryTime).format('LT')} </Text>
        {/* <Text>storyId: {storyid}</Text> */}
      </View>
    </View>
  );
};
