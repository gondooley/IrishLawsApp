import React from 'react';
import { Button, Text } from 'react-native';

const PageLawPartChapters = (props) => {
  return (
    <>
      <Text style={{color: 'white'}}>
        List of chapters in a particular part
      </Text>
      <Button 
        onPress={() => {
          props.nav('sections');
        }}
        title="Sections"
        color="#841584"/>
    </>
  );
}

export default PageLawPartChapters;