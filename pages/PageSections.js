import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import * as Database from '../database';

const PageSections = (props) => {

  // Ultimately with extract a selection of these
  const [sectionHeadings, setSectionHeadings] = useState({});
  useEffect(() => {
    Database.fetchSectionHeadings(2021, 1)
    .then(data => setSectionHeadings(data))
    .catch((error) => {
      setBasicInfo('Error: ' + error);
    });
  }, []);
  return (
    <>
      <Button 
        onPress={() => {
          props.nav('section');
        }}
        title="Choose a particular section"
        color="#841584"/>
      <Text style={{color: 'white'}}>
        Selected section titles
      </Text>
      <Text style={{color: 'black'}}>
        {JSON.stringify(sectionHeadings)}
      </Text>
    </>
  );
}

export default PageSections;