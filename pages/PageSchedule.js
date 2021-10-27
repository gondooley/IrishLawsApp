import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import HTML from '../components/HTML';
import * as Database from '../database';

const PageSchedule = (props) => {

  const [schedule, setSchedule] = useState('');
  const [scheduleVisible, setScheduleVisible] = useState(false);

  useEffect(() => {
    Database.fetchSchedule(props.basicInfo["year"],
      props.basicInfo["numberInYear"], props.scheduleNumber)
      .then(data => {
        setSchedule(data.html);
      })
      .catch((error) => {
        setSchedule('Error in trying to get it: ' + error);
      });
  }, []);

  useEffect(() => {
    if (schedule != '') {
      setScheduleVisible(true);
    }
  }, [schedule]);

  return (
    <>
      <Text style={{ color: 'white' }}>
        Schedule display
      </Text>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {scheduleVisible ? <HTML source={schedule} /> : null}
      </ScrollView>
    </>
  );
}

export default PageSchedule;