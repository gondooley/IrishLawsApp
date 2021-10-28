//  TODO: Scope toolbar
//    - always on top
//    - functioning
//    - style

//  TODO: Home page
//  TODO: Year List
//  TODO: List of laws in year
//  TODO: Law basic info
//  TODO: Parts? List of Parts
//  TODO: Chapters? List of Chapters of a particular part eg 2014-38
//  TODO: List of Sections of a particular chapter
//  TODO: No chapters? List of Sections of a particular part
//  TODO: No parts? List of Sections of a particular law
//  TODO: Schedules? List of schedules
//  TODO: Particular schedule text
//  TODO: Definition results

//  DATABASE
//  TODO: Update defns db
//----------------------------------------HERE----------------------------------------
//    - overhaul all code
//    - generate it locally

//  ANDROID/DATABASE
//  TODO: Schedule list not appearing for 2014-38, 1965-7
//    It seems no schedules are appearing
//    https://levelhead.ie/scope/laws w/ POST request key-value: {schedules, 2014-38}
//    ?id=2014-38 works for basic info, so this is probably basicInfoId
//    blank response from ?schedule=2014-38
//    Possibly only processing POST not GET? Is this possible?
//    Back end:
//      if (params.containsKey("schedules")) {
//      String basicInfoId = request.getParameter("schedules");
//      Bson filter = Filters.regex("_id", "^" + basicInfoId + "-schedule");
//      id = Document.parse(filter.toString()).getString("_id");
//      FindIterable<Document> scheds = coll.find(filter);
//    - check REST response alone
//    Check NetBeans server side processing - what is the schedule processing?
//    - Check db consistency with two versions of schedule ids?

//  ANDROID
//  TODO: On defns results: "n matches found in laws to one or more of the entered words"
//    - See this in the locally built app
//    - Only one word? Change end of message to "to the entered word"
//    - Change any other relevant messages such as when no defns are found

//  TODO: Home page

//  TODO: BTWEA gov.ie link from Noreen's email

//  TODO: Tony O'Regan? Cork thing Noreen email link

// TODO: Android Irish Laws app - ViewModelProviders is now deprecated

import React, { useState } from 'react';
import { Modal, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import PageHome from './pages/PageHome';
import PageYearList from './pages/PageYearList';
import PageDefns from './pages/PageDefns';
import PageLawBasicInfo from './pages/PageLawBasicInfo';
import PageLawPartChapters from './pages/PageLawPartChapters';
import PageLawParts from './pages/PageLawParts';
import PageLawSchedules from './pages/PageLawSchedules';
import PageLawsInYear from './pages/PageLawsInYear';
import PageSchedule from './pages/PageSchedule';
import PageSections from './pages/PageSections';
import PageSection from './pages/PageSection';
import Toolbar from './components/Toolbar';
import * as Database from './database';
import * as RomanNumerals from './romanNumerals';

const App = () => {
  const [searchInputActivated, setSearchInputActivated] = useState(false);

  const [currentPage, setCurrentPage] = useState('home');
  const [toolbarTitle, setToolbarTitle] = useState('Irish Laws');
  const [searchText, setSearchText] = useState('');
  // the string is copied at certain times to prevent automatic updates outside the search box
  const [searchTextCopy, setSearchTextCopy] = useState('');
  const [allResults, setAllResults] = useState(undefined);
  const [basicInfo, setBasicInfo] = useState({ 'year': -1, 'numberInYear': -1, 'title': '' });
  const [partsData, setPartsData] = useState({});
  const [selectedPart, setSelectedPart] = useState({});
  const [selectedChapterNumberAsString, setSelectedChapterNumberAsString] = useState('');
  const [sectionNumberFirstSelected, setSectionNumberFirstSelected] = useState(-1);
  const [sectionNumberFirstBeyond, setSectionNumberFirstBeyond] = useState(-1);
  const [selectedSectionNumber, setSelectedSectionNumber] = useState(-1);
  const [selectedSectionTitle, setSelectedSectionTitle] = useState('');
  const [scheduleNumber, setScheduleNumber] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState(['home']);

  /**
   * possibleBreadcrumbs are passed if there is a danger of race
   * conditions where there might be contradictory breadCrumb trails set
   * @param {String} pageName 
   * @param {String[]} possibleBreadcrumbs 
   */
  function switchPage(pageName, possibleBreadcrumbs) {
    if (pageName == 'defns') {
      setSearchInputActivated(false);
      setSearchTextCopy((' ' + searchText).slice(1));
      setToolbarTitle('Search results');
    } else {
      setToolbarTitle('Irish Laws');
    }

    // going from a search directly to a section, we must do some
    // work to calculate the appropriate part and chapter, if they exist
    if (pageName == 'section') {
      let isSearchToSection = false;
      // possibleBreadcrumbs has been passed to avoid race conditions
      if (typeof possibleBreadcrumbs == 'object') {
        if (possibleBreadcrumbs[possibleBreadcrumbs.length - 1] == 'defns') {
          isSearchToSection = true;
        }
      } else {
        if (breadcrumbs[breadcrumbs.length - 1] == 'defns') {
          isSearchToSection = true;
        }
      }
      if (isSearchToSection) {
        Database.fetchBasicInfo(basicInfo.year, basicInfo.numberInYear)
          .then(data => {
            // year and numberInYear not included in fetched data
            data["year"] = basicInfo.year;
            data["numberInYear"] = basicInfo.numberInYear;
            setBasicInfo(data);
            if (data.numParts > 0) {
              Database.fetchParts(basicInfo.year, basicInfo.numberInYear)
                .then(partsData => {
                  setPartsData(partsData);

                  // calculate relevant part
                  let partsArray = [];
                  for (const key in partsData) {
                    if (key == "_id") continue;
                    partsArray.push({ "number": key, "data": partsData[key] });
                  }
                  if ("1" in partsData) {
                    partsArray.sort((a, b) => a - b);
                  } else if ("I" in partsData) {
                    partsArray.sort((a, b) => (RomanNumerals.decode(a.number)
                      - RomanNumerals.decode(b.number)));
                  } else {
                    console.error("Strange numbering in partsData: "
                      + partsData);
                  }
                  // Loop through until suitable candidate found
                  // arrayIndex kept outside of loop to preserve value
                  let arrayIndex = 0
                  // If no matches in this loop, it should end up as
                  // the last index (partsArray.length - 1)
                  for (; arrayIndex < partsArray.length - 2; arrayIndex++) {
                    if (Number(partsArray[arrayIndex]["data"]["first section"]) < selectedSectionNumber
                      && Number(partsArray[arrayIndex + 1]["data"]["first section"]) > selectedSectionNumber)
                      break;
                  }
                  let partSelected = partsArray[arrayIndex]["data"];
                  // duplicate part number inside rest of data
                  partSelected["_id"] = partsArray[arrayIndex]["number"];
                  setSelectedPart(partSelected);

                  if (Object.keys(partSelected).includes('chapters')) {
                    //calculate relevant chapter
                    let chaptersArray = [];
                    let chaptersData = partSelected.chapters;
                    for (const key in chaptersData) {
                      chaptersArray.push({ "number": key, "data": chaptersData[key] });
                    }
                    if ("1" in chaptersData) {
                      chaptersArray.sort((a, b) => a - b);
                    } else if ("I" in chaptersData) {
                      chaptersArray.sort((a, b) => (RomanNumerals.decode(a.number)
                        - RomanNumerals.decode(b.number)));
                    } else {
                      console.error("Strange numbering in chaptersData: "
                        + chaptersData);
                    }
                    // Loop through until suitable candidate found
                    // arrayIndex kept outside of loop to preserve value
                    let arrayIndex = 0
                    // If no matches in this loop, it should end up as
                    // the last index (i.e. partsArray.length - 1)
                    for (; arrayIndex < chaptersArray.length - 2; arrayIndex++) {
                      if (Number(chaptersArray[arrayIndex]["data"]["first section"]) < selectedSectionNumber
                        && Number(chaptersArray[arrayIndex + 1]["data"]["first section"]) > selectedSectionNumber)
                        break;
                    }
                    setSelectedChapterNumberAsString(chaptersArray[arrayIndex]["number"]);
                  } else {
                    setSelectedChapterNumberAsString('');
                  }
                }).catch((error) => {
                  console.error('Error getting parts: ' + error);
                });
            } else {
              setPartsData({});
            }
          })
          .catch((error) => {
            props.setBasicInfo('Error: ' + error);
          });
      }
    }

    var temp;
    // A desired breadcrumbs array has been passed.
    // This avoids race conditions between breadcrumb settings
    // when, eg, back button is pressed
    if (typeof possibleBreadcrumbs == 'object') {
      temp = possibleBreadcrumbs;
    } else {
      temp = [...breadcrumbs];
    }
    temp.push(pageName);
    setBreadcrumbs(temp);
    setCurrentPage(pageName);
  }


  function fillBasicInfo(year, numberInYear, title) {
    let tempBasicInfo = basicInfo;
    tempBasicInfo.year = year;
    tempBasicInfo.numberInYear = numberInYear;
    tempBasicInfo.title = title;
    setBasicInfo(tempBasicInfo);
  }

  function setYear(year) {
    let tempBasicInfo = basicInfo;
    tempBasicInfo.year = year;
    setBasicInfo(tempBasicInfo);
  }

  function setNumberInYear(numberInYear) {
    let tempBasicInfo = basicInfo;
    tempBasicInfo.numberInYear = numberInYear;
    setBasicInfo(tempBasicInfo);
  }

  function setTitle(title) {
    let tempBasicInfo = basicInfo;
    tempBasicInfo.title = title;
    setBasicInfo(tempBasicInfo);
  }

  function searchRequest() {
    if (searchText == '') return;
    setAllResults(undefined);
    switchPage('defns');
  }

  useBackHandler(() => {
    if (breadcrumbs.length > 1) {
      let temp = [...breadcrumbs];
      temp.pop(); // current page is gone
      let previousPage = temp.pop(); // previous page will be reloaded
      /*
       * previousPage will be added back onto the temp
       * breadcrumbs in the switchPage function,
       * when it becomes the currentPage again
       * (Avoid setting breadcrumbs twice, causing race conditions)
       */
      switchPage(previousPage, temp);
      return true
    }
    return false
  })

  const [isFontSizeModalVisible, setIsFontSizeModalVisible] = useState('false');

  return (
    // Top app container
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#339999' }}>
      <Toolbar
        modalCallback={setIsFontSizeModalVisible}
        searchInputActivated={searchInputActivated}
        setSearchInputActivated={setSearchInputActivated}
        searchText={searchText}
        setSearchText={setSearchText}
        searchRequest={searchRequest}
        title={toolbarTitle}
      />
      <View style={{ flex: 1 }}>
        {currentPage == 'home' ? <PageHome
          nav={switchPage}
          searchInputActivated={searchInputActivated}
          setSearchInputActivated={setSearchInputActivated}
          searchRequest={searchRequest} /> : null}
        {currentPage == 'defns' ? <PageDefns
          nav={switchPage}
          searchText={searchTextCopy}
          allResults={allResults}
          setAllResults={setAllResults}
          fillBasicInfo={fillBasicInfo}
          setSelectedSectionNumber={setSelectedSectionNumber}
          setScheduleNumber={setScheduleNumber} /> : null}
        {currentPage == 'years' ? <PageYearList nav={switchPage} setYear={setYear} /> : null}
        {currentPage == 'lawsInYear' ? <PageLawsInYear
          nav={switchPage}
          year={basicInfo.year}
          setNumberInYear={setNumberInYear}
          setTitle={setTitle} /> : null}
        {currentPage == 'basicInfo' ? <PageLawBasicInfo
          nav={switchPage}
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          setParts={setPartsData}
          setSelectedPart={setSelectedPart}
          setSelectedChapterNumberAsString={setSelectedChapterNumberAsString}
          setSectionNumberFirstSelected={setSectionNumberFirstSelected}
          setSectionNumberFirstBeyond={setSectionNumberFirstBeyond} /> : null}
        {currentPage == 'chapters' ? <PageLawPartChapters
          nav={switchPage}
          basicInfo={basicInfo}
          partsData={partsData}
          selectedPart={selectedPart}
          setSelectedChapterNumberAsString={setSelectedChapterNumberAsString}
          setSectionNumberFirstSelected={setSectionNumberFirstSelected}
          setSectionNumberFirstBeyond={setSectionNumberFirstBeyond} /> : null}
        {currentPage == 'parts' ? <PageLawParts
          nav={switchPage}
          basicInfo={basicInfo}
          partsData={partsData}
          setSelectedPart={setSelectedPart}
          setSelectedChapterNumberAsString={setSelectedChapterNumberAsString}
          setSectionNumberFirstSelected={setSectionNumberFirstSelected}
          setSectionNumberFirstBeyond={setSectionNumberFirstBeyond} /> : null}
        {currentPage == 'schedules' ? <PageLawSchedules
          nav={switchPage}
          basicInfo={basicInfo}
          setScheduleNumber={setScheduleNumber} /> : null}
        {currentPage == 'schedule' ? <PageSchedule
          nav={switchPage}
          basicInfo={basicInfo}
          scheduleNumber={scheduleNumber} /> : null}
        {currentPage == 'sections' ? <PageSections
          nav={switchPage}
          basicInfo={basicInfo}
          selectedPart={selectedPart}
          selectedChapterNumberAsString={selectedChapterNumberAsString}
          sectionNumberFirstSelected={sectionNumberFirstSelected}
          sectionNumberFirstBeyond={sectionNumberFirstBeyond}
          setSelectedSectionNumber={setSelectedSectionNumber}
          setSelectedSectionTitle={setSelectedSectionTitle} /> : null}
        {currentPage == 'section' ? <PageSection
          nav={switchPage}
          basicInfo={basicInfo}
          selectedPart={selectedPart}
          selectedChapterNumberAsString={selectedChapterNumberAsString}
          sectionNumberFirstSelected={sectionNumberFirstSelected}
          sectionNumberFirstBeyond={sectionNumberFirstBeyond}
          selectedSectionNumber={selectedSectionNumber}
          selectedSectionTitle={selectedSectionTitle} /> : null}
      </View>
      {/* Ad container -  actual height*/}
      <View style={{ height: 50, backgroundColor: 'red' }}>
        <Text>Ad</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFontSizeModalVisible}
        onRequestClose={() => {
          setIsFontSizeModalVisible(false);
        }}>
        <View style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "flex-start",
          margin: 40,
          backgroundColor: "white",
          borderRadius: 2,
          padding: 35,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}>
          <Text style={{ fontSize: 50 }}>Huge Text</Text>
          <Text style={{ fontSize: 30 }}>Big Text</Text>
          <Text style={{ fontSize: 22 }}>Medium Text</Text>
          <Text style={{ fontSize: 16 }}>Small Text</Text>
          <Text style={{ fontSize: 12 }}>Tiny Text</Text>
          <Pressable
            style={{ padding: 10 }}
            onPress={() => setIsFontSizeModalVisible(false)}
          >
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default App;

// =============================================================================================
// Original code
// =============================================================================================

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// Problem:
// 'import type' declarations can only be used in TypeScript files.ts(8006)
// import Node
// Code:
// import type {Node} from 'react';

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
