import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Titlebar} from '../Components/Titlebar';
import DropDownPicker from 'react-native-dropdown-picker';

const Team1 = navigation => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [selectItem, setselectItem] = useState([]);

  const delet = index => {
    let data = selectItem;
    data.splice(index, 1);
    //data.splice(index, 1);

    setselectItem([...data]);
    // alert(index);
  };

  useEffect(() => {});

  const [items, setItems] = useState([
    {label: 'Open', value: '0'},
    {label: 'Hold', value: '1'},
    {label: 'Close', value: '3'},
    {label: 'UnRead', value: '4'},
  ]);
  return (
    <View>
      <Titlebar
        backpic={true}
        nullimage={false}
        mainmenu={true}
        arrowimage={true}
        navigation={navigation}
        title={true}
        textchange={'Team'}
        // avater={true}
      />
      <Text> heyy</Text>
      <DropDownPicker
        style={{
          width: '25%',
          marginLeft: 9,
          height: 1,
        }}
        dropDownContainerStyle={{
          backgroundColor: '#FFFFFF',
          width: '30%',
        }}
        open={open}
        placeholder="All"
        value={value}
        items={items}
        searchable={false}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={item => {
          setselectItem([...selectItem, item.value]);
          //   alert(selectItem);

          //console.log(item);
        }}

        //   setselectvaule([...selectVaule, value]);
        // if (value == 'open') {
        //   let filterdata = storydata.filter(item => item.status == 0);
        //   setstorydata(filterdata);
        // }
      />
      {selectItem.map((item, index) => {
        return (
          <View key={index} style={{marginVertical: 50}}>
            <View>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => delet(index)}>
                <Text>PRresssssss</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Team1;
