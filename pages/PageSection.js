import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import HTML from '../components/HTML'
import * as Database from '../database';

const PageSection = (props) => {

  const [section, setSection] = useState('');

  useEffect(() => {
    Database.fetchSection(props.basicInfo.year,
       props.basicInfo.numberInYear, props.selectedSectionNumber)
      .then(data => {
        setSection(data.html);
      })
      .catch((error) => {
        setSection('Error: ' + error);
      });
      // sometimes basicInfo is not prepared in time for page display
  }, [props.basicInfo]);

  //Companies Act 2014
  //Number 38 of 2014
  //Part 3: title
  //Chapter 5: Transfer of shares
  //Section 94
  return (
    <>
      <Text style={{ color: 'white' }}>
        {props.basicInfo.title}
      </Text>
      <Text style={{ color: 'white' }}>
        Number {props.basicInfo.numberInYear} of {props.basicInfo.year}
      </Text>
      {props.basicInfo.numParts > 0 ?
        <Text style={{ color: 'white' }}>
          Part {props.selectedPart._id}: {props.selectedPart.title}
        </Text> : null
      }
      {props.selectedChapterNumberAsString != '' ?
        <Text style={{ color: 'white' }}>
          {/* need to keep space after colon for formatting */}
          Chapter {props.selectedChapterNumberAsString}: {
            props.selectedPart.chapters[props.selectedChapterNumberAsString]['title']}
        </Text> : null
      }
      <Text style={{ color: 'white' }}>
        Section {props.selectedSectionNumber}
        {props.selectedSectionTitle != '' ?
          ': ' + props.selectedSectionTitle: null}
      </Text>
      <HTML source={section} handleLink={props.handleLink}/>
    </>
  );
}

export default PageSection;