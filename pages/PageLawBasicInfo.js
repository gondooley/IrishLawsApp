import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import HTML from '../components/HTML';
import * as Database from '../database';

const PageLawBasicInfo = (props) => {

  const [hasParts, setHasParts] = useState(false);
  const [fullBasicInfoLoaded, setFullBasicInfoLoaded] = useState(false);

  useEffect(() => {
    Database.fetchBasicInfo(props.basicInfo.year, props.basicInfo.numberInYear)
      .then(data => {
        // year and numberInYear will disappear if allowed
        data["year"] = props.basicInfo.year;
        data["numberInYear"] = props.basicInfo.numberInYear;
        props.setBasicInfo(data);
        if (data.numParts > 0) {
          setHasParts(true);
          Database.fetchParts(props.basicInfo.year, props.basicInfo.numberInYear)
            .then(data => {
              props.setParts(data);
            }).catch((error) => {
              console.error('Error getting parts: ' + error);
            });
        } else {
          setHasParts(false);
          props.setParts({});
        }
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
    //all basic infos should have a date when loaded fully, but not otherwise
    if (props.basicInfo.date != undefined) {
      setFullBasicInfoLoaded(true);
    }
  }, [props.basicInfo]);

  return (
    <>
      <Text style={{ color: 'white' }}>
        Number {props.basicInfo.numberInYear} of {props.basicInfo.year}
      </Text>
      {hasParts ?
        <Button
          onPress={() => {
            props.nav('parts');
          }}
          title={props.basicInfo.numSections + ' sections in ' + props.basicInfo.numParts + " parts"}
          color="#841584" /> : null}
      {fullBasicInfoLoaded && !hasParts ?
        <Button
          onPress={() => {            
            //no parts or chapters
            props.setSelectedPart({});
            props.setSelectedChapterNumberAsString('')
            
            props.setSectionNumberFirstSelected(1);
            props.setSectionNumberFirstBeyond(props.basicInfo.numSections + 1);
            props.nav('sections');
          }}
          title={String(props.basicInfo.numSections) + ' sections'}
          color="#841584" /> : null}

      {scheduleCount > 0 ?
        <Button
          onPress={() => {
            props.nav('schedules');
          }}
          title={scheduleCount == 1 ? 'Schedule' : scheduleCount + ' schedules'}
          color="#841584" /> : null}
      {fullBasicInfoLoaded
        ? Object.keys(props.basicInfo.description).map((key) =>
          <HTML source={props.basicInfo.description[key]} key={key}/>)
        : null}
      <Text style={{ color: 'white' }}>
        {props.basicInfo.date}
      </Text>
    </>
  );
}

export default PageLawBasicInfo;