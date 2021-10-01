import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, StatusBar, Text, View } from 'react-native';
import ResultsListItem from '../components/ResultsListItem';
import * as Database from '../database';

const PageDefns = (props) => {

  const [exactsHeading, setExactsHeading] = useState('Loading ...');
  const [partialsHeading, setPartialsHeading] = useState('Loading ...');
  const [usagesHeading, setUsagesHeading] = useState('Loading ...');
  const [exactResults, setExactResults] = useState(undefined);
  const [partialResults, setPartialResults] = useState(undefined);
  const [usageResults, setUsageResults] = useState(undefined);
  const [allResults, setAllResults] = useState(undefined);
  const [allResultsAreIn, setAllResultsAreIn] = useState(false);


  useEffect(() => {
    if (typeof exactResults == 'undefined') {
      Database.fetchExactDefns(props.searchText)
        .then(data => {
          loadResults(data, setExactsHeading,
            'No exact definitions found',
            'A single exact definition found',
            ' exact definitions found',
            'Exact', setExactResults);
        }).catch((error) => { console.log('Error: ' + error); });
    }
    if (typeof partialResults == 'undefined') {
      Database.fetchPartialDefns(props.searchText)
        .then(data => {
          loadResults(data, setPartialsHeading,
            'No partial matches to defined terms found',
            'A single partial match to defined terms found',
            ' partial matches to defined terms found',
            'Partial', setPartialResults);
        }).catch((error) => { console.log('Error: ' + error); });
    }
    if (typeof usageResults == 'undefined') {
      Database.fetchUsages(props.searchText)
        .then(data => {
          loadResults(data, setUsagesHeading,
            'No usages of one or more of the entered words found in laws',
            'A single usage of one or more of the entered words found in laws',
            ' usages of one or more of the entered words found in laws',
            'Other usage', setUsageResults);
        }).catch((error) => { console.log('Error: ' + error); });
    }
  }, []);

  /**
   * Waiting for all sections to be in before setting the SectionList data 
   */
  useEffect(() => {
    if (typeof allResults == 'undefined'
    && typeof exactResults != 'undefined'
    && typeof partialResults != 'undefined'
    && typeof usageResults != 'undefined') {
      setAllResults([exactResults, partialResults, usageResults]);
    }
  }, [exactResults, partialResults, usageResults]);

  useEffect(() => {
    if (typeof allResults != 'undefined') {
      setAllResultsAreIn(true);
    }
  }, [allResults]);

  function loadResults(data, headingSetter,
    noneHeading, singleHeading, multipleHeading,
    sectionTitle, sectionResultsSetter) {
    let refs = data["refs"];
    let sectionResults = { "title": sectionTitle };
    if (typeof refs == "undefined") {
      headingSetter(noneHeading);
      sectionResults["data"] = [];
    } else {
      sectionResults["data"] = refs;
      let sectionCount = refs.length;
      if (sectionCount == 1) {
        headingSetter(singleHeading);
      } else {
        headingSetter(sectionCount + multipleHeading);
      }
    }
    sectionResultsSetter(sectionResults);
  }

  const InterListBoundary = () => {
    return (
      <View style={{ backgroundColor: 'yellow', height: 5, width: '100%' }} />
    );
  }

  const MySectionList = () => {
    return (
      <SectionList
        sections={allResults}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index, section }) =>
          <ResultsListItem item={item} index={index} section={section} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: 'bold', color: 'orange', alignContent: 'flex-start' }}>
            {title == 'Exact' ? exactsHeading : null}
            {title == 'Partial' ? partialsHeading : null}
            {title == 'Other usage' ? usagesHeading : null}
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
      {allResultsAreIn ? <MySectionList /> : <Text>LOADING...</Text>}
    </SafeAreaView>
  );
}

export default PageDefns;