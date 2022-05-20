import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text } from 'react-native';
import * as RomanNumerals from '../romanNumerals';

const PageLawParts = (props) => {


  // parts are loaded in PageLawBasicInfo.js
  return (
    <>
      <Text style={{ color: 'white' }}>
        {props.basicInfo.title}
      </Text>
      <Text style={{ color: 'white' }}>
        Number {props.basicInfo.numberInYear} of {props.basicInfo.year}
      </Text>
      <FlatList
        data={Object.keys(props.partsData)}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          if (item != '_id') {
            let part = props.partsData[item];
            // duplicate part number inside data
            part['_id'] = item;
            var onPressAction = () => { };
            if (Object.keys(part).includes('chapters')) {
              onPressAction = () => {
                props.setSelectedPart(part);
                props.switchPage('chapters');
              }
            } else {
              onPressAction = () => {
                props.setSelectedPart(part);
                // to make sure no chapter appears above the section
                props.setSelectedChapterNumberAsString('');
                props.setSectionNumberFirstSelected(Number(part['first section']));

                //parts are possibly numbered with capital Roman numerals
                if (isNaN(Number(part._id))) {
                  let number = RomanNumerals.decode(part._id);
                  let nextPart = number + 1;
                  if (nextPart > props.basicInfo.numParts) {
                    props.setSectionNumberFirstBeyond(props.basicInfo.numSections);
                  } else {
                    // find the next part
                    let partNumbers = Object.keys(props.partsData);
                    // nextPart is an integer, nextPartNumber is a roman numeral string
                    var nextPartNumber;
                    partNumbers.forEach((partNumber) => {
                      if (partNumber != '_id') {
                        if (RomanNumerals.decode(partNumber) == nextPart) {
                          nextPartNumber = partNumber;
                        }
                      }
                    })
                    props.setSectionNumberFirstBeyond(Number(props.partsData[nextPartNumber]['first section']));
                  }
                } else {
                  //not Roman Numerals
                  let nextPart = Number(part._id) + 1;
                  if (nextPart > props.basicInfo.numParts) {
                    props.setSectionNumberFirstBeyond(props.basicInfo.numSections);
                  } else {
                    props.setSectionNumberFirstBeyond(Number(props.partsData[String(nextPart)]['first section']));
                  }
                }
                props.switchPage('sections');
              }
            }
            var text;
            if (Object.keys(props.partsData[item]).includes('title')) {
              text = "Part " + item + ": " + props.partsData[item]['title'];
            } else {
              text = "Part " + item;
            }
            return (
              <Pressable style={{ minHeight: 40, justifyContent: 'center' }}
                onPress={onPressAction}>
                <Text>
                  {text}
                </Text>
              </Pressable>
            );
          }
        }} />
    </>
  );
}

export default PageLawParts;