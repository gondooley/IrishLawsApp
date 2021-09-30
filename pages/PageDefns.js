import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text } from 'react-native';
import * as Database from '../database';

const PageDefns = (props) => {

  const [exactDefns, setExactDefns] = useState('');
  const [partialDefns, setPartialDefns] = useState('');
  const [usages, setUsages] = useState('');

  useEffect(() => {
    Database.fetchExactDefns(props.searchText)
      .then(data => setExactDefns(JSON.stringify(data)))
      .catch((error) => {
        setExactDefns('Error: ' + error);
      });
    Database.fetchPartialDefns(props.searchText)
      .then(data => setPartialDefns(JSON.stringify(data)))
      .catch((error) => {
        setPartialDefns('Error: ' + error);
      });
    Database.fetchUsages(props.searchText)
      .then(data => setUsages(JSON.stringify(data)))
      .catch((error) => {
        setUsages('Error: ' + error);
      });
  }, []);


  const [titlesInYear, setTitlesInYear] = useState('');
  Database.fetchLawTitles(2021)
    .then(data => setTitlesInYear(JSON.stringify(data)))
    .catch((error) => {
      setTitlesInYear('Error: ' + error);
    });

  props.setLawTitle('Particular law title set in Defns Page');

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
      <ScrollView>
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>Exact definitions</Text>
        <Text style={{ color: 'black' }}>
          {exactDefns}
        </Text>
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>Partial definitions</Text>
        <Text style={{ color: 'black' }}>
          {partialDefns}
        </Text>
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>Usages</Text>
        <Text style={{ color: 'black' }}>
          {usages}
        </Text>
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>Titles in 2021</Text>
        <Text style={{ color: 'black' }}>
          {titlesInYear}
        </Text>
      </ScrollView>
    </>
  );
}

export default PageDefns;