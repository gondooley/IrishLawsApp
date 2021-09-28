import React, { useState } from 'react';
import { Button, Text } from 'react-native';

const PageDefns = (props) => {

  const [dataReturned, setDataReturned] = useState('');
  fetch('https://levelhead.ie/scope/exact?searchTerm=' + props.searchText,
    {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => setDataReturned(JSON.stringify(data)))
    .catch((error) => {
      setDataReturned('Error: ' + error);
    });

  return (
    <>
      <Text style={{ color: 'white' }}>
        Definition search results. Search text: {props.searchText}
      </Text>
      <Button
        onPress={() => {
          props.nav('section');
        }}
        title="Choose a particular result"
        color="#841584" />
        <Text style={{ color: 'black'}}>
          {dataReturned}
        </Text>
    </>
  );
}

export default PageDefns;