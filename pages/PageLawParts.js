import React, { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, ScrollView, Text } from 'react-native';

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
            part['_id'] =  item;
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
                let nextPart = Number(part._id) + 1;
                if (nextPart > props.basicInfo.numParts) {
                  props.setSectionNumberFirstBeyond(props.basicInfo.numSections);
                } else {
                  props.setSectionNumberFirstBeyond(Number(props.partsData[String(nextPart)]['first section']));
                }
                props.nav('sections');
              }
            }
            return (
              <Pressable style={{ minHeight: 40, justifyContent: 'center' }}
                onPress={onPressAction}>
                <Text>
                  Part {item}: {props.partsData[item]['title']}
                </Text>
              </Pressable>
            );
          }
        }} />

      <Button
        onPress={() => {
          props.nav('sections');
        }}
        title="If no chapters: sections"
        color="#841584" />
    </>
  );
}

export default PageLawParts;