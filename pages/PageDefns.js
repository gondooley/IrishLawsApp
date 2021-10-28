import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, StatusBar, Text, View } from 'react-native';
import ResultsListItem from '../components/ResultsListItem';
import * as Database from '../database';

const PageDefns = (props) => {

  useEffect(() => {
    if (typeof props.allResults == 'undefined') {
      Database.fetchDefns(props.searchText)
        .then(searchResults => {
          let exactResults = convertFetchedDataIntoSectionListData
            (searchResults["exacts"],
              'No exact definitions found',
              'A single exact definition found',
              ' exact definitions found');
          let partialResults = convertFetchedDataIntoSectionListData
            (processPartialData(searchResults["partials"]),
              'No partial matches to defined terms found',
              'A single partial match to defined terms found',
              ' partial matches to defined terms found');
          // The wording of the usages heading depends on the number of words in the searchText
          var altText;
          if (String(props.searchText).split(' ').length == 1) {
            altText = 'the entered word';
          } else {
            altText = 'one or more of the entered words';
          }
          altText = " of " + altText + " found in laws";
          let usageResults = convertFetchedDataIntoSectionListData
            (searchResults["usages"],
              'No usages' + altText,
              'A single usage' + altText,
              ' usages' + altText);
          props.setAllResults([exactResults, partialResults, usageResults]);
        }).catch((error) => { console.log('Error: ' + error); });
    }
  }, [props.allResults]);

  function processPartialData(data) {
    var processedData = [];
    data.forEach(partialTerm => {
      processedData.push("heading:" + partialTerm[["_id"]]);
      processedData.push(...partialTerm["refs"]);
    });
    return { "refs": processedData };
  }

  function convertFetchedDataIntoSectionListData
    (data, noneHeading, singleHeading, multipleHeading) {
    var sectionResults;
    let refs = data["refs"];
    if (typeof refs == "undefined") {
      sectionResults = { "title": noneHeading };
      sectionResults["data"] = [];
    } else {
      let sectionCount = refs.length;
      if (sectionCount == 1) {
        sectionResults = { "title": singleHeading }
      } else {
        sectionResults = { "title": sectionCount + multipleHeading };
      }
      sectionResults["data"] = refs;
    }
    return sectionResults;
  }

  const InterListBoundary = () => {
    return (
      <View style={{ backgroundColor: 'yellow', height: 5, width: '100%' }} />
    );
  }

  const MySectionList = () => {
    return (
      <SectionList
        sections={typeof props.allResults == "undefined" ? [] : props.allResults}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index, section }) => {

          var text;
          //check if partial result heading
          if (item.substring(0, 7) == 'heading') {
            return (
              <Text>{item.substring(8)}</Text>
            );
          } else {
            let year = item.substring(0, 4);
            let numberInYear = '';
            var index = 5; //skipping year
            // skipping number in year
            for (; item[index] != '-'; index++) {
              numberInYear += item.substr(index, 1);
            }
            numberInYear = Number(numberInYear);

            //extract sectionNumber and title
            let remainingText = item.substr(index + 1);
            let dividerIndex = remainingText.indexOf(':');
            let sectionNumber = remainingText.substring(0, dividerIndex);
            let title = remainingText.substring(dividerIndex + 1);
            let isSchedule = item.startsWith('schedule');
            if (isSchedule) {
              sectionNumber = sectionNumber.substr(8);
            }
            text = title + ", section " + sectionNumber;
            return (<ResultsListItem
              text={text}
              year={year}
              numberInYear={numberInYear}
              title={title}
              sectionNumber={sectionNumber}
              fillBasicInfo={props.fillBasicInfo}
              setSelectedSectionNumber={props.setSelectedSectionNumber}
              setScheduleNumber={props.setScheduleNumber}
              nav={props.nav} />);
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: 'bold', color: 'orange', alignContent: 'flex-start' }}>
            {title}
          </Text>
        )}
        SectionSeparatorComponent={InterListBoundary}
      />
    );
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    }}>
      <Text style={{ fontWeight: 'bold', color: 'white', alignContent: 'center' }}>
        {props.searchText}
      </Text>
      {typeof props.allResults == "undefined" ? <Text>LOADING...</Text> : <MySectionList />}
    </SafeAreaView>
  );
}

export default PageDefns;