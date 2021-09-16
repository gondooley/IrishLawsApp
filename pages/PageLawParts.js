import React from 'react';
import { Button, Text } from 'react-native';

const PageLawParts = (props) => {
  return (
    <>
      <Text style={{color: 'white'}}>
        Parts of a law
      </Text>
      <Button 
        onPress={() => {
          props.nav('chapters');
        }}
        title="If chapters present: chapters"
        color="#841584"/>
      <Button 
        onPress={() => {
          props.nav('sections');
        }}
        title="If no chapters: sections"
        color="#841584"/>
    </>
  );
}

export default PageLawParts;