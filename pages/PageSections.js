import React, { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, Text } from 'react-native';
import * as Database from '../database';

const PageSections = (props) => {

  // Ultimately with extract a selection of these
  const [allSectionTitles, setAllSectionTitles] = useState({});
  const [allSectionTitlesAreLoaded, setAllSectionTitlesAreLoaded] = useState(false);
  const [selectedSectionNumbersAsStringsArray, setSelectedSectionNumbersAsStringsArray] = useState([]);
  useEffect(() => {
    Database.fetchSectionHeadings(props.basicInfo.year, props.basicInfo.numberInYear)
      .then(data => {
        setAllSectionTitles(data);
      })
      .catch((error) => {
        setBasicInfo('Error: ' + error);
      });
    //make string array of selected section numbers
    let temp = [];
    for (let i = props.sectionNumberFirstSelected; i < props.sectionNumberFirstBeyond; i++) {
      temp.push(String(i));
    }
    setSelectedSectionNumbersAsStringsArray(temp);
  }, []);

  useEffect(() => {
    if (Object.keys(allSectionTitles).length > 0) {
      setAllSectionTitlesAreLoaded(true);
    }
  }, [allSectionTitles]);

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
      {allSectionTitlesAreLoaded ?
        <FlatList
          data={selectedSectionNumbersAsStringsArray}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            var onPressAction = () => {
              props.setSelectedSectionNumber(item);
              props.setSelectedSectionTitle(allSectionTitles[item]);
              props.switchPage('section');
            }
            return (
              <Pressable style={{ minHeight: 40, justifyContent: 'center' }}
                onPress={onPressAction}>
                <Text>
                  {/* leave this space, it is for formatting */}
                  {item}. {allSectionTitles[item]}
                </Text>
              </Pressable>
            );
          }} /> : null}
    </>
  );
}

export default PageSections;