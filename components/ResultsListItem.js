import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const ResultsListItem = (props) => {
  
  return (
    <Pressable
      key={props.item}
      onPress={() => {//TODO
      }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{
          backgroundColor: 'gray',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text>{props.text}</Text>
        </View>
        <View style={{ backgroundColor: 'white' }}>
        </View>
      </View>
    </Pressable>
  );
}

export default ResultsListItem;