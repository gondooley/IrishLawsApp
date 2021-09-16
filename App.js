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

import React, { useEffect, useState } from 'react';
import { BackHandler, Modal, SafeAreaView, Text, View } from 'react-native';
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

const App = () => {
  const [currentPage, setCurrentPage] = useState(<PageHome nav={switchPage} />);
  const breadCrumbs = ['home'];

  function switchPage(pageName) {
    breadCrumbs.push(pageName);
    switch (pageName) {
      case 'home':
        setCurrentPage(<PageHome nav={switchPage} />);
        break;
      case 'years':
        setCurrentPage(<PageYearList nav={switchPage} />);
        break;
      case 'defns':
        setCurrentPage(<PageDefns nav={switchPage} />);
        break;
      case 'basicInfo':
        setCurrentPage(<PageLawBasicInfo nav={switchPage} />);
        break;
      case 'chapters':
        setCurrentPage(<PageLawPartChapters nav={switchPage} />);
        break;
      case 'parts':
        setCurrentPage(<PageLawParts nav={switchPage} />);
        break;
      case 'schedules':
        setCurrentPage(<PageLawSchedules nav={switchPage} />);
        break;
      case 'lawsInYear':
        setCurrentPage(<PageLawsInYear nav={switchPage} />);
        break;
      case 'schedule':
        setCurrentPage(<PageSchedule nav={switchPage} />);
        break;
      case 'sections':
        setCurrentPage(<PageSections nav={switchPage} />);
        break;
      case 'section':
        setCurrentPage(<PageSection nav={switchPage} />);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const backAction = () => {
      console.log('backAction invoked');
      if (breadCrumbs.length == 1) {
        return false;
      }
      breadCrumbs.pop();
      switchPage(breadCrumbs.pop());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  [fontSizeModal, setFontSizeModal] = useState('false');

  return (
    // Top app container
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <Toolbar fontSizeModal={() => setFontSizeModal()} />
      <View style={{ flex: 1 }}>
        {currentPage}
      </View>
      {/* Ad container -  actual height*/}
      <View style={{ height: 50, backgroundColor: 'red' }}>
        <Text>Ad</Text>
      </View>
      {
        fontSizeModal
        ?
        <Modal>

        </Modal>
        : null
      }

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
