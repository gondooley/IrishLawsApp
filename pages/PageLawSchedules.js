import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';

const PageLawSchedules = (props) => {

  const [scheduleCount, setScheduleCount] = useState(0);
  const [scheduleButtons, setScheduleButtons] = useState([]);

  useEffect(() => {
    let numSchedules = props.basicInfo["numSchedules"];
    if (numSchedules > 0) {
      setScheduleCount(numSchedules);
      let arr = [];
      for (let i = 1; i <= numSchedules; i++) {
        arr.push(i);
      }
      setScheduleButtons(arr.map(function (number, index) {
        return <Button key={index}
          onPress={() => {
            props.setScheduleNumber(number);
            props.nav('schedule');
          }}
          title={"Schedule " + number}
          color="#841584" />
      }));
    }
  }, [props.basicInfo]);

  return (
    <>
      <Text style={{ color: 'white' }}>
        List of schedules for a law
      </Text>
      {scheduleButtons}
    </>
  );
}

export default PageLawSchedules;