import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text } from 'react-native';

const PageLawSchedules = (props) => {

  const [scheduleButtons, setScheduleButtons] = useState([]);

  useEffect(() => {
    let numSchedules = props.basicInfo["numSchedules"];
    if (numSchedules > 0) {
      let arr = [];
      for (let i = 1; i <= numSchedules; i++) {
        arr.push(i);
      }
      setScheduleButtons(arr.map(function (number, index) {
        return <Button key={index}
          onPress={() => {
            props.setScheduleNumber(number);
            props.switchPage('schedule');
          }}
          title={"Schedule " + number}
          color="#841584" />
      }));
    }
  }, [props.basicInfo]);

  return (
    <ScrollView>
      <Text style={{ color: 'white' }}>
        List of schedules for a law
      </Text>
      {scheduleButtons}
    </ScrollView>
  );
}

export default PageLawSchedules;