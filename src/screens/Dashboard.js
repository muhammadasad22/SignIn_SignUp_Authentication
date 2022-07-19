import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Titlebar} from '../components/Titlebar';
import {LineChart} from 'react-native-chart-kit';
import {dashboardData} from '../config/Api';
import {CommonActions} from '@react-navigation/native';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  backgroundGradientTo: '#FFFFFF',
  // backgroundGradientToOpacity: 0.5,
  color: () => '#32BECA',
  // strokeWidth: 1, // optional, default 3
  // barPercentage: 1,
  // useShadowColorFromDataset: false, // optional
};

const Dashboard = ({navigation}) => {
  const [dashdata, setdashdata] = useState('');
  const [isloading, setloading] = useState(true);
  const [opencount, setopoencount] = useState([]);
  const [closecount, setclosecount] = useState([]);
  const [label, setlabel] = useState([]);
  const data = {
    labels: label,
    datasets: [
      {
        data: opencount,
        color: () => '#8B9BB3', // optional
        // strokeWidth: 2, // optional
      },
      {
        data: closecount,
        strokeWidth: 2,
        color: () => '#FFC107',
      },
    ],
    legend: ['Last Query', 'New Query'], // optional
  };

  const reload = () => {
    teamList();
  };
  useEffect(() => {
    teamList();
  }, []);
  const teamList = () => {
    dashboardData()
      .then(res => {
        if (res.status && res.status == 200) {
          setloading(false);
          // alert(JSON.stringify(res.data));
          setdashdata(res.data);
          setopoencount(res.data.graph.openCount);
          setclosecount(res.data.graph.closeCount);
          setlabel(res.data.graph.label);
          // alert(JSON.stringify (res.data.graph.label));
        } else setloading(false);
        if (res.response && res.response.data.message == 'Auth failed') {
          // alert(res.response.data.message);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'LoginScreen'}],
            }),
          );

          return;
        }

        //   if (res.data.message == 'Auth failed') {
        //     setloading(false);
        //   } else {
        //     setdashdata(res.data);
        //     setloading(true);
        //     alert(JSON.stringify(dashdata.openQuery));
        //   }
      })

      .catch(error => {
        setloading(false);
        console.log(error);
        // alert('Dashboard Error => ', error);
      });
  };
  return (
    <View style={{color: '#000000'}}>
      <Titlebar
        backpic={true}
        nullimage={false}
        mainmenu={true}
        arrowimage={false}
        navigation={navigation}
        title={true}
        textchange={'Dashboard'}
        avater={true}
      />

      <View style={{backgroundColor: 'white', height: '100%'}}>
        <ScrollView>
          {isloading ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Loader />
            </View>
          ) : dashdata != '' ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginVertical: '5%',
                }}>
                <View style={{marginRight: '10%'}}>
                  <View
                    style={{
                      width: wp('40%'),
                      height: hp('15%'),
                      borderWidth: 0.5,
                      borderColor: '#FFC107',
                      borderRadius: 10,
                      backgroundColor: '#FFFCE4',
                    }}>
                    <Image
                      style={{
                        width: 31,
                        height: 23,
                        marginLeft: 10,
                        marginVertical: 6,
                      }}
                      source={require('../assets/iconImages/tick1.png')}
                    />

                    <Text
                      style={{
                        alignSelf: 'center',
                        // marginVertical: 10,
                        fontSize: 23,
                        fontWeight: 'bold',
                      }}>
                      {dashdata && dashdata.openQuery}
                    </Text>

                    <Text
                      style={{
                        alignSelf: 'center',

                        color: '#FFC107',
                        fontSize: 15,
                      }}>
                      OpenQuery
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: wp('40%'),
                    height: hp('15%'),
                    borderWidth: 0.5,
                    borderColor: '#8B9BB3',
                    marginLeft: 5,
                    borderRadius: 10,
                    backgroundColor: '#F6F6F6',
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginLeft: 10,
                      marginVertical: 3,
                    }}
                    source={require('../assets/iconImages/up.png')}
                  />
                  <Text
                    style={{
                      alignSelf: 'center',

                      fontSize: 23,
                      fontWeight: 'bold',
                    }}>
                    {dashdata && dashdata.closeQuery}
                  </Text>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: '#8B9BB3',
                    }}>
                    CloseQuery
                  </Text>
                </View>
                {/* <View
                style={{
                  width: wp('30%'),
                  height: hp('12%'),

                  borderWidth: 0.5,
                  borderColor: '#F4B700',
                  marginLeft: 5,
                  borderRadius: 10,
                  backgroundColor: '#FFFCE4',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginVertical: 5,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {dashdata.memberCount}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginVertical: 5,
                    color: '#F4B700',
                  }}>
                  MemberCount
                </Text>
              </View>
            </View> */}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <View style={{marginRight: '10%'}}>
                  <View
                    style={{
                      width: wp('40%'),
                      height: hp('15%'),
                      borderWidth: 0.5,
                      borderColor: '#F071AF',
                      borderRadius: 10,
                      backgroundColor: '#FFF3F9',
                    }}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        marginLeft: 10,
                        marginVertical: 3,
                      }}
                      source={require('../assets/iconImages/user.png')}
                    />
                    <Text
                      style={{
                        alignSelf: 'center',

                        fontSize: 23,
                        fontWeight: 'bold',
                      }}>
                      {dashdata.totalQuery}
                    </Text>

                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 15,
                        color: '#F071AF',
                      }}>
                      TotalQuery
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: wp('40%'),
                    height: hp('15%'),
                    borderWidth: 0.5,
                    borderColor: '#5390C9',
                    marginLeft: 5,
                    borderRadius: 10,
                    backgroundColor: '#F2F9FF',
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginLeft: 10,
                      marginVertical: 3,
                    }}
                    source={require('../assets/iconImages/i.png')}
                  />
                  <Text
                    style={{
                      alignSelf: 'center',
                      // marginVertical: 5,
                      fontSize: 23,
                      fontWeight: 'bold',
                    }}>
                    {dashdata.unanswered}
                  </Text>
                  <Text
                    style={{
                      alignSelf: 'center',
                      //marginVertical: 5,
                      fontSize: 15,
                      color: '#5390C9',
                    }}>
                    UnAnswered
                  </Text>
                </View>
                {/* <View
                style={{
                  width: wp('30%'),
                  height: hp('12%'),
                  borderWidth: 0.5,
                  borderColor: '#8B9BB3',
                  marginLeft: 5,
                  borderRadius: 10,
                  backgroundColor: '#F6F6F6',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginVertical: 5,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {dashdata.teamCount}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginVertical: 5,
                    color: '#8B9BB3',
                  }}>
                  TeamCount
                </Text> */}
              </View>
              <View style={{marginTop: 25}}></View>
              <LineChart
                data={data}
                width={360}
                height={220}
                chartConfig={chartConfig}
                withShadow={false}
                withInnerLines={false}
                withDots={false}
              />

              {/* <View
                style={{
                  borderWidth: 0.5,
                  width: wp('95%'),
                  height: hp('38%'),
                  // backgroundColor:'wheat',
                  marginLeft: 5,
                  marginVertical: '7%',
                  borderRadius: 10,
                  // paddingRight:'20%'
                }}>
               
              </View> */}
            </View>
          ) : (
            <View>
              <Text>No Data Available</Text>
              <TouchableOpacity onPress={reload()}>
                <View>
                  <Text>Try Again Restart Your App</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
export default Dashboard;
