import React from 'react';
import { Button, FlatList, Pressable, Text } from 'react-native';

const PageLawPartChapters = (props) => {

  return (
    <>
      <Text style={{ color: 'white' }}>
        {props.basicInfo.title}
      </Text>
      <Text style={{ color: 'white' }}>
        Number {props.basicInfo.numberInYear} of {props.basicInfo.year}
      </Text>
      <Text style={{ color: 'white' }}>
        Part {props.selectedPart._id}: {props.selectedPart.title}
      </Text>

      <FlatList
        data={Object.keys(props.selectedPart.chapters)}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          let chapter = props.selectedPart.chapters[item];
          var onPressAction = () => {
            props.setSelectedChapterNumberAsString(item);
            props.setSectionNumberFirstSelected(Number(chapter['first section']));
            let nextChapter = Number(item) + 1;
            if (Object.keys(props.selectedPart.chapters).includes(String(nextChapter))) {
              props.setSectionNumberFirstBeyond(
                Number(props.selectedPart.chapters[String(nextChapter)]['first section']));
            } else {
              let nextPart = Number(props.selectedPart._id) + 1;
              if (nextPart > props.basicInfo.numParts) {
                props.setSectionNumberFirstBeyond(props.basicInfo.numSections);
              } else {
                props.setSectionNumberFirstBeyond(Number(props.partsData[String(nextPart)]['first section']));
              }
            }



            props.nav('sections');


          }
          var text;
          if (Object.keys(props.selectedPart.chapters[item]).includes('title')) {
            text = "Chapter " + item + ": " + props.selectedPart.chapters[item]['title'];
          } else {
            text = "Chapter " + item;
          }
          return (
            <Pressable style={{ minHeight: 40, justifyContent: 'center' }}
              onPress={onPressAction}>
              <Text>
                {text}
              </Text>
            </Pressable>
          );
        }} />
    </>
  );
}

export default PageLawPartChapters;