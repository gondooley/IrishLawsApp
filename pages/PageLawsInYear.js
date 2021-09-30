import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import * as Database from '../database'

const PageLawsInYear = (props) => {
  const [titlesInYear, setTitlesInYear] = useState('');
  useEffect(() => {
    Database.fetchLawTitles(2021)
      .then(data => setTitlesInYear(JSON.stringify(data)))
      .catch((error) => {
        setTitlesInYear('Error: ' + error);
      });
  }, []);

  return (
    <>
      <Button
        onPress={() => {
          props.nav('basicInfo');
        }}
        title="A particular law"
        color="#841584" />
      <Text style={{ color: 'white' }}>
        Laws in 2021
      </Text>
      <Text style={{ color: 'black' }}>
        {titlesInYear}
      </Text>
    </>
  );
}

export default PageLawsInYear;