import React from 'react';
import { Button, Text } from 'react-native';

const PageSections = (props) => {
  return (
    <>
      <Text style={{color: 'white'}}>
        Selected section titles
      </Text>
      <Button 
        onPress={() => {
          props.nav('section');
        }}
        title="Choose a particular section"
        color="#841584"/>
    </>
  );
}

export default PageSections;