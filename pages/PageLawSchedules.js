import React from 'react';
import { Button, Text } from 'react-native';

const PageLawSchedules = (props) => {
  return (
    <>
      <Text style={{color: 'white'}}>
        List of schedules for a law
      </Text>
      <Button 
        onPress={() => {
          props.nav('schedule');
        }}
        title="Particular schedule"
        color="#841584"/>
    </>
  );
}

export default PageLawSchedules;