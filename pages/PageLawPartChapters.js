import React from 'react';
import { Button, Text } from 'react-native';

const PageLawPartChapters = (props) => {

  return (
    <>
      <Button 
        onPress={() => {
          props.nav('sections');
        }}
        title="Sections"
        color="#841584"/>
      <Text style={{color: 'white'}}>
        List of chapters in a particular part
      </Text>
      <Text style={{color: 'black'}}>
        {JSON.stringify(props.chapters)}
      </Text>
    </>
  );
}

export default PageLawPartChapters;