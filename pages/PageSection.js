import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import HTML from '../components/HTML'
import * as Database from '../database';

const PageSection = (props) => {

  const [section, setSection] = useState('');
  useEffect(() => {
    Database.fetchSection(props.basicInfo.year, props.basicInfo.numberInYear, props.selectedSectionNumber)
      .then(data => setSection(data.html))
      .catch((error) => {
        setSection('Error: ' + error);
      });
  }, []);

  return (
    <>
      <Text style={{ color: 'white' }}>
        {props.basicInfo.title}
      </Text>
      <Text style={{ color: 'white' }}>
        Particular section
      </Text>
      <HTML source={section} />
    </>
  );
}

export default PageSection;