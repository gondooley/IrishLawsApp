import React from 'react';
import { Dimensions, FlatList, Pressable, Text, View } from 'react-native';

const PageYearList = (props) => {
  const deviceWidth = Dimensions.get('window').width;
  const numColumns = Math.floor(deviceWidth / 80);
  const squareSize = deviceWidth / numColumns;
  const startYear = 1922;
  const finishYear = new Date().getFullYear();
  // Create an array with all the years as integers
  const years = [...Array(finishYear - startYear + 1).keys()].map(x => x + startYear).reverse();

  function goToYear(year) {
    props.setYear(JSON.stringify(year));
    props.switchPage('lawsInYear');
  }

  const renderItem = ({ item }) => (
    <Pressable onPress={() => goToYear(item)}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: squareSize
      }}>
      <Text>{item}</Text>
    </Pressable>
  );

  return (
    <View style={{ flexDirection: 'column', width: '100%' }}>
      <FlatList
        renderItem={renderItem}
        data={years}
        numColumns={numColumns}
        style={{ width: '100%' }} />
    </View>
  );
}

export default PageYearList;