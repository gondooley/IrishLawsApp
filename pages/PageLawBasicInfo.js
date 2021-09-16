import React from 'react';
import { Button, Text } from 'react-native';

const PageLawBasicInfo = (props) => {
  return (
    <>
      <Text style={{color: 'white'}}>
        Basic info for a law
      </Text>
      <Button 
        onPress={() => {
          props.nav('parts');
        }}
        title="If law has parts: parts"
        color="#841584"/>
      <Button 
        onPress={() => {
          props.nav('sections');
        }}
        title="If law does not have parts: sections"
        color="#841584"/>
      <Button 
        onPress={() => {
          props.nav('schedules');
        }}
        title="Schedules"
        color="#841584"/>
    </>
  );
}

export default PageLawBasicInfo;