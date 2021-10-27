import React, { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, ScrollView, Text } from 'react-native';

const PageLawParts = (props) => {

  function decode(romanNumeralString) {
    let result = 0;
    let uRoman = String(romanNumeralString).toUpperCase(); //case-insensitive
    for(let i = 0; i < uRoman.length - 1; i++) { //loop over all but the last character
        //if this character has a lower value than the next character
        if (decodeSingle(uRoman.charAt(i)) < decodeSingle(uRoman.charAt(i+1))) {
            //subtract it
            result -= decodeSingle(uRoman.charAt(i));
        } else {
            //add it
            result += decodeSingle(uRoman.charAt(i));
        }
    }
    //decode the last character, which is always added
    result += decodeSingle(uRoman.charAt(uRoman.length-1));
    return result;
}


function decodeSingle(romanNumeralChar) {
  switch(romanNumeralChar) {
      case 'M': return 1000;
      case 'D': return 500;
      case 'C': return 100;
      case 'L': return 50;
      case 'X': return 10;
      case 'V': return 5;
      case 'I': return 1;
      default: return 0;
  }
}


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
            part['_id'] = item;
            var onPressAction = () => { };
            if (Object.keys(part).includes('chapters')) {
              onPressAction = () => {
                props.setSelectedPart(part);
                props.nav('chapters');
              }
            } else {
              onPressAction = () => {
                props.setSelectedPart(part);
                // to make sure no chapter appears above the section
                props.setSelectedChapterNumberAsString('');
                props.setSectionNumberFirstSelected(Number(part['first section']));

                //parts are possibly numbered with capital Roman numerals
                if (isNaN(Number(part._id))) {
                  let number = decode(part._id);
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
                        if (decode(partNumber) == nextPart) {
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
                props.nav('sections');
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