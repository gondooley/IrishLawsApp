import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import * as Database from '../database';

const PageLawBasicInfo = (props) => {

  useEffect(() => {
    Database.fetchBasicInfo(props.basicInfo.year, props.basicInfo.numberInYear)
      .then(data => {
        props.setBasicInfo(data);
      })
      .catch((error) => {
        props.setBasicInfo('Error: ' + error);
      });
  }, []);

  const [scheduleCount, setScheduleCount] = useState(0);
  useEffect(() => {
    let numSchedules = props.basicInfo["numSchedules"];
    if (numSchedules > 0) {
      setScheduleCount(numSchedules);
    }
  }, [props.basicInfo]);

  return (
    <>
      <Button
        onPress={() => {
          props.nav('parts');
        }}
        title="If law has parts: parts"
        color="#841584" />
      <Button
        onPress={() => {
          props.nav('sections');
        }}
        title="If law does not have parts: sections"
        color="#841584" />
      {scheduleCount > 0 ?
        <Button
          onPress={() => {
            props.nav('schedules');
          }}
          title={scheduleCount + " schedules"}
          color="#841584" /> : null}
      <Text style={{ color: 'white' }}>
        Basic info for a law
      </Text>
      <Text style={{ color: 'black' }}>
        {JSON.stringify(props.basicInfo)}
      </Text>
    </>
  );
}

export default PageLawBasicInfo;