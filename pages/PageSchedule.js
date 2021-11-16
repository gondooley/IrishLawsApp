import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import HTML from '../components/HTML';
import * as Database from '../database';

const PageSchedule = (props) => {

  // TODO: migrate all this to PageSectionOrSchedule

  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    Database.fetchSchedule(props.basicInfo.year,
      props.basicInfo.numberInYear, props.scheduleNumber)
      .then(data => {
        setSchedule(data.html);
      })
      .catch((error) => {
        setSchedule('Error in trying to get it: ' + error);
      });
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {schedule != '' ?
          <HTML
            source={schedule}
            handleLink={props.handleLink}
          /> : null}
      </ScrollView>
    </>
  );
}

export default PageSchedule;