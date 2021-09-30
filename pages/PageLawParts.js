import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text } from 'react-native';
import * as Database from '../database';

const PageLawParts = (props) => {

  useEffect(() => {
    Database.fetchParts(2014, 38)
    .then(data => {
      console.log('Parts page detects props: ' + Object.keys(props));
      console.log('Parts data returned: ' + Object.keys(data));
      props.setParts(data);
    })
    .catch((error) => {
      props.setParts({ 'Error': error });
    });
  }, []);

  return (
    <>
      <Button
        onPress={() => {
          props.setChapters({ "2": props.partsData["2"] })
          props.nav('chapters');
        }}
        title="If chapters present: chapters"
        color="#841584" />
      <Button
        onPress={() => {
          props.nav('sections');
        }}
        title="If no chapters: sections"
        color="#841584" />
      <ScrollView>
        <Text style={{ color: 'white' }}>
          Parts of a law
        </Text>
        <Text style={{ color: 'black' }}>
          {JSON.stringify(props.partsData)}
        </Text>
      </ScrollView>
    </>
  );
}

export default PageLawParts;