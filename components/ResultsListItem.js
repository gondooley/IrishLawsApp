import React from 'react';
import { Pressable, Text, View } from 'react-native';

const ResultsListItem = (props) => {
  
  return (
    <Pressable
      key={props.item}
      onPress={() => {//TODO take care of case where section is a schedule
        props.fillBasicInfo(props.year, props.numberInYear, props.title);
        if (props.sectionNumber.startsWith('schedule')) {
          props.setScheduleNumber(props.sectionNumber.substring(8));
          props.switchPage('schedule');
        } else {
          props.setSelectedSectionNumber(props.sectionNumber);
          props.switchPage('section');
        }
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