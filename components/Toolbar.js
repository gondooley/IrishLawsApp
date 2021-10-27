import React from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

const Toolbar = (props) => {

  return (
    <View style={{ height: 56, flexDirection: 'row', justifyContent: 'space-between', elevation: 4, padding: 4 }} >
      {props.searchInputActivated
        ?
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Pressable onPress={() => {
            props.setSearchInputActivated(false);
          }}>
            <View style={{ width: 56, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../images/left_arrow.png')}
                style={{ width: 24, height: 24 }} />
            </View>
          </Pressable>
          <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
            <TextInput
              autoFocus={true}
              autoCapitalize='none'
              onChangeText={text => props.setSearchText(text)}
              value={props.searchText}
              placeholder='Type here'
              placeholderTextColor='#A0A0A0'
              style={{
                flex: 1,
                paddingLeft: 16,
                fontSize: 22,
                color: 'black'
              }}
            />
            <Pressable onPress={() => props.searchRequest()}>
              <View style={{ width: 48, flex: 1, justifyContent: 'center' }}>
                <Image source={require('../images/ic_search.png')}
                  style={{ width: 32, height: 32 }} />
              </View>
            </Pressable>
          </View>
        </View>
        :
        <View style={{
          justifyContent: 'center',
          paddingLeft: 16
        }}>
          <View></View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{props.title}</Text>
        </View>
      }
      <View style={{ flexDirection: 'row' }}>
        {props.searchInputActivated
          ? null : (
            <Pressable onPress={() => props.setSearchInputActivated(true)}>
              <View style={{ width: 48, flex: 1, justifyContent: 'center' }}>
                <Image source={require('../images/ic_search.png')}
                  style={{ width: 32, height: 32 }} />
              </View>
            </Pressable>
          )}
        <Pressable onPress={() => props.modalCallback(true)}>
          <View style={{ width: 32, flex: 1, justifyContent: 'center', marginLeft: 12 }}>
            <Image source={require('../images/3_dots.png')}
              style={{ width: 24, height: 24 }} />
          </View>
        </Pressable>
      </View>
    </View >
  );
}

export default Toolbar;

