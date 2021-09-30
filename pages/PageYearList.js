import React from 'react';
import { Button, Text } from 'react-native';

// Create an array with all the years as integers
// ([...Array(finishYear - startYear + 1).keys()].map(x => x + startYear)

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