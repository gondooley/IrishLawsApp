import React from 'react';
import { Button, Text } from 'react-native';

const PageLawsInYear = (props) => {
  return (
    <>
      <Text style={{color: 'white'}}>
        Laws in year
      </Text>
      <Button 
        onPress={() => {
          props.nav('basicInfo');
        }}
        title="A particular law"
        color="#841584"/>
    </>
  );
}

export default PageLawsInYear;