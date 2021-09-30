import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import * as Database from '../database';

const PageSchedule = (props) => {

  const [schedule, setSchedule] = useState('');
  useEffect(() => {
    console.log(JSON.stringify(props.basicInfo));

    Database.fetchSchedule(props.basicInfo["year"],
      props.basicInfo["numberInYear"], props.scheduleNumber)
      .then(data => {
        setSchedule(data);
      })
      .catch((error) => {
        setSchedule('Error in trying to get it: ' + error);
      });
  }, []);

  return (
    <>
      <Text style={{ color: 'white' }}>
        Schedule display
      </Text>
      <Text style={{ color: 'black' }}>
        {JSON.stringify(schedule)}
      </Text>
    </>
  );
}

export default PageSchedule;