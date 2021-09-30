import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import * as Database from '../database';

const PageSection = (props) => {

  const [section, setSection] = useState('');
  useEffect(() => {
    Database.fetchSection(1951, 1, 1)
      .then(data => setSection(JSON.stringify(data)))
      .catch((error) => {
        setSection('Error: ' + error);
      });
  }, []);

  return (
    <>
      <Text style={{ color: 'white' }}>
        Law title passed in
      </Text>
      <Text style={{ color: 'black' }}>
        {props.lawTitle}
      </Text>
      <Text style={{ color: 'white' }}>
        Particular section (Section 1 in Number 1 of 1951)
      </Text>
      <Text style={{ color: 'black' }}>
        {section}
      </Text>
    </>
  );
}

export default PageSection;