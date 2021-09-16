import React from 'react';
import { Button, Text } from 'react-native';

const PageDefns = (props) => {
  return (
    <>
      <Text style={{color: 'white'}}>
        Definition search results
      </Text>
      <Button 
        onPress={() => {
          props.nav('section');
        }}
        title="Choose a particular result"
        color="#841584"/>
    </>
  );
}

export default PageDefns;