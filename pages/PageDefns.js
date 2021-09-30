import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, StatusBar, Text, View } from 'react-native';
import ResultsListItem from '../components/ResultsListItem';
import * as Database from '../database';

const PageDefns = (props) => {

  const [exactsHeading, setExactsHeading] = useState('Loading ...');
  const [partialsHeading, setPartialsHeading] = useState('Loading ...');
  const [usagesHeading, setUsagesHeading] = useState('Loading ...');
  const [allResults, setAllResults] = useState([]);
  const [allResultsAreIn, setAllResultsAreIn] = useState(false);

  useEffect(() => {
    console.log('About to fetch exacts');
    let tempResults = [];
    Database.fetchExactDefns(props.searchText)
      .then(data => {
        console.log('Exacts have returned');
        let refs = data["refs"];
        if (typeof refs == "undefined") {
          setExactsHeading('No exact definitions found');
          tempResults[0] = { "title": "Exact", "data": [] };
        } else {
          let exactsCount = refs.length;
          if (exactsCount == 1) {
            setExactsHeading('A single exact definition found');
          } else {
            setExactsHeading(exactsCount + ' exact definitions found');
          }
          tempResults[0] = { "title": "Exact", "data": refs };
        }
        console.log('About to fetch partials');
        Database.fetchPartialDefns(props.searchText)
          .then(data => {
            console.log('Partials have returned');
            let refs = data["refs"];
            if (typeof refs == "undefined") {
              setPartialsHeading('No partial matches to defined terms found');
              tempResults[1] = { "title": "Partial", "data": [] };
            } else {
              let partialsCount = refs.length;
              if (partialsCount == 1) {
                setPartialsHeading('A single partial match to defined terms found');
              } else {
                setPartialsHeading(partialsCount + ' partial matches to defined terms found')
              }
              tempResults[1] = { "title": "Partial", "data": refs };
            }
            console.log('About to fetch usages');
            Database.fetchUsages(props.searchText)
              .then(data => {
                console.log('Usages have returned');
                let refs = data["refs"];
                if (typeof refs == "undefined") {
                  setUsagesHeading('No usages of one or more of the entered words found in laws');
                  tempResults[2] = { "title": "Other usage", "data": [] };
                } else {
                  let usagesCount = refs.length;
                  if (usagesCount == 1) {
                    setUsagesHeading('A single usage of one or more of the entered words found in laws');
                  } else {
                    setUsagesHeading(usagesCount + ' usages of one or more of the entered words found in laws');
                  }
                  tempResults[2] = { "title": "Other usage", "data": refs };
                }
                setAllResults(tempResults);
                console.log('All results are in');
                setAllResultsAreIn(true);
              })
              .catch((error) => {
                console.log('Error: ' + error);
              });
          }).catch((error) => {
            console.log('Error: ' + error);
          });
      }).catch((error) => {
        console.log('Error: ' + error);
      });;
  }, []);

  const InterListBoundary = () => {
    return (
      <View style={{ backgroundColor: 'yellow', height: 5, width: '100%' }} />
    );
  }

  function onPress(basicInfo) {
    props.setLawTitle(basicInfo["title"]);
    props.nav('section');
  }


  const JustId = (props) => {
    console.log("Just " + props.item);
    return (<Text>{props.item}</Text>);
  }

  const MySectionList = () => {
    console.log('Rendering MySectionList');

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