import React from 'react';
import { Button, Text } from 'react-native';

const PageYearList = (props) => {
  return (
    <>
      <Text style={{color: 'white'}}>
        Year List
      </Text>
      <Button 
        onPress={() => {
          props.nav('lawsInYear');
        }}
        title="Choose a particular year"
        color="#841584"/>
    </>
  );
}

export default PageYearList;